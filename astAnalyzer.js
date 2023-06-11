const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const types = require("@babel/types");

const defaultPlugins = [
    "classProperties",
    "dynamicImport",
    "decorators",
    "jsx",
    "partialApplication",
    "exportDefaultFrom",
    ["pipelineOperator", {proposal: "minimal"}],
    "@babel/plugin-proposal-do-expressions",
    "@babel/plugin-proposal-destructuring-private",
    "@babel/plugin-syntax-import-assertions"
]

const configsTypescript = {
    sourceType: 'module',
    plugins: ['typescript', ...defaultPlugins],
    errorRecovery: true
};

const configsFlow = {
    sourceType: 'module',
    plugins: ['flow', ...defaultPlugins],
    errorRecovery: true
};

const jestSuiteAliases = ['describe'];
const jestTestAliases = ['it', 'test',];

const astAnalyzer = {
    /**
     * 
     * @param {string} code 
     * @returns {import('@babel/traverse').NodePath<import('@babel/types').CallExpression | undefined} ast
     */
    getTestNodeAst: (code) => {
        const ast = parser.parse(code, configsFlow);
        let testNode = undefined;
        traverse(ast, {
            CallExpression(path) {
                if (jestSuiteAliases.includes(path.node.callee.name)) {
                    path.traverse({
                        CallExpression(describePath) {
                            if (jestTestAliases.includes(describePath.node.callee.name)) {
                                testNode = describePath;
                            }
                        }
                    });
                } else if (jestTestAliases.includes(path.node.callee.name)) {
                    testNode = path;
                }
            }
        });
        return testNode;
    },
    getAst: (code) => {
        try {
            return parser.parse(code, configsFlow)
        } catch (err) {
            return parser.parse(code, configsTypescript)
        }
    }
};

const isTestCase = (node) => {
    const testCaseCallee = ["it", "test"];
    return types.isIdentifier(node.callee)
        && testCaseCallee.includes(node.callee.name)
        && types.isStringLiteral(node.arguments[0])
        && isFunction(node.arguments[1]);
}

const isFunction = (node) => types.isArrowFunctionExpression(node)
    || types.isFunctionExpression(node);

const isSetupMethod = (node) => {
    const setupMethods = ["beforeEach", "beforeAll", "afterEach", "afterAll"];
    return types.isIdentifier(node.callee)
        && setupMethods.includes(node.callee.name)
        && isFunction(node.arguments[0]);
}

const isAssert = (node) => {
    const assertMethods = ["expect", "assert"];
    try {
        return types.isExpressionStatement(node)
            && types.isCallExpression(node?.expression)
            && types.isMemberExpression(node?.expression.callee)
            && assertMethods.includes(node?.expression.callee.name
                || node?.expression?.callee?.object?.callee?.name);
    } catch (err) {
        console.log(err);
        let { end, start } = node.loc
        console.table(start.line, end.line);
        throw err;
    }

}

module.exports = { astAnalyzer, isTestCase, isFunction, isSetupMethod, isAssert };