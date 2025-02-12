import axios from "axios";
import { toaster } from "evergreen-ui";
import React, { useEffect, useState, useRef} from "react";
import { GraphCanvas, GraphCanvasRef, GraphEdge, GraphNode } from 'reagraph';
// import { useGraphContext } from "../../managers/GraphProvider";

export interface Node {
	id: string | number | undefined;
	name: string | null;
	x?: number;
	y?: number;
}

export interface Link {
	source: string;
	target: string;
}

const GraphView: React.FC = () => {
	// Node states
	// const context = useGraphContext();

	// const nodes = context?.nodes ?? []
	// const setNodes = context?.setNodes ?? []
	// const edges = context?.edges ?? []
	// const setEdges = context?.edges ?? []

	const [ nodes, setNodes ] = useState<GraphNode[]>([]);
    const [ edges, setEdges ] = useState<GraphEdge[]>([]);

	const ref = useRef<GraphCanvasRef | null>(null);

	useEffect(() => {
		ref.current?.fitNodesInView();
	}, [nodes]);

	useEffect(() => {

		// Fetch people
		const fetchData = async () => {
			try {
				const response = await axios.get('http://127.0.0.1:8000/api/person/');

				console.log(response.data);
				
				const extractedData: GraphNode[] = response.data.map((item: { id: string, first_name: string}) => ({
													id: item.id, label: item.first_name }));
				setNodes(extractedData);

				console.log(nodes[0]
			
				);

			} catch (error) {
				toaster.warning(`Error pulling data: ${error}`)
			}
		};
		
		fetchData();

    }, [])

	return (
		<div style={{ width: '800px', height: '600px' }}>
			{/* <ForceGraph2D
				graphData={{nodes, links}}
				nodeCanvasObject={drawNode}
				nodeLabel="name"
				nodeAutoColorBy="name"
			/> */}
			<GraphCanvas
				ref={ref}
				nodes={nodes}
				edges={edges}
			>
				
			</GraphCanvas>
		</div>
	);
}

export default GraphView;