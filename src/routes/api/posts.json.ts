export type Metadata = {
    title: string
    date: string
    tags?: string[]
}

type MarkdownFile = {
    metadata: Metadata
    default: {
        render: () => {
            html: string
        }
    }
}

type Resolver = () => Promise<MarkdownFile>

type PostFile = [string, Resolver]

export type Post = {
    meta: Metadata
    path: string,
    content: string
}

export const GET = async () => {
    const allPostFiles: Record<string, Resolver> = import.meta.glob<MarkdownFile>('../../../blog/*.md')
    const iterablePostFiles: PostFile[] = Object.entries(allPostFiles)

    const allPosts: Post[] = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]: PostFile) => {
            const { metadata, default: content } = await resolver()
            const postPath = path.slice(8, -3)
            const htmlContent = content.render().html

            return {
                meta: metadata,
                path: postPath,
                content: htmlContent
            }
        })
    )

    const sortedPosts = allPosts.sort((a, b) => {
        return new Date(a.meta.date).getTime() - new Date(b.meta.date).getTime()
    })

    return {
        body: sortedPosts
    }
}