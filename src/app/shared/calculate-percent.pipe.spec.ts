import { CalculatePercentPipe } from './calculate-percent.pipe';

describe('CalculatePercentPipe', () => {
    const pipe = new CalculatePercentPipe();

    it('transforms "5" and "10" to "50.00"', () => {
        expect(pipe.transform('5', '10')).toBe('50.00');
    });

    it('transforms "3" and "10" to "33.33"', () => {
        expect(pipe.transform('3', '10')).toBe('30.00');
    });
});
