const verifyInSetup = require('../detectors/verifyInSetup');
const parser = require('@babel/parser');

describe('verifyInSetup', () => {
    const setupMethodNames = ['beforeEach', 'beforeAll', 'afterEach', 'afterAll'];

    it.each(setupMethodNames)('should detect assert in %s method', (setupMethodName) => {
        const code = `
            describe('example', () => {
                ${setupMethodName}(() => {
                    expect(db.clean()).toBe(true);
                });
            });
        `;
        const EXPECTED_RESULT = 1;
        const ast = parser.parse(code);

        const result = verifyInSetup.detector(ast);

        expect(result).toHaveLength(EXPECTED_RESULT);
    });

    it.each(setupMethodNames)('should not detect smell in valid %s method', (setupMethodName) => {
        const code = `
            describe('example', () => {
                let db;

                ${setupMethodName}(() => {
                    db = myFunc();
                });

                it('example function', () => {
                    expect(db.get()).toBe("something");
                });
            });
        `;
        const EXPECTED_RESULT = 0;
        const ast = parser.parse(code);
        const result = verifyInSetup.detector(ast);
        expect(result).toHaveLength(EXPECTED_RESULT);
    });
});