import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cutString'
})

export class CutStringPipe implements PipeTransform {

    transform(initial: string, words: string): string {
        let w = parseInt(words);
        return initial.split(" ").splice(0,w).join(" ") + "...";
    }
}
