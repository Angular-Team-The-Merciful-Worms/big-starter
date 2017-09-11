import { CutStringPipe } from './cut-string.pipe';

describe('CutStringPipe', () => {
    const pipe = new CutStringPipe();

    it('transforms "1 2 3 4 5 6 7 8" to "1 2 3 4 5..." when "5" passed', () => {
        expect(pipe.transform('1 2 3 4 5 6 7 8', '5')).toBe('1 2 3 4 5...');
    });

    it('transforms "1 2 3" to "1 2 3..."  when "5" passed', () => {
        expect(pipe.transform('1 2 3', '5')).toBe('1 2 3...');
    });
});
