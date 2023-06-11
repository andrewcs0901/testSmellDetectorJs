const {astAnalyzer} = require('../astAnalyzer');

describe('astAnalyzer', () => {

    it('should parse code with flow plugin', () => {
        const code = `
            import typeof MyType from 'example-module';
            it('example', () => {
                assert.equal(1, 1);
            });
        `
        const ast = astAnalyzer.getAst(code);

        expect(ast).toBeDefined();
    });

    it('should parse code with import anywhere', () => {
        const code = `
            const myFunc = require('my-module');
            it('example', () => {
                expect(myFunc()).toBe(true);
            });
        `
        const ast = astAnalyzer.getAst(code);

        expect(ast).toBeDefined();
    });

    it('should return a defined ast', () => {
        const code = `
            describe('example', () => {
                it('example', () => {
                    assert.equal(1, 1);
                });
            });
            it('example1', () => {
                assert.equal(1, 1);
            });
        `;

        const ast = astAnalyzer.getAst(code);

        expect(ast).toBeDefined();
    });

    it('should parse with typeScript plugin', () => {
        const code = `
            import React = require('react');;
            it('example', () => {
                assert.equal(1, 1);
            });
        `
        const ast = astAnalyzer.getAst(code);

        expect(ast).toBeDefined();
    });
});