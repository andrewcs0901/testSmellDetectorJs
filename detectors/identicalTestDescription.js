const traverser = require("@babel/traverse");
const type = "identicalTestDescription";
const {isTestCase} = require("../astAnalyzer");

const identicalTestDescription = {
    type,
    detector: (ast) => {
        const results = [];
        const setDescriptions = new Set();
        traverser.default(ast, {
            CallExpression: ({node}) => {
                if (isTestCase(node)) {
                    if (/it|test/.test(node.callee.name)) {
                        if (setDescriptions.has(node.arguments[0].value)) {
                            results.push({ type: type, location: node.loc });
                        } else {
                            setDescriptions.add(node.arguments[0].value)
                        }
                    }
                }
            }
        });
        return results;
    },
    name: "Identical Test Description"
}

module.exports = identicalTestDescription;