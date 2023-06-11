const subOptimalAssert = require('../detectors/subOptimalAssert');
const parser = require('@babel/parser');

describe('subOptimalAssert', () => {
    it('should detect "null" sub-optimal assert', () => {
        const code = `
            it('example', () => {
                //correct -> expect(myFunc()).toBeNull();
                expect(myFunc()).toBe(null);
            });
        `;
        const EXPECTED_RESULT = 1;
        const ast = parser.parse(code);

        const result = subOptimalAssert.detector(ast);

        expect(result).toHaveLength(EXPECTED_RESULT);
    });

    it.each(["undefined", "void 0"])('should detect "%s" usage in sub-optimal assert', (value) => {
        const code = `
            it('example', () => {
                //correct -> expect(myFunc()).toBeDefined();
                expect(myFunc()).not.toBe(${value});
            });
        `;
        const EXPECTED_RESULT = 1;
        const ast = parser.parse(code);

        const result = subOptimalAssert.detector(ast);

        expect(result).toHaveLength(EXPECTED_RESULT);
    });

    it('should detect "comparison" sub-optimal assert', () => {
        const code = `
            it('example', () => {
                //correct -> expect(myFunc()).toBeGreaterThan(0);
                expect(myFunc() > 0).toBe(false);
            });
        `;
        const EXPECTED_RESULT = 1;
        const ast = parser.parse(code);

        const result = subOptimalAssert.detector(ast);

        expect(result).toHaveLength(EXPECTED_RESULT);

    });

    it('should detect ".length" usage in sub-optimal assert', () => {
        const code = `
            it('example', () => {
                //correct -> expect(myFunc()).toHaveLength(3);
                expect(myFunc().length).toBe(3);
            });
        `;
        const EXPECTED_RESULT = 1;
        const ast = parser.parse(code);

        const result = subOptimalAssert.detector(ast);

        expect(result).toHaveLength(EXPECTED_RESULT);
    })

    it('should not detect smell if uses "true" assert', () => {
        const code = `
            it('example', () => {
                expect(myFunc()).toBe(true);
            });
        `;
        const EXPECTED_RESULT = 0;
        const ast = parser.parse(code);

        const result = subOptimalAssert.detector(ast);

        expect(result).toHaveLength(EXPECTED_RESULT);
    });
});