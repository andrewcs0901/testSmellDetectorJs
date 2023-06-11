const unusedImports = require('../detectors/unusedImports');
const {astAnalyzer} = require('../astAnalyzer');

describe('unusedImports', () => {
    it('should detect unused imports', () => {
        const code = `
            import { myFunc } from 'my-module';
            it('example', () => {
                expect(abc()).toBe(true);
            });
        `;
        const EXPECTED_RESULT = 1;
        const ast = astAnalyzer.getAst(code);

        const result = unusedImports.detector(ast);

        expect(result).toHaveLength(EXPECTED_RESULT);
    });

/*     it('should detect unused imports with require', () => {
        const code = `
            const myFunc = require('my-module');
            it('example', () => {
                expect(abc()).toBe(true);
            });
        `;
        const EXPECTED_RESULT = 1;
        const ast = astAnalyzer.getAst(code);

        const result = unusedImports.detector(ast);

        expect(result).toHaveLength(EXPECTED_RESULT);
    }); */

    it('should not detect used imports', () => {
        const code = `
            import { myFunc } from 'my-module';
            it('example', () => {
                expect(myFunc()).toBe(true);
            });
        `;
        const EXPECTED_RESULT = 0;
        const ast = astAnalyzer.getAst(code);

        const result = unusedImports.detector(ast);

        expect(result).toHaveLength(EXPECTED_RESULT);
    });

    it('should not detect assigned imports', () => {
        const code = `
            import { myFunc } from 'my-module';
            it('example', () => {
                expect(myFunc).toBe(true);
            });
        `;
        const EXPECTED_RESULT = 0;
        const ast = astAnalyzer.getAst(code);

        const result = unusedImports.detector(ast);

        expect(result).toHaveLength(EXPECTED_RESULT);
    });
});