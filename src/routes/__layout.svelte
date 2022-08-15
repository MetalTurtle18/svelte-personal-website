<script context='module'>
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

    export let currentRoute
</script>

<Header />

{#key currentRoute}
    <main in:fade={{duration: 150}}>
        <slot />
    </main>
{/key}

<Footer />
