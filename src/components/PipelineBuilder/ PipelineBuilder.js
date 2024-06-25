import React, { useState } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, MiniMap, Controls, Background, Handle } from 'reactflow';
import 'reactflow/dist/style.css';
import './PipelineBuilder.css';

const initialNodes = [];
const initialEdges = [];

const SourceNode = ({ data }) => (
  <div className="source-node">
    {data.label}
    <Handle type="source" position="right" id="a" style={{ background: '#007bff' }} />
  </div>
);

const DestinationNode = ({ data }) => (
  <div className="destination-node">
    {data.label}
    <Handle type="target" position="left" id="b" style={{ background: '#ff0000' }} />
  </div>
);

const nodeTypes = {
  source: SourceNode,
  destination: DestinationNode,
};

const PipelineBuilder = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [sourceCount, setSourceCount] = useState(0);
  const [destinationCount, setDestinationCount] = useState(0);

  const onConnect = (params) => {
    const sourceNode = nodes.find((node) => node.id === params.source);
    const targetNode = nodes.find((node) => node.id === params.target);

    // Prevent connecting two sources or two destinations
    if (sourceNode.type === targetNode.type) {
      alert('You cannot connect two sources or two destinations.');
      return;
    }

    setEdges((eds) => addEdge(params, eds));
  };


  const onEdgeClick = (event, edge) => {
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  };


  const getNodePosition = (type, index) => {
    const x = type === 'source' ? 100 : 600;
    const y = 50 + index * 150; // Adjust the vertical spacing as needed
    return { x, y };
  };

  const addNode = (type) => {
    const index = type === 'source' ? sourceCount : destinationCount;
    const newNode = {
      id: `${type}-${index + 1}`,
      type,
      position: getNodePosition(type, index),
      data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${index + 1}` },
    };

    setNodes((nds) => [...nds, newNode]);

    if (type === 'source') {
      setSourceCount((count) => count + 1);
    } else {
      setDestinationCount((count) => count + 1);
    }
  };

  return (
    <div className="pipeline-builder">
      <div className="controls">
        <button onClick={() => addNode('source')}>Add Source</button>
        <button onClick={() => addNode('destination')}>Add Destination</button>
      </div>
      <ReactFlowProvider>
        <div className="flow-container">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            onEdgeClick={onEdgeClick}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default PipelineBuilder;
