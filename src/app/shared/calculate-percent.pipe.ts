import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'calculatePercent'
})

export class CalculatePercentPipe implements PipeTransform {

    transform(gained: string, goal: string): string {
        const gn = parseFloat(gained);
        const gl = parseFloat(goal);
        return (gn / gl * 100).toFixed(2);
    }
}
