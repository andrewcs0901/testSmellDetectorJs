const conditionalTestLogic = require('../detectors/conditionalTestLogic');
const parser = require('@babel/parser');

describe('conditionalTestLogic', () => {
    it('should detect conditional test logic', () => {
        const code = `
            describe('example', () => {
                it('example testing', () => {
                    if (process.env.NODE_ENV === 'production') {
                        expect(myFunc()).toBe(true);
                    } else {
                        expect(myFunc()).toBe(false);
                    }
                });
            })
        `;

        const EXPECTED_RESULT = 1;
        const ast = parser.parse(code);

        const result = conditionalTestLogic.detector(ast);
        expect(result).toHaveLength(EXPECTED_RESULT);
    });
});