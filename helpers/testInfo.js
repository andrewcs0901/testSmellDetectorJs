const traverser = require("@babel/traverse");
const { isTestCase } = require("../astAnalyzer");

const testInfo = (testAst) => {
    return {
        itCount: getItCount(testAst),
        describeCount: getDescribeCount(testAst),
    }
}

const getDescribeCount = (testAst) => {
    let describeCount = 0;
    traverser.default(testAst, {
        CallExpression: ({ node }) => {
            if (node.callee.name === 'describe') {
                describeCount++;
            }
        }
    });
    return describeCount;
}

const getItCount = (testAst) => {
    let itCount = 0;
    traverser.default(testAst, {
        CallExpression: ({ node }) => {
            if (isTestCase(node) && /it|test/g.test(node.callee.name)) {
                itCount++;
            }
        }
    });
    return itCount;
}

module.exports = testInfo;
