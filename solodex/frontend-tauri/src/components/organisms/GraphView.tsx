import axios from "axios";
import { toaster } from "evergreen-ui";
import React, { useEffect, useState, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { useGraphNodeState } from "../hooks/updateGraph";

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
	const { nodes, setNodes } = useGraphNodeState();
	const [links, setLinks] = useState<Link[]>([]);

	const drawNode = (node: Node, ctx: CanvasRenderingContext2D, globalScale: number) => {
		const label = node.name || '';
		const fontSize = 12 / (globalScale/2);
		ctx.font = `${fontSize}px Times New Roman`;
		// const textWidth = ctx.measureText(label).width;
		// const bckgDimensions = [textWidth, fontSize].map(dim => dim + fontSize * 0.2);

		ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

		// ctx.fillRect(node.x! - bckgDimensions[0] / 2, node.y! - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1]);

		// Set text color                                                             
        ctx.fillStyle = 'black';                                                      
        ctx.textAlign = 'left';                                                     
        ctx.textBaseline = 'hanging';                                                  
        ctx.fillText(label, node.x!, node.y!);                                        
                                                                                  
        // Draw a circle                                                              
        ctx.beginPath();                                                              
        ctx.arc(node.x!, node.y!, 5, 0, 2 * Math.PI, false);                          
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; // Circle color                           
        ctx.fill();                                                                   
        ctx.closePath();

	};

	// Define the graph data as nodes and links                                 
	const data = {
		nodes: [
			{ id: 'node1', name: 'Node 1' },
			{ id: 'node2', name: 'Node 2' },
			{ id: 'node3', name: 'Node 3' }
		],
		links: [
			{ source: 'node1', target: 'node2' },
			{ source: 'node2', target: 'node3' }
		]
	};

	useEffect(() => {

		// Fetch people
		const fetchData = async () => {
			try {
				const response = await axios.get('http://127.0.0.1:8000/api/person/');

				console.log(response.data);
				
				const extractedData: Node[] = response.data.map((item: { id: string, first_name: string}) => ({
													id: item.id, name: item.first_name }));
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
			<ForceGraph2D
				graphData={{nodes, links}}
				nodeCanvasObject={drawNode}
				nodeLabel="name"
				nodeAutoColorBy="name"
			/>
		</div>
	);
}

export default GraphView;