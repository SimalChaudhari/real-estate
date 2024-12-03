import React, { useCallback, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Controls,
  MiniMap,
  Background,
} from 'react-flow-renderer';
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, Save, PlayArrow, Delete, TaskAlt, AltRoute, Flag } from '@mui/icons-material'; // Icons

const initialNodes = [
  {
    id: '1',
    data: { label: 'Start' },
    position: { x: 100, y: 50 },
    style: { background: '#007bff', color: '#fff', borderRadius: '8px' },
  },
];

const initialEdges = [];

export function CreateWorkflow() {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeDetails, setNodeDetails] = useState({});

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const handleAddNode = (type) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label: `New ${type}` },
      position: { x: 150, y: 150 },
      style: {
        background: type === 'Action' ? '#28a745' : type === 'Decision' ? '#ffc107' : '#dc3545',
        color: '#fff',
        borderRadius: '8px',
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
    setNodeDetails(node.data);
  };

  const updateNodeDetails = (key, value) => {
    setNodeDetails((prev) => ({ ...prev, [key]: value }));
  };

  const updateNode = () => {
    if (!selectedNode) return;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, ...nodeDetails } }
          : node
      )
    );
    setSelectedNode(null);
    setNodeDetails({});
  };

  const handleCancel = () => {
    navigate('/workflows');
  };

  return (
    <ReactFlowProvider>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {/* Left Sidebar */}
        <Grid item xs={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Add Node
            </Typography>

            <Button
              variant="contained"
              fullWidth
              startIcon={<TaskAlt />} // Action Icon
              sx={{ marginBottom: 2, justifyContent: 'flex-start' }}
              onClick={() => handleAddNode('Action')}
            >
              Action
            </Button>
            <Button
              variant="contained"
              fullWidth
              startIcon={<AltRoute />} // Decision Icon
              sx={{ marginBottom: 2, justifyContent: 'flex-start' }}
              onClick={() => handleAddNode('Decision')}
            >
              Decision
            </Button>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Flag />} // End Icon
              sx={{ justifyContent: 'flex-start' }}
              onClick={() => handleAddNode('End')}
            >
              End
            </Button>

            <Typography variant="h6" sx={{ marginTop: 3 }}>
              Templates
            </Typography>
            <FormControl fullWidth sx={{ marginTop: 1 }}>
              <InputLabel>Select a template</InputLabel>
              <Select>
                <MenuItem value="template1">Template 1</MenuItem>
                <MenuItem value="template2">Template 2</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        {/* React Flow Diagram Area */}
        <Grid item xs={6}>
          <div style={{ height: '500px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={handleNodeClick}
              fitView
            >
              <MiniMap />
              <Controls />
              <Background />
            </ReactFlow>
          </div>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={3}>
          <Paper sx={{ padding: 2 }}>
            {selectedNode ? (
              <>
                <Typography variant="h6" gutterBottom>
                  Edit Node: {selectedNode.data.label}
                </Typography>
                <TextField
                  label="Label"
                  value={nodeDetails.label || ''}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  onChange={(e) => updateNodeDetails('label', e.target.value)}
                />
                <TextField
                  label="X Position"
                  value={selectedNode.position.x}
                  fullWidth
                  disabled
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Y Position"
                  value={selectedNode.position.y}
                  fullWidth
                  disabled
                />
                {selectedNode.data.label.includes('Decision') && (
                  <TextField
                    label="Condition"
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Enter condition (e.g., amount)"
                    sx={{ marginBottom: 2 }}
                    onChange={(e) => updateNodeDetails('condition', e.target.value)}
                  />
                )}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: 2 }}
                  onClick={updateNode}
                >
                  Update Node
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  sx={{ marginTop: 1 }}
                  onClick={() =>
                    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id))
                  }
                >
                  <Delete /> Delete Node
                </Button>
              </>
            ) : (
              <Typography>Select a node to edit</Typography>
            )}

            <Box sx={{ marginTop: 3 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<Visibility />} 
                sx={{ marginBottom: 2, justifyContent: 'flex-start' }}
              >
                Preview Workflow
              </Button>

              <Button
                variant="contained"
                fullWidth
                startIcon={<Save />} 
                sx={{ marginBottom: 2, justifyContent: 'flex-start' }}
              >
                Save Workflow
              </Button>

              <Button
                variant="contained"
                fullWidth
                startIcon={<PlayArrow />} 
                sx={{ marginBottom: 2, justifyContent: 'flex-start' }}
              >
                Test Workflow
              </Button>

              <Button variant="outlined" fullWidth onClick={handleCancel} sx={{ marginTop: 1 }}>
                Cancel
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </ReactFlowProvider>
  );
}

export default CreateWorkflow;
