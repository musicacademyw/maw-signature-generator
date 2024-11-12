<script lang="ts">
    import "./app.css";
    import * as Resizable from "$lib/components/ui/resizable";
    import {Button} from "$lib/components/ui/button";
    import {Input} from "$lib/components/ui/input";
    import {Label} from "$lib/components/ui/label";
    import {Separator} from "$lib/components/ui/separator";
    import {onMount} from "svelte";
    import {phoneMaskInput} from "$lib/utils";

    onMount(() => {
        phoneMaskInput("officePhone");
        phoneMaskInput("cellPhone");
    });
</script>

<main class="flex-1">
    <Resizable.PaneGroup direction="horizontal" class="min-h-screen h-full">
        <Resizable.Pane defaultSize={45} minSize={35}>
            <div class="h-full space-y-5 p-10">
                <div class="flex flex-row gap-4">
                    <div class="flex flex-col gap-1.5 grow">
                        <Label for="firstName">First Name</Label>
                        <Input type="text" id="firstName" autocomplete="given-name"></Input>
                    </div>
                    <div class="flex flex-col gap-1.5 grow">
                        <Label for="lastName">Last Name</Label>
                        <Input type="text" id="lastName" autocomplete="family-name"></Input>
                    </div>
                </div>
                <div class="flex flex-col gap-1.5">
                    <Label for="pronouns">Pronouns <span
                            class="pl-1 italic text-muted-foreground text-sm">optional</span></Label>
                    <Input type="text" id="pronouns" placeholder="e.g. he/him, she/her, they/them"></Input>
                </div>
                <div class="flex flex-col gap-1.5">
                    <Label for="title">Job Title</Label>
                    <Input type="text" id="title" autocomplete="organization-title"></Input>
                </div>
                <div class="flex flex-col gap-1.5">
                    <Label for="email">Email</Label>
                    <Input type="email" id="email" autocomplete="work email"></Input>
                </div>
                <div class="flex flex-col gap-1.5">
                    <Label for="officePhone">Office Phone</Label>
                    <Input type="text" id="officePhone" autocomplete="work tel-national"></Input>
                </div>
                <div class="flex flex-col gap-1.5">
                    <Label for="cellPhone">Cell Phone</Label>
                    <Input type="text" id="cellPhone" autocomplete="mobile tel-national"></Input>
                </div>
            </div>
        </Resizable.Pane>
        <Resizable.Handle withHandle/>
        <Resizable.Pane minSize={40}>
            <div class="flex h-full flex-col">
                <div class="mb-1 flex items-center p-2 justify-end">
                    <Button>Export</Button>
                </div>
                <Separator/>
                <div class="flex-1 overflow-y-auto whitespace-pre-wrap p-4 text-sm">
                    Email signature preview here...
                </div>
            </div>
        </Resizable.Pane>
    </Resizable.PaneGroup>
</main>

<style>
</style>
