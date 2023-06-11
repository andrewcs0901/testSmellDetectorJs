const traverser = require("@babel/traverse");
const type = "unusedImports";

const unusedImports = {
    type,
    detector: (ast) => {
        const importsList = new Map();
        traverser.default(ast, {
            ImportDeclaration: (path) => {
                const node = path.node;
                node.specifiers.forEach((specifier) => {
                    importsList.set(specifier.local.name, node.loc);
                });
            },
            CallExpression: (path) => {
                const node = path.node;
                const name = node.callee.name;
                if (importsList.has(name)) {
                    importsList.delete(name);
                }
            },
            ExpressionStatement: (path) => {
                const node = path.node;
                const name = node.name;
                if (importsList.has(name)) {
                    importsList.delete(name);
                }
            }
        });
        traverser.default(ast, {
            Program: (path) => {
                for (const binding in path.scope.bindings) {
                    const value = path.scope.bindings[binding];
                    if (value.kind === "module") {
                        value.referencePaths.forEach((referencePath) => {
                            if (/MemberExpression|CallExpression/.test(referencePath.parent.type)) {
                                importsList.delete(value.identifier.name);
                            }
                        });
                    }
                };
            }
        })
        const results = [...importsList.values()];
        return results;
    }
};

module.exports = unusedImports;