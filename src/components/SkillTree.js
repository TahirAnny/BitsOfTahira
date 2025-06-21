import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { personalInfo } from '../config/personalInfo';

const skillData = personalInfo.skillTree;

const SkillTree = () => {
  const ref = useRef();
  const collapsedNodesRef = useRef(new Set());
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, text: "" });

  useEffect(() => {
    // Wait for the container to be available and have dimensions
    if (!ref.current) return;
    
    const initializeTree = () => {
      const width = ref.current.clientWidth;
      const height = 700;
      
      // Ensure we have valid dimensions
      if (width === 0) {
        setTimeout(initializeTree, 100);
        return;
      }

      const root = d3.hierarchy(skillData);
      const nodes = root.descendants();
      const links = root.links();

      // Add random initial positions to child nodes only
      nodes.forEach(node => {
        if (node.depth === 2) {
          // Child nodes get random positions
          node.x = Math.random() * width;
          node.y = Math.random() * height;
        } else {
          // Root and parent nodes get centered positions
          node.x = width / 2;
          node.y = height / 2;
        }
      });

      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", "100%")
        .attr("height", height)
        .style("background", "transparent");

      // Add gradient definitions
      const defs = svg.append("defs");
      
      // Add filter for glow effects
      defs.append("filter")
        .attr("id", "glow")
        .append("feGaussianBlur")
        .attr("stdDeviation", "3")
        .attr("result", "coloredBlur");
      defs.select("#glow")
        .append("feMerge")
        .append("feMergeNode")
        .attr("in", "coloredBlur");
      defs.select("#glow")
        .select("feMerge")
        .append("feMergeNode")
        .attr("in", "SourceGraphic");
      
      // Add filter for shadow effects
      defs.append("filter")
        .attr("id", "shadow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");
      defs.select("#shadow")
        .append("feDropShadow")
        .attr("dx", "0")
        .attr("dy", "2")
        .attr("stdDeviation", "3")
        .attr("flood-color", "rgba(0,0,0,0.3)")
        .attr("flood-opacity", "0.3");
      
      // .NET Gradient
      defs.append("radialGradient")
        .attr("id", "dotnetGradient")
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#C4AEAD")
        .attr("stop-opacity", 1);
      defs.select("#dotnetGradient")
        .append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#C4AEAD")
        .attr("stop-opacity", 0.8);
      defs.select("#dotnetGradient")
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#C4AEAD")
        .attr("stop-opacity", 0.4);
      
      // Cloud Gradient
      defs.append("radialGradient")
        .attr("id", "cloudGradient")
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#888078")
        .attr("stop-opacity", 1);
      defs.select("#cloudGradient")
        .append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#888078")
        .attr("stop-opacity", 0.8);
      defs.select("#cloudGradient")
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#888078")
        .attr("stop-opacity", 0.4);
      
      // Database Gradient
      defs.append("radialGradient")
        .attr("id", "databaseGradient")
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#343434")
        .attr("stop-opacity", 1);
      defs.select("#databaseGradient")
        .append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#343434")
        .attr("stop-opacity", 0.8);
      defs.select("#databaseGradient")
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#343434")
        .attr("stop-opacity", 0.4);
      
      // API Gradient
      defs.append("radialGradient")
        .attr("id", "apiGradient")
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#3e424b")
        .attr("stop-opacity", 1);
      defs.select("#apiGradient")
        .append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#3e424b")
        .attr("stop-opacity", 0.8);
      defs.select("#apiGradient")
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#3e424b")
        .attr("stop-opacity", 0.4);
      
      // Language Gradient
      defs.append("radialGradient")
        .attr("id", "languageGradient")
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#e5d9f2")
        .attr("stop-opacity", 1);
      defs.select("#languageGradient")
        .append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#e5d9f2")
        .attr("stop-opacity", 0.8);
      defs.select("#languageGradient")
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#e5d9f2")
        .attr("stop-opacity", 0.4);
      
      // Version Control Gradient
      defs.append("radialGradient")
        .attr("id", "versionControlGradient")
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#808080")
        .attr("stop-opacity", 1);
      defs.select("#versionControlGradient")
        .append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#808080")
        .attr("stop-opacity", 0.8);
      defs.select("#versionControlGradient")
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#808080")
        .attr("stop-opacity", 0.4);
      
      // Frontend Gradient
      defs.append("radialGradient")
        .attr("id", "frontendGradient")
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#7c6e7f")
        .attr("stop-opacity", 1);
      defs.select("#frontendGradient")
        .append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#7c6e7f")
        .attr("stop-opacity", 0.8);
      defs.select("#frontendGradient")
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#7c6e7f")
        .attr("stop-opacity", 0.4);
      
      // Project Management Gradient
      defs.append("radialGradient")
        .attr("id", "projectManagementGradient")
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#D7d2cb")
        .attr("stop-opacity", 1);
      defs.select("#projectManagementGradient")
        .append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#D7d2cb")
        .attr("stop-opacity", 0.8);
      defs.select("#projectManagementGradient")
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#D7d2cb")
        .attr("stop-opacity", 0.4);
      
      // Architecture Gradient
      defs.append("radialGradient")
        .attr("id", "architectureGradient")
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#777696")
        .attr("stop-opacity", 1);
      defs.select("#architectureGradient")
        .append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#777696")
        .attr("stop-opacity", 0.8);
      defs.select("#architectureGradient")
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#777696")
        .attr("stop-opacity", 0.4);
      
      // Testing Gradient
      defs.append("radialGradient")
        .attr("id", "testingGradient")
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#738678")
        .attr("stop-opacity", 1);
      defs.select("#testingGradient")
        .append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#738678")
        .attr("stop-opacity", 0.8);
      defs.select("#testingGradient")
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#738678")
        .attr("stop-opacity", 0.4);

      const simulation = d3
        .forceSimulation(nodes)
        .force("link", d3.forceLink(links).distance(100).strength(1).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);

      const link = svg
        .append("g")
        .attr("stroke", "#64748b")
        .attr("stroke-opacity", 0.4)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", 1);

      // Create node groups for circles and text
      const node = svg
        .append("g")
        .selectAll("g")
        .data(nodes)
        .join("g")
        .call(drag(simulation))
        .style("cursor", "pointer");

      // Add circles to nodes with different designs based on node type
      node.each(function(d) {
        const nodeGroup = d3.select(this);
        
        if (d.depth === 0) {
          // Root node - double circle design (larger)
          // Outer ring (hollow circle)
          nodeGroup
            .append("circle")
            .attr("r", 55)
            .attr("fill", "none")
            .attr("stroke", "#9897A9")
            .attr("stroke-width", 3)
            .attr("class", "outer-circle");
          
          // Inner filled circle
          nodeGroup
            .append("circle")
            .attr("r", 45)
            .attr("fill", "#9897A9")
            .attr("stroke", "none")
            .attr("class", "inner-circle");
        } else if (d.children) {
          // Parent nodes - double circle design
          // Outer ring (hollow circle)
          nodeGroup
            .append("circle")
            .attr("r", 40)
            .attr("fill", "none")
            .attr("stroke", "#777696")
            .attr("stroke-width", 2)
            .attr("class", "outer-circle");
          
          // Inner filled circle
          nodeGroup
            .append("circle")
            .attr("r", 32)
            .attr("fill", "#777696")
            .attr("stroke", "none")
            .attr("class", "inner-circle");
        } else {
          // Skill nodes - single small circle
          const isDotNetChild = d.parent && d.parent.data.name.includes('.NET') || d.parent && d.parent.data.name.includes('Back-End');
          const isCloudChild = d.parent && d.parent.data.name.includes('Cloud') || d.parent && d.parent.data.name.includes('DevOps');
          const isDatabaseChild = d.parent && d.parent.data.name.includes('Database') || d.parent && d.parent.data.name.includes('Persistence');
          const isApiChild = d.parent && d.parent.data.name.includes('API') || d.parent && d.parent.data.name.includes('Integration');
          const isLanguageChild = d.parent && d.parent.data.name.includes('Languages') || d.parent && d.parent.data.name.includes('Markup');
          const isVersionControlChild = d.parent && d.parent.data.name.includes('Version Control') || d.parent && d.parent.data.name.includes('Collaboration');
          const isFrontEndChild = d.parent && d.parent.data.name.includes('Front-End') || d.parent && d.parent.data.name.includes('UI');
          const isProjectManagementChild = d.parent && d.parent.data.name.includes('Project Management') || d.parent && d.parent.data.name.includes('Methodologies');
          const isArchitectureChild = d.parent && d.parent.data.name.includes('Architecture') || d.parent && d.parent.data.name.includes('Design Patterns');
          const isTestingChild = d.parent && d.parent.data.name.includes('Testing') || d.parent && d.parent.data.name.includes('Quality Assurance');
          let nodeColor = "#655967"; // Default color
          
          if (isDotNetChild) {
            nodeColor = "#C4AEAD";
          } else if (isCloudChild) {
            nodeColor = "#888078";
          } else if (isDatabaseChild) {
            nodeColor = "#343434";
          } else if (isApiChild) {
            nodeColor = "#3e424b";
          } else if (isLanguageChild) {
            nodeColor = "#e5d9f2";
          } else if (isVersionControlChild) {
            nodeColor = "#808080";
          } else if (isFrontEndChild) {
            nodeColor = "#7c6e7f";
          } else if (isProjectManagementChild) {
            nodeColor = "#D7d2cb";
          } else if (isArchitectureChild) {
            nodeColor = "#777696";
          } else if (isTestingChild) {
            nodeColor = "#738678";
          }
          
          nodeGroup
            .append("circle")
            .attr("r", 20)
            .attr("fill", nodeColor)
            .attr("stroke", nodeColor)
            .attr("stroke-width", 1.5)
            .attr("fill-opacity", 0.7)
            .attr("stroke-opacity", 0.8)
            .style("filter", "url(#shadow)")
            .style("animation", "pulse 3s ease-in-out infinite")
            .attr("class", "skill-circle");
        }
      });

      // Add text inside circles with wrapping for parent nodes
      node.each(function(d) {
        const nodeGroup = d3.select(this);
        
        if (d.depth === 0) {
          // Root node - single line text
          nodeGroup
            .append("text")
            .text(d.data.name)
            .attr("font-size", "14px")
            .attr("fill", "white")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("font-weight", "bold")
            .attr("class", "node-text")
            .style("pointer-events", "none");
        } else if (d.children) {
          // Parent nodes - wrapped text
          const words = d.data.name.split(' ');
          const maxWidth = 30; // Maximum width for text wrapping
          const lineHeight = 8;
          
          let currentLine = '';
          let lines = [];
          
          words.forEach(word => {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            if (testLine.length * 6 > maxWidth) { // Approximate character width
              if (currentLine) {
                lines.push(currentLine);
                currentLine = word;
              } else {
                lines.push(word);
              }
            } else {
              currentLine = testLine;
            }
          });
          if (currentLine) {
            lines.push(currentLine);
          }
          
          // Limit to 3 lines maximum
          lines = lines.slice(0, 3);
          
          // Check if this is .NET ecosystem node
          const isDotNetNode = d.data.name.includes('.NET') || d.data.name.includes('Back-End');
          const isCloudNode = d.data.name.includes('Cloud') || d.data.name.includes('DevOps');
          const isDatabaseNode = d.data.name.includes('Database') || d.data.name.includes('Persistence');
          const isApiNode = d.data.name.includes('API') || d.data.name.includes('Integration');
          const isLanguageNode = d.data.name.includes('Languages') || d.data.name.includes('Markup');
          const isVersionControlNode = d.data.name.includes('Version Control') || d.data.name.includes('Collaboration');
          const isFrontEndNode = d.data.name.includes('Front-End') || d.data.name.includes('UI');
          const isProjectManagementNode = d.data.name.includes('Project Management') || d.data.name.includes('Methodologies');
          const isArchitectureNode = d.data.name.includes('Architecture') || d.data.name.includes('Design Patterns');
          const isTestingNode = d.data.name.includes('Testing') || d.data.name.includes('Quality Assurance');
          
          lines.forEach((line, i) => {
            nodeGroup
              .append("text")
              .text(line)
              .attr("font-size", "9px")
              .attr("fill", "white")
              .attr("text-anchor", "middle")
              .attr("dominant-baseline", "middle")
              .attr("font-weight", "bold")
              .attr("y", (i - (lines.length - 1) / 2) * lineHeight)
              .attr("class", "node-text")
              .style("pointer-events", "none");
          });
          
          // Update circle colors for .NET ecosystem
          if (isDotNetNode) {
            nodeGroup.select(".outer-circle")
              .attr("stroke", "#C4AEAD")
              .attr("stroke-opacity", 0.8)
              .style("filter", "url(#shadow)");
            nodeGroup.select(".inner-circle")
              .attr("fill", "url(#dotnetGradient)");
          }
          
          // Update circle colors for Cloud, DevOps & Infrastructure
          if (isCloudNode) {
            nodeGroup.select(".outer-circle")
              .attr("stroke", "#888078")
              .attr("stroke-opacity", 0.8)
              .style("filter", "url(#shadow)");
            nodeGroup.select(".inner-circle")
              .attr("fill", "url(#cloudGradient)");
          }
          
          // Update circle colors for Databases & Persistence
          if (isDatabaseNode) {
            nodeGroup.select(".outer-circle")
              .attr("stroke", "#343434")
              .attr("stroke-opacity", 0.8)
              .style("filter", "url(#shadow)");
            nodeGroup.select(".inner-circle")
              .attr("fill", "url(#databaseGradient)");
          }
          
          // Update circle colors for API Design & Integration
          if (isApiNode) {
            nodeGroup.select(".outer-circle")
              .attr("stroke", "#3e424b")
              .attr("stroke-opacity", 0.8)
              .style("filter", "url(#shadow)");
            nodeGroup.select(".inner-circle")
              .attr("fill", "url(#apiGradient)");
          }
          
          // Update circle colors for Languages & Markup
          if (isLanguageNode) {
            nodeGroup.select(".outer-circle")
              .attr("stroke", "#e5d9f2")
              .attr("stroke-opacity", 0.8)
              .style("filter", "url(#shadow)");
            nodeGroup.select(".inner-circle")
              .attr("fill", "url(#languageGradient)");
          }
          
          // Update circle colors for Version Control (Git color)
          if (isVersionControlNode) {
            nodeGroup.select(".outer-circle")
              .attr("stroke", "#808080")
              .attr("stroke-opacity", 0.8)
              .style("filter", "url(#shadow)");
            nodeGroup.select(".inner-circle")
              .attr("fill", "url(#versionControlGradient)");
          }
          
          // Update circle colors for Front-End (React color)
          if (isFrontEndNode) {
            nodeGroup.select(".outer-circle")
              .attr("stroke", "#7c6e7f")
              .attr("stroke-opacity", 0.8)
              .style("filter", "url(#shadow)");
            nodeGroup.select(".inner-circle")
              .attr("fill", "url(#frontendGradient)");
          }
          
          // Update circle colors for Project Management
          if (isProjectManagementNode) {
            nodeGroup.select(".outer-circle")
              .attr("stroke", "#D7d2cb")
              .attr("stroke-opacity", 0.8)
              .style("filter", "url(#shadow)");
            nodeGroup.select(".inner-circle")
              .attr("fill", "url(#projectManagementGradient)");
          }
          
          // Update circle colors for Architecture
          if (isArchitectureNode) {
            nodeGroup.select(".outer-circle")
              .attr("stroke", "#777696")
              .attr("stroke-opacity", 0.8)
              .style("filter", "url(#shadow)");
            nodeGroup.select(".inner-circle")
              .attr("fill", "url(#architectureGradient)");
          }
          
          // Update circle colors for Testing
          if (isTestingNode) {
            nodeGroup.select(".outer-circle")
              .attr("stroke", "#738678")
              .attr("stroke-opacity", 0.8)
              .style("filter", "url(#shadow)");
            nodeGroup.select(".inner-circle")
              .attr("fill", "url(#testingGradient)");
          }
        } else {
          // Skill nodes - single line text with truncation
          nodeGroup
            .append("text")
            .text(d.data.name.length > 8 ? d.data.name.substring(0, 8) + "..." : d.data.name)
            .attr("font-size", "7px")
            .attr("fill", "white")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("font-weight", "bold")
            .attr("class", "node-text")
            .style("pointer-events", "none");
        }
      });

      // Function to update visibility based on collapsed state
      const updateVisibility = () => {
        // Update node visibility based on collapsed state
        node.style("opacity", function(n) {
          if (n.depth === 0) return 1; // Root always visible
          
          if (collapsedNodesRef.current.has("Skillsets")) {
            // Root is collapsed - hide all parents and children
            return n.depth >= 1 ? 0 : 1;
          }
          
          if (n.depth === 1) {
            // Parent node - check if its parent (root) is collapsed
            return collapsedNodesRef.current.has("Skillsets") ? 0 : 1;
          }
          
          if (n.depth === 2) {
            // Child node - check if its parent is collapsed
            const parent = n.parent;
            return collapsedNodesRef.current.has(parent.data.name) ? 0 : 1;
          }
          
          return 1;
        });
        
        // Update link visibility based on collapsed state
        link.style("opacity", function(l) {
          if (collapsedNodesRef.current.has("Skillsets")) {
            // Root is collapsed - hide all links
            return 0;
          }
          
          if (l.source.depth === 0 && l.target.depth === 1) {
            // Root to parent link - always visible unless root is collapsed
            return collapsedNodesRef.current.has("Skillsets") ? 0 : 0.4;
          }
          
          if (l.source.depth === 1 && l.target.depth === 2) {
            // Parent to child link - check if parent is collapsed
            return collapsedNodesRef.current.has(l.source.data.name) ? 0 : 0.4;
          }
          
          if (l.source.depth === 2 && l.target.depth === 1) {
            // Child to parent link - check if parent is collapsed
            return collapsedNodesRef.current.has(l.target.data.name) ? 0 : 0.4;
          }
          
          return 0.4;
        });
      };

      // Set initial visibility
      // First, make all nodes and links visible by default
      node.style("opacity", 1);
      link.style("opacity", 0.4);
      
      // Then apply any collapsed state
      setTimeout(() => {
        updateVisibility();
      }, 100);

      // Add click functionality for parent nodes
      node.on("click", function(event, d) {
        if (d.children) {
          const isCollapsed = collapsedNodesRef.current.has(d.data.name);
          
          if (isCollapsed) {
            // Expand - show children
            collapsedNodesRef.current.delete(d.data.name);
          } else {
            // Collapse - hide children
            collapsedNodesRef.current.add(d.data.name);
          }
          
          // Update visibility
          updateVisibility();
          
          // Restart simulation to adjust layout
          simulation.alpha(0.3).restart();
        }
      });

      // Add hover effects
      node.on("mouseenter", function(event, d) {
        const nodeGroup = d3.select(this);
        
        // Show tooltip
        const rect = ref.current.getBoundingClientRect();
        setTooltip({
          show: true,
          x: event.clientX - rect.left,
          y: event.clientY - rect.top - 10,
          text: d.data.name
        });
        
        if (d.depth === 0) {
          // Root node hover effect
          nodeGroup.select(".outer-circle")
            .transition()
            .duration(200)
            .attr("r", 55)
            .attr("stroke-width", 4);
          
          nodeGroup.select(".inner-circle")
            .transition()
            .duration(200)
            .attr("r", 45);
          
          nodeGroup.select(".node-text")
            .transition()
            .duration(200)
            .attr("font-size", "16px");
        } else if (d.children) {
          // Parent node hover effect
          nodeGroup.select(".outer-circle")
            .transition()
            .duration(200)
            .attr("r", 30)
            .attr("stroke-width", 3);
          
          nodeGroup.select(".inner-circle")
            .transition()
            .duration(200)
            .attr("r", 22);
          
          nodeGroup.selectAll(".node-text")
            .transition()
            .duration(200)
            .attr("font-size", "9px");
        } else {
          // Skill node hover effect
          nodeGroup.select(".skill-circle")
            .transition()
            .duration(200)
            .attr("r", 20)
            .attr("stroke-width", 2);
          
          nodeGroup.select(".node-text")
            .transition()
            .duration(200)
            .attr("font-size", "8px");
        }
      })
      .on("mouseleave", function(event, d) {
        const nodeGroup = d3.select(this);
        
        // Hide tooltip
        setTooltip({ show: false, x: 0, y: 0, text: "" });
        
        if (d.depth === 0) {
          // Root node reset
          nodeGroup.select(".outer-circle")
            .transition()
            .duration(200)
            .attr("r", 55)
            .attr("stroke-width", 3);
          
          nodeGroup.select(".inner-circle")
            .transition()
            .duration(200)
            .attr("r", 45);
          
          nodeGroup.select(".node-text")
            .transition()
            .duration(200)
            .attr("font-size", "14px");
        } else if (d.children) {
          // Parent node reset
          nodeGroup.select(".outer-circle")
            .transition()
            .duration(200)
            .attr("r", 40)
            .attr("stroke-width", 2);
          
          nodeGroup.select(".inner-circle")
            .transition()
            .duration(200)
            .attr("r", 32);
          
          nodeGroup.selectAll(".node-text")
            .transition()
            .duration(200)
            .attr("font-size", "9px");
        } else {
          // Skill node reset
          nodeGroup.select(".skill-circle")
            .transition()
            .duration(200)
            .attr("r", 20)
            .attr("stroke-width", 1.5);
          
          nodeGroup.select(".node-text")
            .transition()
            .duration(200)
            .attr("font-size", "7px");
        }
      });

      function ticked() {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

        node.attr("transform", d => `translate(${d.x},${d.y})`);
      }

      function drag(simulation) {
        function dragstarted(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(event, d) {
          if (d.depth === 2) {
            // Child nodes can be dragged anywhere
            d.fx = event.x;
            d.fy = event.y;
          } else {
            // Parent and root nodes stay organized but can be moved slightly
            d.fx = event.x;
            d.fy = event.y;
          }
        }

        function dragended(event, d) {
          if (!event.active) simulation.alphaTarget(0);
          if (d.depth === 2) {
            // Child nodes stay where they're dropped
            d.fx = d.x;
            d.fy = d.y;
          } else {
            // Parent and root nodes return to force simulation
            d.fx = null;
            d.fy = null;
          }
        }

        return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
      }

      // Store cleanup function
      return () => {
        if (simulation) simulation.stop();
        svg.remove();
      };
    };

    // Start initialization
    const cleanup = initializeTree();

    // Cleanup function
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={ref}></div>
      
      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="absolute z-50 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium pointer-events-none"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 10,
            transform: 'translateY(-100%)',
            whiteSpace: 'nowrap'
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default SkillTree;
