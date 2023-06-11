const traverser = require("@babel/traverse");

/**
 * @type {Detector}
 */
const verboseStatement = {
    type: "verboseStatement",
    detector: (ast) => {
        const smells = [];
        traverser.default(ast, {
            BlockStatement(path) {
                if (path.node.body.length > 13) {
                    smells.push({
                        type: 'VerboseStatement',
                        location: path.node.loc,
                    });
                }
            }
        });
        return smells;
    }
}

module.exports = verboseStatement;