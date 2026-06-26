import React, { useState, useEffect } from 'react';
import { Mail, Edit3, Cpu, GitFork, Send, Terminal, Play, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'transform' | 'agent' | 'logic' | 'action';
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number; // grid position percentage
  y: number;
  status: 'idle' | 'running' | 'success' | 'error';
}

const INITIAL_NODES: WorkflowNode[] = [
  { id: '1', type: 'trigger', label: 'Email IMAP', desc: 'Trigger on new email', icon: Mail, x: 10, y: 35, status: 'idle' },
  { id: '2', type: 'transform', label: 'Edit Fields', desc: 'Sanitize parameters', icon: Edit3, x: 32, y: 35, status: 'idle' },
  { id: '3', type: 'agent', label: 'AI Agent', desc: 'Inference logic node', icon: Cpu, x: 55, y: 25, status: 'idle' },
  { id: '4', type: 'logic', label: 'IF Router', desc: 'Conditional branch', icon: GitFork, x: 55, y: 65, status: 'idle' },
  { id: '5', type: 'action', label: 'Telegram Dispatch', desc: 'Send telegram alert', icon: Send, x: 80, y: 25, status: 'idle' },
  { id: '6', type: 'action', label: 'Send Email', desc: 'Send transactional mail', icon: Mail, x: 80, y: 65, status: 'idle' }
];

