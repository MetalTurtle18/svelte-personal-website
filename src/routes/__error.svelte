<script context="module">
    export const load = ({ error, status }) => {
        return {
            props: {
                title: `${status}: ${error.message}`
            }
        }
    }
</script>

<script>
    export let title
</script>

<h1>{title}</h1>

<style>
    h1 {
        align-content: center;
    }
</style>
