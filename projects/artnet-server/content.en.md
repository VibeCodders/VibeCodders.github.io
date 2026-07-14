---
title: ArtnetServer
slug: artnet-server
order: 1
subtitle: Art-Net to DMX Node Server
description: ArtnetServer is an Art-Net Node server written in C# (.NET 10.0) that receives DMX packets over the network and forwards them to DMX hardware interfaces. It supports GUI, CLI and Headless modes.
keywords: ArtnetServer, Art-Net, DMX, C#, .NET 10, WPF, DMX server, node server, lighting control, VibeCodders
tags: C#, .NET 10, WPF, Art-Net, DMX
language: C#
os: Windows, Linux, macOS
repo: https://github.com/VibeCodders/ArtnetServer
download: https://github.com/VibeCodders/ArtnetServer/releases/latest
---

This project is an **Art-Net Node** server written in C# (.NET 10.0) that receives DMX packets over the network (Art-Net protocol) and forwards them to a DMX hardware interface. The code is designed to maximize logic sharing and can run in three distinct modes: **GUI** (Graphical), **CLI** (interactive console) and **Headless** (silent, in the background).

## Execution Modes

You can select the desired mode by passing the `-m` or `--mode` parameter at startup.

### 1. GUI Mode (Graphical Interface)

Launches the graphical user interface (WPF), rich with animations, showing the values of all 512 DMX channels in real time, packet statistics and visual configuration of the parameters.

```
dotnet run
```

### 2. CLI Mode (Command Line)

Launches an interactive text terminal directly inside the current console. It shows the engine logs in real time and exposes aggregated statistics.

- `S` / `stats` - Show the current detailed statistics
- `C` / `clear` - Clear the console screen
- `H` / `help` - Show the list of available commands
- `Q` / `quit` / `exit` - Safely stop the Art-Net engine

```
dotnet run -- --mode cli --driver simulation
```

### 3. Headless Mode (Silent / Background)

Runs the server in the background in a completely transparent and silent way, without showing any GUI or printing logs to the console. Ideal for integration as a service or automatic startup script.

```
dotnet run -- --mode headless --driver simulation --universe 0
```

## Command Line Parameters

| Short | Long | Description | Default |
|-------|------|-------------|---------|
| `-m` | `--mode` | Mode: gui, cli, headless | gui |
| `-i` | `--ip` | Bind IP address | 0.0.0.0 |
| `-p` | `--port` | UDP listening port | 6454 |
| `-u` | `--universe` | Art-Net universe number | 0 |
| `-d` | `--driver` | DMX driver type | simulation |
| `-c` | `--com` | Serial COM port | — |
| `-dev` | `--device` | DMX interface (universe,driver,com) | — |
| `-h` | `--help` | Show the help | — |

## Project Structure

- **Core/** - Main engine, HTTP server, merge manager, health check, logging
- **Drivers/** - DMX hardware output drivers (Enttec, OpenDMX, FTDI, etc.)
- **Views/** - WPF graphical interface
- **Tests/** - xUnit unit tests

## HTTP API

When enabled with `--enable-http`, the following endpoints are available:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | HTML dashboard |
| GET | `/api/status` | Server and interfaces status |
| GET | `/api/dmx?universe=` | Current DMX data |
| GET | `/api/events` | Real-time events (SSE) |
| GET | `/api/universes` | List of active universes |
| POST | `/api/blackout` | Toggle blackout |
| POST | `/api/override/set` | Set channel override |
| POST | `/api/override/clear-channel` | Clear channel override |
| POST | `/api/override/clear` | Clear all overrides |
