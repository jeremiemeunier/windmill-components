# YouTube-like Graph Engine – Technical Specification for GitHub Copilot

This document is intended to be used as a **prompt/specification** for GitHub Copilot.
Its purpose is to allow Copilot to generate a complete codebase for a custom graph/chart engine inspired by YouTube Studio's internal architecture.

The goal is to build a **scalable, high-performance, library-agnostic graph system** based on:

* D3 for computation only
* Custom rendering
* Canvas/SVG/WebGL
* React integration
* Industrial-grade architecture

---

## 🎯 Objectives

* No external charting libraries (no Chart.js, Recharts, ECharts, etc.)
* Use **D3 only for math** (scales, domains, layouts, projections)
* Custom rendering engine
* High performance
* Real-time capable
* Modular architecture
* Industrial/enterprise-ready

---

## 🧱 Architecture Overview

```
Data/API Layer
      ↓
State Layer (Zustand or simple store)
      ↓
Compute Layer (D3 only: scales, math, layout)
      ↓
Render Engine
   ├─ SVG Renderer
   ├─ Canvas Renderer
   └─ WebGL Renderer (optional)
      ↓
React Components
```

---

## 📦 Tech Stack

* React + TypeScript
* Vite
* D3 (d3-scale, d3-array, d3-shape ONLY for computation)
* Zustand (or simple store)
* Canvas API
* SVG
* requestAnimationFrame

Optional:

* Web Workers
* OffscreenCanvas
* WebGL (Three.js / regl)

---

## 📁 Project Structure

```
src/
├─ graphs/
│  ├─ core/
│  │  ├─ scale.ts        # D3 scales
│  │  ├─ layout.ts       # layout engines
│  │  ├─ projection.ts   # data → pixel projection
│  │  ├─ engine.ts       # core graph engine
│  │
│  ├─ renderers/
│  │  ├─ svg.renderer.ts
│  │  ├─ canvas.renderer.ts
│  │  └─ webgl.renderer.ts
│  │
│  ├─ models/
│  │  ├─ line.model.ts
│  │  ├─ bar.model.ts
│  │  └─ heatmap.model.ts
│  │
│  ├─ components/
│  │  ├─ LineChart.tsx
│  │  ├─ BarChart.tsx
│  │  └─ Timeline.tsx
│  │
│  └─ store.ts
│
├─ app/
│  └─ Dashboard.tsx
│
└─ main.tsx
```

---

## 🧠 Compute Layer Rules

Copilot must:

* Use D3 **only for computation**, never for DOM manipulation
* Allowed modules:

  * d3-scale
  * d3-array
  * d3-shape
* Forbidden:

  * d3-selection
  * d3-transition

Compute layer responsibilities:

* domain calculation
* normalization
* projection
* layout computation
* geometry

---

## 🎨 Rendering Engine Rules

### Canvas Renderer

Responsibilities:

* draw lines
* draw bars
* draw points
* draw heatmaps
* batching
* clearing
* animation

Must expose methods like:

* clear()
* drawLine()
* drawBars()
* drawHeatmap()

### SVG Renderer

Responsibilities:

* interactive charts
* hover detection
* accessibility
* labels

### WebGL Renderer (optional)

Responsibilities:

* large datasets
* GPU rendering
* instancing
* batching

---

## ⚛️ React Integration Rules

React components must:

* be thin
* not contain rendering logic
* delegate rendering to renderers
* only manage lifecycle and data binding

Example responsibilities:

* mount renderer
* pass data
* handle resize
* connect store

---

## 🗃️ State Management

Store must manage:

* datasets
* time ranges
* filters
* viewport
* zoom
* real-time buffers

---

## ⚡ Performance Requirements

* requestAnimationFrame rendering loop
* dirty-flag rendering
* viewport culling
* data downsampling
* batching
* optional OffscreenCanvas
* optional Web Worker compute

---

## 🔄 Real-Time Support

Must support:

* streaming data
* circular buffers
* rolling windows
* time-based trimming
* partial redraw

---

## 📊 Graph Types

Must implement:

* Line chart
* Bar chart
* Timeline
* Heatmap
* Real-time stream graph

---

## 🧩 Engine Abstraction

Core engine must be abstracted as:

* GraphEngine
* ComputeEngine
* RenderEngine

With interfaces like:

* IRenderer
* ILayout
* IProjection
* IGraphModel

---

## 🧬 Industrial Design Constraints

* modular
* testable
* tree-shakable
* framework-agnostic core
* React bindings as adapter layer

---

## 🏗️ Expected Output from Copilot

Copilot should generate:

* Vite + React + TS project
* core engine
* renderers
* models
* store
* demo dashboard
* example data
* real-time demo simulation

---

## 🧪 Demo Features

* analytics dashboard
* timeline graph
* performance graph
* live updating chart
* heatmap view

---

## ❗ Design Philosophy

"Do not build charts. Build a rendering engine."

Principles:

* separation of concerns
* data first
* render second
* logic before visuals
* engine over components

---

## 🧠 Prompt Instruction for Copilot

Use this document as a **single source of truth**.

When generating code:

* follow the architecture
* respect separation layers
* no monolithic components
* no external charting libs
* scalable design
* industrial-grade structure

---

## 🎯 Target Use Cases

* analytics dashboards
* monitoring systems
* observability tools
* SIEM dashboards
* streaming data UIs
* real-time metrics
* enterprise platforms

---

## 📌 Final Rule

This is not a chart library project.
This is a **graph rendering engine**.

Design accordingly.
