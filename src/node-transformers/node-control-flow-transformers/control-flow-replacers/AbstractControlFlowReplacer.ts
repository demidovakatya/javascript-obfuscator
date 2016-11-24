import * as ESTree from 'estree';

import { IControlFlowReplacer } from '../../../interfaces/IControlFlowReplacer';
import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/IOptions';
import { IStorage } from '../../../interfaces/IStorage';

import { Utils } from '../../../Utils';

export abstract class AbstractControlFlowReplacer implements IControlFlowReplacer {
    /**
     * @type Map <string, AbstractCustomNode>
     */
    protected readonly nodes: Map <string, ICustomNode>;

    /**
     * @type {IOptions}
     */
    protected readonly options : IOptions;

    /**
     * @param nodes
     * @param options
     */
    constructor (nodes: Map <string, ICustomNode>, options: IOptions) {
        this.nodes = nodes;
        this.options = options;
    }

    /**
     * @returns {string}
     */
    protected static getStorageKey (): string {
        return Utils.getRandomGenerator().string({
            length: 3,
            pool: Utils.randomGeneratorPool
        });
    }

    /**
     * @param node
     * @param parentNode
     * @param controlFlowStorage
     * @param controlFlowStorageCustomNodeName
     * @returns {ICustomNode | undefined}
     */
    public abstract replace (
        node: ESTree.Node,
        parentNode: ESTree.Node,
        controlFlowStorage: IStorage <ICustomNode>,
        controlFlowStorageCustomNodeName: string
    ): ICustomNode | undefined;
}