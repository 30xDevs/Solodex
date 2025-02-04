import React, {useState} from 'react';

interface Node {
	id: string | number | undefined;
	name: string | null;
	x?: number;
	y?: number;
}

interface Link {
	source: string;
	target: string;
}

export const useGraphNodeState = () => {
    const [nodes, setNodes] = useState<Node[]>([]);

    return { nodes, updateNodes: setNodes};
};
 
export const useGraphLinkState = () => {
    const [links, setLinks] = useState<Link[]>([]);

    return { links, updateLinks: setLinks };
};