const traverse = require("@babel/traverse");
const { isMemberExpression, isIdentifier, isBinaryExpression } = require("@babel/types");

const type = "subOptimalAssert";

const isExpectNotBeAssertion = ({ callee }) => (
    callee?.object?.object?.callee?.name === "expect" &&
    callee?.object?.property?.name === "not"
);

const isExpectToBeAssertion = ({ callee }) => (
    callee?.object?.callee?.name === "expect" && callee?.property?.name === "toBe"
);

const isUndefinedLike = (node) => {
    const containArgs = node.arguments.length === 1;
    if(containArgs){
        const isUsingVoid = (node.arguments[0].type === "UnaryExpression" && node.arguments?.[0]?.operator === "void")
        const isArgumentdUndefined =  /(undefined|null)+/.test(node.arguments?.[0]?.name || "")
        const isNullLiteral = node?.arguments[0]?.type === "NullLiteral"
        return isUsingVoid || isArgumentdUndefined || isNullLiteral
    }
    return false;
};

const isUsingDotLength = ({ callee }) =>
    callee.object.arguments.length === 1 &&
    callee.object.arguments[0]?.property?.name === "length";

const isArgBinaryExpression = (node) =>
    node.arguments.length === 1 && isBinaryExpression(node.arguments[0])

const subOptimalAssert = {
    type,
    detector: (ast) => {
        let results = [];
        traverse.default(ast, {
            CallExpression: ({ node }) => {
                if (isMemberExpression(node.callee) && /CallExpression|MemberExpression/.test(node.callee.object.type) && isIdentifier(node.callee.property)) {
                    if (isExpectToBeAssertion(node)) {
                        const isUndefined = isUndefinedLike(node);
                        const isDotLength = isUsingDotLength(node)
                        if (isUndefined || isDotLength) {
                            results.push({ type, location: node.loc });
                        }
                    }
                    else if (isExpectNotBeAssertion(node)) {
                        if (isUndefinedLike(node)) {
                            results.push({ type, location: node.loc });
                        }
                    }
                }else if(node.callee.name === "expect" && isArgBinaryExpression(node)){
                    results.push({ type, location: node.loc });
                }
            }
        });
        return results;
    }
};
module.exports = subOptimalAssert;
