"use client";

import { motion } from "framer-motion";

const aiNodes = [
  { x: 40, y: 60, label: "AI" },
  { x: 30, y: 130, label: "ML" },
  { x: 70, y: 190, label: "PY" },
];

const webNodes = [
  { x: 360, y: 50, label: "TS" },
  { x: 390, y: 120, label: "UI" },
  { x: 350, y: 185, label: "API" },
];

const bridgeNode = { x: 210, y: 120 };

export function NeuralBridge() {
  return (
    <svg
      viewBox="0 0 430 250"
      className="w-full h-auto max-w-lg"
      role="img"
      aria-label="Diagram connecting AI and web-development skill clusters"
    >
      <defs>
        <linearGradient id="edgeGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>

      {/* Edges: AI nodes -> bridge, bridge -> Web nodes */}
      {[...aiNodes, ...webNodes].map((n, i) => (
        <motion.line
          key={i}
          x1={n.x}
          y1={n.y}
          x2={bridgeNode.x}
          y2={bridgeNode.y}
          stroke="url(#edgeGradient)"
          strokeWidth={1.5}
          className="neural-edge"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.6 + i * 0.08, duration: 0.6 }}
        />
      ))}

      {/* Bridge (central) node */}
      <motion.circle
        cx={bridgeNode.x}
        cy={bridgeNode.y}
        r={14}
        fill="url(#edgeGradient)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 160 }}
      />

      {/* AI cluster */}
      {aiNodes.map((n, i) => (
        <g key={`ai-${i}`}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={9}
            fill="#0B0F19"
            stroke="#3B82F6"
            strokeWidth={1.5}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 160 }}
          />
          <text
            x={n.x}
            y={n.y - 16}
            textAnchor="middle"
            className="fill-[#8B93A7] text-[9px] font-sans"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* Web cluster */}
      {webNodes.map((n, i) => (
        <g key={`web-${i}`}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={9}
            fill="#0B0F19"
            stroke="#22D3EE"
            strokeWidth={1.5}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 160 }}
          />
          <text
            x={n.x}
            y={n.y - 16}
            textAnchor="middle"
            className="fill-[#8B93A7] text-[9px] font-sans"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}