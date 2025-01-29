import React from "react";
import ForceGraph2D from "react-force-graph-2d";

const GraphView: React.FC = () => {
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
                                                                                  
    return (                                                                    
    <div style={{ width: '800px', height: '600px' }}>                         
        <ForceGraph2D                                                           
        graphData={data}                                                      
        nodeLabel="name"                                                      
        nodeAutoColorBy="name"                                                
        />                                                                      
    </div>                                                                    
    );
}

export default GraphView;