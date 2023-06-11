const { astAnalyzer } = require('../astAnalyzer.js');
const testInfo = require('../helpers/testInfo.js');

describe('testInfo', () => {
    it('should detect the number of describe blocks in a test file', () => {
        const code = `
            describe('test', () => {
                it('test', () => {
                    expect(true).toBe(true);
                });
            });

            describe('test2', () => {
                describe('test3', () => {
                    it('test2', () => {
                        expect(true).toBe(true);
                    });
                });
            });
        `
        const testAst = astAnalyzer.getAst(code);
        const result = testInfo(testAst);
        const expected = 3;

        expect(result.describeCount).toBe(expected);
    });

    it('should detect the number of it blocks in a test file', () => {
        const code = `
            describe('test', () => {
                it('test', () => {
                    expect(true).toBe(true);
                });
            });

            describe('test2', () => {
                describe('test3', () => {
                    it('test3', () => {
                        expect(true).toBe(true);
                    });
                });

                it('test4', () => {
                    expect(true).toBe(true);
                });
            });
        `

        const testAst = astAnalyzer.getAst(code);
        const result = testInfo(testAst);
        const expected = 3;

        expect(result.itCount).toBe(expected);
    });
});
