<script context="module">
    export const load = ({ url }) => {
        const currentRoute = url.pathname

        return {
            props: {
                currentRoute
            }
        }
    }
</script>

<script>
    import Header from '$lib/components/Header.svelte'
    import Footer from '$lib/components/Footer.svelte'
    import '$lib/styles/style.scss'
    import { fade } from 'svelte/transition'
    import { PUBLIC_SITE_TITLE } from '$env/static/public'

    export let currentRoute
</script>

<svelte:head>
    <title>{PUBLIC_SITE_TITLE}</title>
</svelte:head>

<Header />

{#key currentRoute}
    <main in:fade={{ duration: 150 }}>
        <slot />
    </main>
{/key}

<Footer />
