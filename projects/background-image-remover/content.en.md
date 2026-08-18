---
title: BackgroundImageRemover
slug: background-image-remover
order: 1
subtitle: Background removal, Outpainting and advanced photo editing with AI
description: BackgroundImageRemover is a modern Windows desktop app in C# (.NET 10 / WPF) for AI-powered background removal, precision edge refinement (ONNX, SAM, GrabCut, ChromaKey) and smart image uncropping.
keywords: BackgroundImageRemover, background removal, outpainting, uncrop, ONNX, SAM, GrabCut, ChromaKey, WPF, C#, .NET 10, OpenCvSharp, VibeCodders
tags: C#, .NET 10, WPF, ONNX, SAM, OpenCV, OpenCvSharp
language: C#
os: Windows
repo: https://github.com/VibeCodders/BackgroundImageRemover
---

**BackgroundImageRemover** is a powerful desktop application for Windows built with **C# (.NET 10)** and **WPF**. It combines state-of-the-art deep learning vision models (ONNX / Segment Anything) with classic computer vision algorithms (GrabCut, ChromaKey, Alpha Matting), complemented by post-processing refinement tools and smart uncrop/outpainting features.

## Key Features

- **Multiple Segmentation Strategies**:
  - **Integrated ONNX Models** — One-click automatic background removal using deep learning models (with background downloading and local caching).
  - **Segment Anything (SAM)** — High-precision interactive segmentation powered by visual embeddings and prompts.
  - **Interactive GrabCut** — Bounding box selection with iterative foreground/background refinement.
  - **ChromaKey / Color Keying** — Rapid removal of solid backgrounds or green screens with adjustable tolerance and edge decontamination.
- **Refinement & Retouching Tools**:
  - **Magic Wand** — Contiguous color selection for selective area masking.
  - **Brush Editor** — Manual paint/erase mask editor for fine details like strands of hair.
  - **Color Decontamination & Alpha Matting** — Automatic color spill cleanup around complex subject boundaries.
- **Smart Uncrop & Outpainting**:
  - Extend image bounds according to aspect ratio presets or custom canvas padding.
  - Multiple fill strategies: edge bleeding, mirror reflections, and texture synthesis.
- **Flexible Compositing & Export**:
  - Replace background with transparency, solid colors, gradients, or custom background images.
  - Before/After comparison view with Side-by-Side and interactive Split-Slider modes.
  - Batch processing across entire folders with direct export to PNG and WebP formats.
- **Project Files & Tabbed Workflow**:
  - Save full workspace state, masks, and layers to project files (`.bireproj`).
  - Full Undo/Redo stack with comprehensive edit history.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Language | C# 14 / .NET 10.0 |
| UI Framework | WPF (Windows Presentation Foundation) |
| Inference Engine | ONNX Runtime & SAM Inference Engine |
| Image Processing | OpenCvSharp & SkiaSharp |
| Architecture | MVVM with modular ViewModels and interchangeable strategy pipelines |

## Getting Started

```powershell
# Clone the repository
git clone https://github.com/VibeCodders/BackgroundImageRemover.git
cd BackgroundImageRemover

# Run the app
.\run.ps1
```
