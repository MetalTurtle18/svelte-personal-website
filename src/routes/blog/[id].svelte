<script context="module">
    export const load = async ({ params, fetch }) => {
        const response = await fetch('/api/posts.json?withContent=true')
        const allPosts = await response.json()
        const post = allPosts.find((p) => p.path.endsWith(params.id))

        if (post)
            return {
                props: {
                    post: post
                }
            }
        else
            return {
                status: 404,
                error: 'Post not found'
            }
    }
</script>

<script>
    import { PUBLIC_SITE_TITLE } from '$env/static/public'

    export let post

    let {
        meta: { title = 'Untitled', date = 'undated', tags = [] },
        content
    } = post
</script>

<svelte:head>
    <title>{`${title} • ${PUBLIC_SITE_TITLE}`}</title>
</svelte:head>

<h1>{title}</h1>
<h2>{date}</h2>
{#if tags.length}
    <h3>Tags:</h3>
    <ul>
        {#each tags as tag}
            <li>{tag}</li>
        {/each}
    </ul>
{/if}

<br />

{@html content}
