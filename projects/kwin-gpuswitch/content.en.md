---
title: kwin-gpuswitch
slug: kwin-gpuswitch
order: 8
subtitle: Dynamic Wayland GPU switching plugin for KDE Plasma
description: kwin-gpuswitch is a KWin plugin that switches Plasma compositing between GPUs during a live Wayland session without logging out or closing running applications.
keywords: kwin-gpuswitch, KWin, KDE Plasma, Wayland, GPU switching, hybrid graphics, Linux, C++, ASUS ROG, NVIDIA, AMD, Intel, VibeCodders
tags: C++, KWin, KDE Plasma, Wayland, Linux
language: C++
os: Linux
repo: https://github.com/stignarnia/kwin-gpuswitch
---

**kwin-gpuswitch** is a plugin for **KDE Plasma 6.8+ (Wayland)** that moves the desktop compositing pipeline from one GPU to another on the fly during an active user session. Applications — including browsers, Electron, GTK, Flutter, games, and X11 apps via Xwayland — continue running seamlessly without needing to log out or restart the session.

GPU switching can be triggered on demand via the CLI or automatically based on active display outputs and screen configurations.

## The Problem It Solves

On laptops with dual GPUs (integrated iGPU and discrete dGPU), KWin composites on a single GPU chosen at login — typically the battery-friendly iGPU. However, when an external monitor or TV is plugged into an HDMI/DisplayPort output wired directly to the discrete GPU (common on gaming laptops), every rendered frame suffers a performance-degrading round trip:

```
game renders on dGPU → copied to iGPU for compositing → copied back to dGPU → HDMI
```

Standard environment overrides like `KWIN_DRM_DEVICES` require logging out, while in-place KWin restarts crash non-Qt apps. **kwin-gpuswitch** leverages Plasma 6.8's internal live compositing migration mechanism to switch the rendering GPU cleanly inside the running process.

## Key Features

- **Seamless Live Switching** — Move compositing between integrated and discrete GPUs in fractions of a second without closing open applications or resetting window arrangements.
- **Automatic Display-Aware Switching** — Dynamically switches to the discrete GPU when all active displays are wired to it, and falls back to the integrated GPU when driving laptop panels or multi-GPU configurations.
- **Command-Line Interface (`kwin-gpu`)** — Simple commands to query status (`kwin-gpu status`), switch by vendor or bus ID (`kwin-gpu nvidia`, `kwin-gpu amd`, `kwin-gpu integrated`), and toggle auto-mode.
- **Plasma Shell Handshake** — Automatically restarts Plasma shell components (panels, wallpaper) when needed with built-in rate limiting to prevent cross-GPU copying overhead.
- **Arch Linux Pacman Hook** — Includes an automated hook that rebuilds the plugin after every system KWin update to ensure binary compatibility.
- **Hardware Agnostic** — Works with combinations of AMD, Intel, and NVIDIA graphics, adapting to MUX switch states and dynamic display connections.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Language | C++ (C++23) |
| Compositor Framework | KDE KWin 6.8+ (Wayland) |
| Inter-Process Communication | D-Bus (`kwin-gpu` CLI) |
| Build System | CMake, Extra CMake Modules (ECM) |
| Graphics APIs | Vulkan Headers, Linux DRM/KMS subsystem |
| Package & Integration | Pacman hook, Shell scripts, systemd |

## Requirements

- KDE Plasma 6.8 or newer on Wayland
- System with dual/multiple GPUs (e.g. AMD+NVIDIA, Intel+NVIDIA, AMD+Intel)
- Linux kernel with DRM subsystem access
