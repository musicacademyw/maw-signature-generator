<script lang="ts">
    import "./app.css";
    import * as Resizable from "$lib/components/ui/resizable";
</script>

<main class="flex-1">
    <Resizable.PaneGroup direction="horizontal" class="min-h-screen h-full">
        <Resizable.Pane defaultSize={45} minSize={35}>
            <form class="space-y-8 p-10 h-full">
            </form>
        </Resizable.Pane>
        <Resizable.Handle withHandle/>
        <Resizable.Pane>Two</Resizable.Pane>
    </Resizable.PaneGroup>
</main>

<style>
</style>
