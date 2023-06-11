const traverser = require("@babel/traverse");
const type = "onlyTest";

const isOnlyTest = (node) => 
    (/it|test|describe/.test(node.callee?.object?.name) && node.callee.property.name === 'only');

const onlyTest = {
    type,
    detector: (ast) => {
        const results = [];
        traverser.default(ast, {
            CallExpression: (path) => {
                const node = path.node;
                if (isOnlyTest(node)) {
                    results.push({ type: type, location: node.loc });
                }
            }
        });
        return results;
    }
};

module.exports = onlyTest;