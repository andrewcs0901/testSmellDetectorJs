const nonFunctionalStatement = require('../detectors/nonFunctionalStatement');
const parser = require('@babel/parser');

describe('nonFunctionalStatement', () => {
    it('should not detect smell if empty statements has comments', () => {
        const code = `
            it('example', () => {
                if(true){
                    // do nothing
                }
            });
        `;
        const EXPECTED_RESULT = 0;
        const ast = parser.parse(code);

        const result = nonFunctionalStatement.detector(ast);

        expect(result).toHaveLength(EXPECTED_RESULT);
    });

    it('should detect empty statements missing comments', () => {
        const code = `
            it('example', () => {
                if(true){}
            });
        `;
        const EXPECTED_RESULT = 1;
        const ast = parser.parse(code);

        const result = nonFunctionalStatement.detector(ast);

        expect(result).toHaveLength(EXPECTED_RESULT);
    });
});