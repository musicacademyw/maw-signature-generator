<script lang="ts">
    import "./app.css";
    import {onMount} from "svelte";
    import * as Resizable from "$lib/components/ui/resizable";
    import {Button} from "$lib/components/ui/button";
    import {Input} from "$lib/components/ui/input";
    import {PhoneInput} from "$lib/components/ui/phoneInput";
    import {Label} from "$lib/components/ui/label";
    import {Separator} from "$lib/components/ui/separator";
    import {Toaster} from "$lib/components/ui/sonner";
    import {toast} from "svelte-sonner";
    import {LoremIpsum} from "lorem-ipsum";

    let user = $state({
        firstName: '',
        lastName: '',
        pronouns: '',
        title: '',
        email: '',
        officePhone: '805-695-',
        cellPhone: '',
    });

    let signature = $derived.by(() => {
        let html: string = '<div dir="auto" style="font-family: Verdana, sans-serif; font-size: 10pt; color: black;">';
        let content: string[] = [];

        // Name & pronouns
        (user.firstName || user.lastName || user.pronouns) && content.push(`<span style="color: #00a39e; font-weight: bold;">${user.firstName}${(user.firstName && user.lastName) && ' '}${user.lastName}</span>${user.pronouns && `<span> (${user.pronouns})</span>`}`);

        // Job title
        user.title && content.push(`<span>${user.title}</span>`);

        // Company & address
        content.push(`<span style="font-weight: bold; color: #00a39e;">Music Academy of the West</span>`);
        content.push(`<span>1070 Fairway Road</span>`);
        content.push(`<span>Santa Barbara, CA 93108</span>`);

        // Email (disabled to match current brand guide)
        // user.email && content.push(`<span>Email / <a style="color: black; text-decoration: none;" href="mailto:${user.email}">${user.email}</a></span>`);

        // Phone Numbers
        user.officePhone && content.push(`<span>Office / <a style="color: black; text-decoration: none;" href="tel:+1${user.officePhone.trim().replace('-', '')}">${user.officePhone}</a></span>`);
        user.cellPhone && content.push(`<span>Cell / <a style="color: black; text-decoration: none;" href="tel:+1${user.cellPhone.trim().replace('-', '')}">${user.cellPhone}</a></span>`);

        // Website
        content.push(`<a style="font-weight: bold; color: #00a39e; text-decoration: underline;" href="https://musicacademy.org" target="_blank">musicacademy.org</a>`);

        html += content.join("<br>");
        html += `</div>`;
        return html;
    });

    function exportSignature() {
        let blob: Blob = new Blob([signature], {type: "text/html"});
        let clipboardItem: ClipboardItem = new ClipboardItem({"text/html": blob});

        navigator.clipboard.write([clipboardItem]).then(
            () => {
                toast.success('Copied signature to clipboard!');
            }).catch((err) => {
            toast.error('Error copying to clipboard. Please try again.');
        });
    }

    const lorem: LoremIpsum = new LoremIpsum({
        sentencesPerParagraph: {
            max: 5,
            min: 3
        },
        wordsPerSentence: {
            max: 8,
            min: 4
        },
    }, "html");

    let emailBody = $state(lorem.generateParagraphs(3));

    onMount(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            user = JSON.parse(storedUser);
        }
    });

    $effect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    });
</script>

<Toaster position="top-center" richColors/>

<main class="flex-1">
    <Resizable.PaneGroup direction="horizontal" class="min-h-screen h-full">
        <Resizable.Pane defaultSize={45} minSize={35}>
            <div class="h-full space-y-5 p-10">
                <div class="flex flex-row gap-4">
                    <div class="flex flex-col gap-1.5 grow">
                        <Label for="firstName">First Name</Label>
                        <Input type="text" id="firstName" autocomplete="given-name" bind:value={user.firstName}></Input>
                    </div>
                    <div class="flex flex-col gap-1.5 grow">
                        <Label for="lastName">Last Name</Label>
                        <Input type="text" id="lastName" autocomplete="family-name" bind:value={user.lastName}></Input>
                    </div>
                </div>
                <div class="flex flex-col gap-1.5">
                    <Label for="pronouns">Pronouns <span
                            class="pl-1 italic text-muted-foreground text-sm">optional</span></Label>
                    <Input type="text" id="pronouns" placeholder="e.g. he/him, she/her, they/them"
                           bind:value={user.pronouns}></Input>
                </div>
                <div class="flex flex-col gap-1.5">
                    <Label for="title">Job Title</Label>
                    <Input type="text" id="title" autocomplete="organization-title" bind:value={user.title}></Input>
                </div>
                <div class="flex flex-col gap-1.5">
                    <Label for="email">Music Academy Email</Label>
                    <Input type="email" id="email" autocomplete="work email" bind:value={user.email}></Input>
                </div>
                <div class="flex flex-col gap-1.5">
                    <Label for="officePhone">Office Phone</Label>
                    <PhoneInput type="text" id="officePhone" autocomplete="work tel-national"
                                bind:value={user.officePhone}></PhoneInput>
                </div>
                <div class="flex flex-col gap-1.5">
                    <Label for="cellPhone">Cell Phone <span
                            class="pl-1 italic text-muted-foreground text-sm">optional</span></Label>
                    <PhoneInput type="text" id="cellPhone" autocomplete="mobile tel-national"
                                bind:value={user.cellPhone}></PhoneInput>
                </div>
            </div>
        </Resizable.Pane>
        <Resizable.Handle withHandle/>
        <Resizable.Pane minSize={40}>
            <div class="flex h-full flex-col">
                <div class="mb-1 flex items-center p-2 justify-end">
                    <Button onclick={exportSignature}>Copy to Clipboard</Button>
                </div>
                <Separator/>
                <div class="flex-1 overflow-y-auto whitespace-pre-wrap p-4 text-sm relative"
                     style="font-family: Verdana, sans-serif; font-size: 10pt;">
                    <p>Hi John,</p>
                    {@html emailBody}
                    <p class="m-block">Warmly,</p>
                    <div class="bg-gray-100 rounded-md border border-gray-500 border-dashed p-4">
                        {@html signature}
                    </div>
                </div>
            </div>
        </Resizable.Pane>
    </Resizable.PaneGroup>
</main>

<style>
</style>
