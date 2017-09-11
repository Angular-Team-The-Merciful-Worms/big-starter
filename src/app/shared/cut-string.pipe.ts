import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cutString'
})

export class CutStringPipe implements PipeTransform {

    transform(initial: string, words: string): string {
        const w = parseInt(words, 10);
        return initial.split(' ').splice(0, w).join(' ') + '...';
    }
}
