const traverser = require("@babel/traverse");
const type = "conditionalTestLogic";

const traverseAst = (ast) => {
    const smells = [];
    traverser.default(ast, {
        IfStatement: ({ node }) => {
            smells.push({ type, location: node.loc });
        }
    });
    return smells;
}

const conditionalTestLogic = {
    type,
    detector: (ast) => {
        let results = [];
        results = traverseAst(ast);
        return results;
    }
};

module.exports = conditionalTestLogic;