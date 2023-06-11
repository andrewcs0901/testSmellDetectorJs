const verboseTest = require('../detectors/verboseTest');
const parser = require('@babel/parser');

describe('verboseTest', () => {
    it('should detect verbose test with 13 statements', () => {
        const code = `
            it('example', () => {
                const _1 = 't';
                const _2 = 'e';
                const _3 = 's';
                const _4 = 't';
                const _5 = 'i';
                const _6 = 'n';
                const _7 = 'g';
                const _8 = ' ';
                const _9 = 'j';
                const _10 = 'u';
                const _11 = 's';
                const _12 = 't';
                const expected = 'testing just';
                const result = myFunc([_1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12].join(''));
                expect(result).toBe(expected);
            });
        `;
        const EXPECTED_RESULT = 1;
        const ast = parser.parse(code);

        const result = verboseTest.detector(ast);

        expect(result).toHaveLength(EXPECTED_RESULT);
    });
});