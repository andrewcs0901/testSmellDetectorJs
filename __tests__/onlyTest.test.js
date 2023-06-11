const onlyTest = require('../detectors/onlyTest');
const parser = require('@babel/parser');

describe('onlyTest', () => {
    it.each(["it", "test"])('should detect %s.only() usage', (method) => {
        const code = `
            ${method}.only('example', () => {
                expect(myFunc()).toBe(true);
            });
        `;
        const EXPECTED_RESULT = 1;
        const ast = parser.parse(code);

        const result = onlyTest.detector(ast);

        expect(result).toHaveLength(EXPECTED_RESULT);
    });

    it('should detect describe.only() usage', () => {
        const code = `
            describe.only('example', () => {
                it('example', () => {
                    expect(myFunc()).toBe(true);
                });
            });
        `;
        const EXPECTED_RESULT = 1;
        const ast = parser.parse(code);

        const result = onlyTest.detector(ast);

        expect(result).toHaveLength(EXPECTED_RESULT);
    });

});