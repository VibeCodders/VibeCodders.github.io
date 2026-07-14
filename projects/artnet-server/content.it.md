---
title: ArtnetServer
slug: artnet-server
order: 1
subtitle: Art-Net to DMX Node Server
description: ArtnetServer è un server Art-Net Node scritto in C# (.NET 10.0) che riceve pacchetti DMX via rete e li inoltra a interfacce hardware DMX. Supporta GUI, CLI e Headless.
keywords: ArtnetServer, Art-Net, DMX, C#, .NET 10, WPF, server DMX, node server, lighting control, VibeCodders
tags: C#, .NET 10, WPF, Art-Net, DMX
language: C#
os: Windows, Linux, macOS
repo: https://github.com/VibeCodders/ArtnetServer
download: https://github.com/VibeCodders/ArtnetServer/releases/latest
---

Questo progetto è un server **Art-Net Node** scritto in C# (.NET 10.0) che riceve pacchetti DMX via rete (protocollo Art-Net) e li inoltra a un'interfaccia hardware DMX. Il codice è progettato per massimizzare la condivisione logica ed è eseguibile in tre modalità distinte: **GUI** (Grafica), **CLI** (Console interattiva) e **Headless** (Silenziosa in background).

## Modalità di Esecuzione

Puoi selezionare la modalità desiderata passando il parametro `-m` o `--mode` all'avvio.

### 1. Modalità GUI (Interfaccia Grafica)

Avvia l'interfaccia utente grafica (WPF) ricca di animazioni, che mostra in tempo reale i valori dei 512 canali DMX, le statistiche dei pacchetti e permette la configurazione visuale dei parametri.

```
dotnet run
```

### 2. Modalità CLI (Riga di Comando)

Avvia un terminale testuale interattivo direttamente all'interno della console corrente. Mostra i log dell'engine in tempo reale ed espone statistiche aggregate.

- `S` / `stats` - Mostra le statistiche dettagliate correnti
- `C` / `clear` - Pulisce la schermata della console
- `H` / `help` - Mostra l'elenco dei comandi disponibili
- `Q` / `quit` / `exit` - Ferma in sicurezza l'engine Art-Net

```
dotnet run -- --mode cli --driver simulation
```

### 3. Modalità Headless (Silenziosa / Background)

Esegue il server in background in modo totalmente trasparente e silenzioso, senza mostrare alcuna GUI o stampare log in console. Ideale per essere integrato come servizio o script di avvio automatico.

```
dotnet run -- --mode headless --driver simulation --universe 0
```

## Parametri della Linea di Comando

| Breve | Esteso | Descrizione | Default |
|-------|--------|-------------|---------|
| `-m` | `--mode` | Modalità: gui, cli, headless | gui |
| `-i` | `--ip` | Indirizzo IP di bind | 0.0.0.0 |
| `-p` | `--port` | Porta UDP di ascolto | 6454 |
| `-u` | `--universe` | Numero universo Art-Net | 0 |
| `-d` | `--driver` | Tipo driver DMX | simulation |
| `-c` | `--com` | Porta seriale COM | — |
| `-dev` | `--device` | Interfaccia DMX (universo,driver,com) | — |
| `-h` | `--help` | Mostra la guida | — |

## Struttura del Progetto

- **Core/** - Motore principale, server HTTP, merge manager, health check, logging
- **Drivers/** - Driver di uscita DMX hardware (Enttec, OpenDMX, FTDI, ecc.)
- **Views/** - Interfaccia grafica WPF
- **Tests/** - Test unitari xUnit

## API HTTP

Quando abilitata con `--enable-http`, sono disponibili i seguenti endpoint:

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/` | Dashboard HTML |
| GET | `/api/status` | Stato del server e delle interfacce |
| GET | `/api/dmx?universe=` | Dati DMX correnti |
| GET | `/api/events` | Eventi in tempo reale (SSE) |
| GET | `/api/universes` | Lista universi attivi |
| POST | `/api/blackout` | Attiva/disattiva blackout |
| POST | `/api/override/set` | Imposta override canale |
| POST | `/api/override/clear-channel` | Cancella override canale |
| POST | `/api/override/clear` | Cancella tutti gli override |
