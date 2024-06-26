import React, { useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  MiniMap,
  Controls,
  Background,
  Handle,
} from "reactflow";
import "reactflow/dist/style.css";
import "./PipelineBuilder.css";
import { PlusIcon } from "@heroicons/react/outline";
import '@fortawesome/fontawesome-free/css/all.min.css';

const initialNodes = [];
const initialEdges = [];

// const SourceNode = ({ data }) => (
//   <div className="bg-blue-100 border border-blue-500 p-0 rounded text-center relative m-0 h-28 ">
//   <div className="bg-blue-100 border border-blue-300 p-4 rounded text-center relative h-0 flex items-center justify-center">
//   {data.label}
//   {/* <div className="arrow-right"></div> */}
//   <Handle type="source" position="right" id="a" className="w-2 h-2 bg-blue-500"/>
//   </div>
//   <p>db</p>
// </div>
// );

const SourceNode = ({ data }) => (
  <div className="main-section">
    <div className="second-section">
    <i className="fas fa-arrow-right"></i> {/* FontAwesome right arrow icon */}
    </div>
    <div className="label1">
      {data.label}
     <div className="db1">
       db
     </div>
    </div>
    <Handle type="source" position="right" id="a" className="w-2 h-2 bg-blue-500" />
  </div>
);

// const DestinationNode = ({ data }) => (
//   <div className="bg-red-100 border border-red-500 p-0 rounded text-center  h-28">
//     <div className="bg-red-100 border border-red-300 p-5 rounded text-center h-0">
//       {data.label}
//       <Handle type="target" position="left" id="b" className="w-2 h-2 bg-red-500" />

//       <p>db</p>
//     </div>
//   </div>
// );

const DestinationNode = ({ data }) => (
  <div className="des-main-section">
    <div className="second-des-section">
      {data.label}
     <div className="db2">db</div> 
    </div>
    <div className="last-section">
    <i className="fas fa-arrow-left"></i>
    </div>
    <Handle type="target" position="left" id="b" className="w-2 h-2 bg-red-500" />
  </div>
);

// const SourceNode = ({ data }) => (
//     <div className="bg-blue-100 border border-blue-500 p-2 rounded text-center">
//       {data.label}
//       <Handle type="source" position="right" id="a" className="w-2 h-2 bg-blue-500" />
//     </div>
//   );
  
  // const DestinationNode = ({ data }) => (
  //   <div className="bg-red-100 border border-red-500 p-2 rounded text-center">
  //     {data.label}
  //     <Handle type="target" position="left" id="b" className="w-2 h-2 bg-red-500" />
  //   </div>
  // );

const nodeTypes = {
  source: SourceNode,
  destination: DestinationNode,
};

const PipelineBuilder = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [sourceCount, setSourceCount] = useState(0);
  const [destinationCount, setDestinationCount] = useState(0);
  var [dragType, setDrageType] = useState("");

  const onConnect = (params) => {
    const sourceNode = nodes.find((node) => node.id === params.source);
    const targetNode = nodes.find((node) => node.id === params.target);

    // Prevent connecting two sources or two destinations
    if (sourceNode.type === targetNode.type) {
      alert("You cannot connect two sources or two destinations.");
      return;
    }

    setEdges((eds) => addEdge(params, eds));
  };

  const onEdgeClick = (event, edge) => {
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  };

  const getNodePosition = (type, index) => {
    const x = type === "source" ? 90 : 900;
    const y = 50 + index * 150; // Adjust the vertical spacing as needed
    return { x, y };
  };

  const addNode = (type) => {
    const index = type === "source" ? sourceCount : destinationCount;
    const newNode = {
      id: `${type}-${index + 1}`,
      type,
      position: getNodePosition(type, index),
      data: {
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${index + 1}`,
      },
    };

    console.log("Adding node:", newNode); // Debug log

    setNodes((nds) => [...nds, newNode]);

    if (type === "source") {
      setSourceCount((count) => count + 1);
    } else {
      setDestinationCount((count) => count + 1);
    }
  };

  const onDrop = (event, type) => {
    event.preventDefault();

    const position = { x: event.clientX, y: event.clientY };

    const newNode = {
      id: `${type}-${
        type === "source" ? sourceCount + 1 : destinationCount + 1
      }`,
      type,
      position,
      data: {
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${
          type === "source" ? sourceCount + 1 : destinationCount + 1
        }`,
      },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);

    if (type === "source") {
      setSourceCount((count) => count + 1);
    } else {
      setDestinationCount((count) => count + 1);
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col items-center pt-10">
      <div className="mb-2 pb-6 flex justify-start space-x-10 w-full px-4">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => addNode("source")}
          draggable
          onDragStart={(event) => {
            setDrageType("source");
            event.dataTransfer.setData("application/reactflow", "source");
          }}
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-700">
            <PlusIcon className="h-6 w-6 text-white" />
          </div>
          <p className="text-gray-500 mt-2">Create a Source</p>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => addNode("destination")}
          draggable
          onDragStart={(event) => {
            setDrageType("destination");
            event.dataTransfer.setData("application/reactflow", "destination");
          }}
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 hover:bg-red-700">
            <PlusIcon className="h-6 w-6 text-white" />
          </div>
          <p className="text-gray-500 mt-2">Create a Destination</p>
        </div>
      </div>
      <ReactFlowProvider>
        <div
          className="flow-container h-[800px] w-full border border-gray-300 bg-gray-100 px-4"
          onDrop={(event) => onDrop(event, dragType)}
          onDragOver={onDragOver}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            //  fitView
            onEdgeClick={onEdgeClick}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        {/* <div
          className="flow-container h-[800px] w-full border border-gray-300 bg-gray-100 px-4"
          onDrop={(event) => onDrop(event, 'destination')}
          onDragOver={onDragOver}
        /> */}
      </ReactFlowProvider>
    </div>
  );
};

export default PipelineBuilder;
