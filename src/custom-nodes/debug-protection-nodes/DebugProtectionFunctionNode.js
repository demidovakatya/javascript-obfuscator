"use strict";
const esprima = require('esprima');
const Node_1 = require('../Node');
const NodeUtils_1 = require('../../NodeUtils');
const Utils_1 = require("../../Utils");
class DebugProtectionFunctionNode extends Node_1.Node {
    constructor(debugProtectionFunctionName) {
        super();
        this.debugProtectionFunctionName = debugProtectionFunctionName;
        this.node = this.getNodeStructure();
    }
    appendNode(blockScopeNode) {
        let programBodyLength = blockScopeNode.body.length, randomIndex = Utils_1.Utils.getRandomInteger(0, programBodyLength);
        NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), randomIndex);
    }
    getNodeIdentifier() {
        return this.debugProtectionFunctionName;
    }
    getNodeStructure() {
        return NodeUtils_1.NodeUtils.getBlockScopeNodeByIndex(esprima.parse(`
                var ${this.debugProtectionFunctionName} = function () {
                    function debuggerProtection (counter) {
                        if (('' + counter / counter)['length'] !== 1 || counter % 20 === 0) {
                            (function () {}.constructor('debugger')());
                        } else {
                            [].filter.constructor((undefined + '')[2] + (!![] + '')[3] + (Function('return{}')() + '')[2] + (undefined + '')[0] + (![] + [0] + String)[20] + (![] + [0] + String)[20] + (!![] + '')[3] + (!![] + '')[1])();
                        }
                        
                        debuggerProtection(++counter);
                    }
                    
                    try {
                        debuggerProtection(0);
                    } catch (y) {}
                };
            `));
    }
}
exports.DebugProtectionFunctionNode = DebugProtectionFunctionNode;
