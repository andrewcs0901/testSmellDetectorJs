const traverser = require("@babel/traverse");

/**
 * @type {Detector}
 */
const nonFunctionalStatement = {
    type: "nonFunctionalStatement",
    astScope: "internal",
    detector: (ast) => {
        const smells = [];
        traverser.default(ast, {
            BlockStatement(path) {
                if (path.node.body.length === 0) {
                    const isMissingComment = !(path.node.leadingComments || path.node.trailingComments || path.node.innerComments);
                    if (isMissingComment) {
                        smells.push({
                            type: 'NonFunctionalStatement',
                            location: path.node.loc,
                        });
                    }
                }
            }
        });
        return smells;
    }
}

module.exports = nonFunctionalStatement;