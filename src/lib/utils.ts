import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import type {Input} from "$lib/components/ui/input";
import {MaskInput, type MaskInputOptions} from "maska";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function phoneMaskInput(elementId: string) {
    let element = document.getElementById(elementId);
    const maskaOptions: MaskInputOptions = {
        mask: "###-###-####",
        eager: true,
    }
    if (element instanceof HTMLInputElement) {
        new MaskInput(element, maskaOptions);
    }
}