export default function NodeEditor() {
  const [nodes, setNodes] = useState<WorkflowNode[]>(INITIAL_NODES);
  const [activeNodeId, setActiveNodeId] = useState<string>('3'); // AI Agent is active by default
  const [prompt, setPrompt] = useState<string>('Check sales forecast email for Q3 and alert Slack if margin drops below 18%');
  const [terminalLogs, setTerminalLogs] = useState<string>('System initialized. Canvas online.\nReady to execute node chain...\nSelect any node to view configuration.');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [progressStep, setProgressStep] = useState<number>(-1);

  // Connection connections list
  const connections = [
    { from: '1', to: '2', type: 'solid' },
    { from: '2', to: '3', type: 'solid' },
    { from: '2', to: '4', type: 'dashed' },
    { from: '3', to: '5', type: 'solid' },
    { from: '4', to: '6', type: 'solid' }
  ];

  // Helper to find node by ID
  const getNode = (id: string) => nodes.find(n => n.id === id);

  // Execute the simulation sequence
  const handleRunWorkflow = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setTerminalLogs('⚡ Initializing remote workflow execution...\n');
    setProgressStep(0);

    const stepsOrder = ['1', '2', '3', '5']; // active sequence for the happy path

    // Staggered node status animation
    for (let i = 0; i < stepsOrder.length; i++) {
      const activeId = stepsOrder[i];
      setProgressStep(i);
      setNodes(prev => prev.map(n => ({
        ...n,
        status: n.id === activeId ? 'running' : (stepsOrder.slice(0, i).includes(n.id) ? 'success' : 'idle')
      })));

      // Add simple step log
      const nodeObj = INITIAL_NODES.find(n => n.id === activeId);
      setTerminalLogs(prev => prev + `▶ Executing [${nodeObj?.label}]... status: IN_PROGRESS\n`);
      await new Promise(r => setTimeout(r, 800));
    }

    // Set all visited to success
    setNodes(prev => prev.map(n => ({
      ...n,
      status: stepsOrder.includes(n.id) ? 'success' : 'idle'
    })));

    setTerminalLogs(prev => prev + `📡 Contacting central inference server via secure proxy API...\n`);

    try {
      const response = await fetch('/api/workflow/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, nodes: INITIAL_NODES.filter(n => stepsOrder.includes(n.id)) })
      });
      const data = await response.json();
      if (data.success) {
        setTerminalLogs(prev => prev + `\n--- TERMINAL OUTPUT RECEIVED ---\n${data.output}\n`);
      } else {
        setTerminalLogs(prev => prev + `⚠️ Error: ${data.error || 'Unknown endpoint exception'}\n`);
      }
    } catch (err: any) {
      setTerminalLogs(prev => prev + `⚠️ Network transmission failure: ${err.message}. Running fallback local compiler...\n`);
    } finally {
      setIsRunning(false);
      setProgressStep(-1);
    }
  };

  const handleReset = () => {
    setNodes(INITIAL_NODES);
    setActiveNodeId('3');
    setTerminalLogs('System reset. Canvas flushed.\nReady to run...');
    setProgressStep(-1);
  };

  return (
    <section id="canvas" className="relative py-24 bg-[#172B36] border-t border-gray-800">
      <div className="absolute inset-0 noise-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#114C5A] bg-[#114C5A]/20 mb-4">
            <Sparkles className="w-4 h-4 text-[#FFC801]" />
            <span className="text-[10px] font-mono text-[#D9E8E2] uppercase tracking-wider font-bold">Intuitive Node Graph</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-[#F1F6F4] mb-4">
            Build Logic at Scale
          </h2>
          <p className="text-[#D9E8E2]/80 font-sans text-lg">
            Design, deploy, and execute sophisticated AI workflows through a high-precision node grid canvas. No complex coding—just pure, transparent logic.
          </p>
        </div>

        {/* Visual Graph Editor Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Node Graph Canvas (7 Columns) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col rounded-2xl border border-[#114C5A]/40 bg-[#172B36] overflow-hidden shadow-2xl relative min-h-[500px]">
            {/* Top Editor Bar */}
            <div className="bg-[#172B36]/95 border-b border-[#114C5A]/30 p-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-xs font-mono text-gray-400 ml-2">armory_canvas_v1.0.3_prod</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full animate-pulse">
                  ● AGENT INJECT ACTIVE
                </span>
              </div>
            </div>

            {/* Canvas Body (Grid Background) */}
            <div className="flex-1 relative p-8 h-[400px] overflow-hidden bg-[#101e26] bg-[linear-gradient(to_right,#1b2e3a_1px,transparent_1px),linear-gradient(to_bottom,#1b2e3a_1px,transparent_1px)] bg-[size:24px_24px] select-none">
              
              {/* Dynamic SVG Connection Lines layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                  <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#114C5A" />
                    <stop offset="50%" stopColor="#FFC801" />
                    <stop offset="100%" stopColor="#FF9932" />
                  </linearGradient>
                  <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 2 L 8 5 L 0 8 z" fill="#114C5A" />
                  </marker>
                  <marker id="active-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 2 L 8 5 L 0 8 z" fill="#FFC801" />
                  </marker>
                </defs>

                {/* Render static / animating lines */}
                {connections.map((conn, idx) => {
                  const fromNode = getNode(conn.from);
                  const toNode = getNode(conn.to);
                  if (!fromNode || !toNode) return null;

                  // Simple straight coordinates calculation
                  const x1 = `${fromNode.x}%`;
                  const y1 = `${fromNode.y}%`;
                  const x2 = `${toNode.x}%`;
                  const y2 = `${toNode.y}%`;

                  const isConnectionRunning = isRunning && 
                    (fromNode.status === 'success' || fromNode.status === 'running') &&
                    (toNode.status === 'running' || toNode.status === 'success' || toNode.id === '5');

                  return (
                    <g key={idx}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={isConnectionRunning ? 'url(#activeGrad)' : '#114C5A'}
                        strokeWidth={isConnectionRunning ? 3 : 1.5}
                        strokeDasharray={conn.type === 'dashed' ? '5,5' : 'none'}
                        markerEnd={isConnectionRunning ? 'url(#active-arrow)' : 'url(#arrow)'}
                        className="transition-all duration-300"
                      />
                      {isConnectionRunning && (
                        <circle r="4" fill="#FFC801" className="animate-ping">
                          <animateMotion path={`M ${fromNode.x * 6} ${fromNode.y * 4} L ${toNode.x * 6} ${toNode.y * 4}`} dur="1.5s" repeatCount="indefinite" />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Render Nodes */}
              {nodes.map((node) => {
                const IconComp = node.icon;
                const isSelected = activeNodeId === node.id;
                
                // Color mapping for nodes
                let statusClasses = 'border-[#114C5A]/40 bg-[#172B36]/90 text-gray-300';
                if (node.status === 'running') {
                  statusClasses = 'border-[#FFC801] bg-[#114C5A]/50 text-[#FFC801] shadow-lg shadow-[#FFC801]/10';
                } else if (node.status === 'success') {
                  statusClasses = 'border-green-500 bg-green-500/10 text-green-400';
                }

                if (isSelected && node.status !== 'running') {
                  statusClasses = 'border-[#FF9932] bg-[#172B36]/90 text-white shadow-xl shadow-[#FF9932]/5';
                }

                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNodeId(node.id)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 z-10 w-44 hover:scale-105 hover:shadow-lg focus:outline-none ${statusClasses}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#FF9932]/10 text-[#FF9932]' : 'bg-[#114C5A]/30 text-[#D9E8E2]'}`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="font-mono font-bold text-xs truncate">{node.label}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-sans truncate">{node.desc}</p>
                    {node.status === 'running' && (
                      <div className="absolute right-2.5 top-2.5 w-1.5 h-1.5 rounded-full bg-[#FFC801] animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Interactive Prompt Input Area */}
            <div className="bg-[#172B36]/95 border-t border-[#114C5A]/30 p-4">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter prompt to trigger AI workflow..."
                    className="w-full bg-[#101e26] border border-[#114C5A] rounded-xl py-3 pl-4 pr-10 text-sm text-[#F1F6F4] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FFC801]"
                  />
                  <Sparkles className="w-4 h-4 text-[#FFC801] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleRunWorkflow}
                    disabled={isRunning}
                    className={`flex items-center gap-2 font-mono text-xs font-bold px-4 py-3 rounded-xl transition-all duration-300 ${
                      isRunning
                        ? 'bg-[#114C5A]/40 text-gray-500 border border-[#114C5A]/20 cursor-not-allowed'
                        : 'bg-[#FFC801] text-black hover:bg-[#FF9932] shadow-md shadow-[#FFC801]/5'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isRunning ? 'RUNNING...' : 'RUN PIPELINE'}</span>
                  </button>
                  <button
                    onClick={handleReset}
                    aria-label="Reset Workflow Editor"
                    className="p-3 rounded-xl bg-gray-800/40 border border-gray-700/60 text-gray-400 hover:text-white hover:bg-gray-800/80 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Config Side-Panel & Live Terminal (4 Columns) */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            
            {/* Selected Node Inspector Card */}
            <div className="rounded-2xl border border-[#114C5A]/40 bg-[#172B36] p-6 shadow-xl relative overflow-hidden">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#FFC801] mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>Node Inspector</span>
              </h3>
              {(() => {
                const node = getNode(activeNodeId);
                if (!node) return <p className="text-xs text-gray-400">Select any node on the grid to configure parameters.</p>;
                return (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 bg-[#114C5A]/30 text-[#FFC801] rounded-xl border border-[#114C5A]/50">
                        <node.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-mono font-bold text-sm text-[#F1F6F4]">{node.label}</h4>
                        <span className="text-[9px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full font-mono">
                          ID: {node.id} // TYPE: {node.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4 text-xs font-sans">
                      <div>
                        <label className="block text-gray-400 font-mono text-[10px] uppercase mb-1">Description</label>
                        <p className="text-gray-300 leading-relaxed bg-[#101e26] p-2.5 rounded-lg border border-gray-800">{node.desc}</p>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-mono text-[10px] uppercase mb-1">State Variable</label>
                        <div className="flex items-center justify-between bg-gray-800/40 px-3 py-2 rounded-lg text-gray-300 font-mono">
                          <span>status_vector</span>
                          <span className="text-green-400 font-bold uppercase text-[9px] bg-green-500/10 px-1.5 py-0.5 rounded">
                            {node.status}
                          </span>
                        </div>
                      </div>
                      {node.id === '3' && (
                        <div>
                          <label className="block text-gray-400 font-mono text-[10px] uppercase mb-1">Model Profile Selection</label>
                          <select className="w-full bg-[#101e26] border border-[#114C5A]/50 text-xs font-mono rounded-lg p-2 text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFC801]">
                            <option>gemini-2.5-flash (Standard)</option>
                            <option>gemini-2.5-pro (High reasoning)</option>
                            <option>custom-pipeline-llama3 (Standby)</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Glowing Retro Terminal Outputs */}
            <div className="flex-1 rounded-2xl border border-[#114C5A]/40 bg-[#101e26] p-5 shadow-inner relative flex flex-col justify-between min-h-[250px]">
              <div>
                <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-3">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#FFC801] rounded-full animate-pulse" />
                    Live Execution Logs
                  </span>
                  <button onClick={() => setTerminalLogs('Flushed console.')} className="text-[9px] font-mono text-gray-500 hover:text-white uppercase">
                    Clear
                  </button>
                </div>
                <div className="font-mono text-[11px] text-[#D9E8E2]/90 leading-relaxed whitespace-pre-wrap max-h-[220px] overflow-y-auto pr-1">
                  {terminalLogs}
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-900/60 flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
                <AlertCircle className="w-3.5 h-3.5 text-[#FF9932]" />
                <span>Outputs are isolated safely in local runtime sandbox.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
