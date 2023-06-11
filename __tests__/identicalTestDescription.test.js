const identicalTestDescription = require('../detectors/identicalTestDescription');
const parser = require('@babel/parser');

describe('identicalTestDescription', () => {
    it('should detect identical test descriptions', () => {
        const code = `
            describe('example', () => {
                it('example testing', () => {
                    expect(myFunc()).toBe(true);
                });
                it('example testing', () => {
                    expect(myFunc()).toBe(false);
                });
            });
        `;
        const EXPECTED_RESULT = 1;
        const ast = parser.parse(code);

        const result = identicalTestDescription.detector(ast);

        expect(result).toHaveLength(EXPECTED_RESULT);
    });
});