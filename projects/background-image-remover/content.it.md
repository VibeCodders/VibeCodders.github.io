---
title: BackgroundImageRemover
slug: background-image-remover
order: 1
subtitle: Rimozione sfondo, Outpainting e fotoritocco avanzato con AI
description: BackgroundImageRemover è un'applicazione desktop moderna in C# (.NET 10 / WPF) per la rimozione dello sfondo, l'editing di precisione (ONNX, SAM, GrabCut, ChromaKey) e l'outpainting intelligente di immagini.
keywords: BackgroundImageRemover, rimozione sfondo, background removal, outpainting, uncrop, ONNX, SAM, GrabCut, ChromaKey, WPF, C#, .NET 10, OpenCvSharp, VibeCodders
tags: C#, .NET 10, WPF, ONNX, SAM, OpenCV, OpenCvSharp
language: C#
os: Windows
repo: https://github.com/VibeCodders/BackgroundImageRemover
---

**BackgroundImageRemover** è un'applicazione desktop professionale per Windows sviluppata in **C# (.NET 10)** con interfaccia grafica **WPF**. Combina modelli di deep learning all'avanguardia (ONNX / Segment Anything) e algoritmi classici di computer vision (GrabCut, ChromaKey, Alpha Matting) con un ricco set di strumenti di post-processing e outpainting/uncrop dell'inquadratura.

## Caratteristiche Principali

- **Strategie Multiple di Segmentazione**:
  - **Modelli ONNX Integrati** — Supporto a modelli neurale per rimozione automatica one-click (con download asincrono e caching locale).
  - **Segment Anything (SAM)** — Segmentazione interattiva tramite prompt visivi e embedding ad altissima precisione.
  - **GrabCut Interattivo** — Segmentazione basata su selezione rettangolare ed estrazione iterativa di primo piano e sfondo.
  - **ChromaKey / Color Keying** — Rimozione rapida di sfondi a colore uniforme o green screen con tolleranza e decontaminazione bordi.
- **Strumenti di Rifinitura e Ritocco**:
  - **Bacchetta Magica (Magic Wand)** — Selezione continua di regioni cromatiche omogenee.
  - **Pennello Maschera (Brush Editor)** — Aggiunta o rimozione manuale di dettaglio dalla maschera di trasparenza.
  - **Decontaminazione Colore & Alpha Matting** — Eliminazione degli aloni di colore residui (color spill) attorno a capelli e bordi complessi.
- **Uncrop & Outpainting Intelligente**:
  - Estensione dei bordi dell'immagine secondo preset di aspect ratio o padding personalizzato.
  - Varie modalità di riempimento: estensione/sfumatura bordi, mirroring e texture synthesis.
- **Compositing & Export Flessibile**:
  - Sostituzione dello sfondo con trasparenza, colori solidi, gradienti o nuove immagini.
  - Modalità di visualizzazione a confronto (Side-by-Side o Split View interattiva).
  - Elaborazione batch di intere cartelle di immagini ed esportazione in PNG/WebP con mantenimento del canale alpha.
- **Architettura a Schede e Progetti**:
  - Supporto a file di progetto (`.bireproj`) per salvare e riprendere lo stato di lavorazione, maschere e livelli.
  - Undo/Redo completo con cronologia delle modifiche.

## Stack Tecnologico

| Componente | Tecnologia |
|------------|------------|
| Linguaggio | C# 14 / .NET 10.0 |
| Framework UI | WPF (Windows Presentation Foundation) |
| Inference Engine | ONNX Runtime & SAM Inference Engine |
| Elaborazione Immagini | OpenCvSharp & SkiaSharp |
| Architettura | MVVM con ViewModel modulari e strategie intercambiabili |

## Requisiti ed Esecuzione

```powershell
# Clona il repository
git clone https://github.com/VibeCodders/BackgroundImageRemover.git
cd BackgroundImageRemover

# Avvia l'applicazione
.\run.ps1
```
