import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'calculatePercent'
})

export class CalculatePercentPipe implements PipeTransform {

    transform(gained: string, goal: string): string {
        let gn = parseFloat(gained);
        let gl = parseFloat(goal);
        return (gn / gl * 100).toFixed(2);
    }
}
