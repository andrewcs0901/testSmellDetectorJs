const traverser = require("@babel/traverse");
const type = "verifyInSetup";
const {isSetupMethod, isAssert} = require("../astAnalyzer");

const verifyInSetup = {
    type,
    detector: (ast) => {
        const results = [];
        traverser.default(ast, {
            CallExpression: ({node}) => {
                if (isSetupMethod(node)) {
                    if (node.arguments[0]?.body?.body?.some(isAssert)) {
                        results.push({ type: type, location: node.loc });
                    }
                }
            }
        });
        return results;
    },
}

module.exports = verifyInSetup;