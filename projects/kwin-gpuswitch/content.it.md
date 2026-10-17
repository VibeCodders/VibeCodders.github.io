---
title: kwin-gpuswitch
slug: kwin-gpuswitch
order: 8
subtitle: Plugin KWin per il cambio dinamico della GPU su Wayland
description: kwin-gpuswitch è un plugin per KWin che sposta il compositing di Plasma tra diverse GPU durante una sessione Wayland attiva, senza disconnettersi né chiudere le applicazioni.
keywords: kwin-gpuswitch, KWin, KDE Plasma, Wayland, GPU switching, hybrid graphics, Linux, C++, ASUS ROG, NVIDIA, AMD, Intel, VibeCodders
tags: C++, KWin, KDE Plasma, Wayland, Linux
language: C++
os: Linux
repo: https://github.com/stignarnia/kwin-gpuswitch
---

**kwin-gpuswitch** è un plugin per **KDE Plasma 6.8+ (Wayland)** che consente di trasferire al volo la pipeline di compositing del desktop da una scheda video all'altra all'interno di una sessione utente attiva. Tutte le applicazioni in esecuzione — inclusi browser web, Electron, app GTK, Flutter, videogiochi e software X11 via Xwayland — rimangono aperte senza alcuna interruzione.

Il passaggio tra GPU può essere comandato manualmente da riga di comando oppure gestito in modo del tutto automatico in base alle uscite video e agli schermi collegati.

## Il Problema che Risolve

Sui notebook dotati di doppia GPU (grafica integrata iGPU e dedicata dGPU), KWin seleziona all'avvio della sessione una sola GPU su cui eseguire il compositing (tipicamente l'integrata per risparmiare energia). Tuttavia, quando si collega un monitor esterno a una porta HDMI collegata direttamente alla dGPU (comune nei portatili da gioco), ogni fotogramma subisce una complessa trafila di copie in memoria:

```
rendering del gioco su dGPU → copia su iGPU per il compositing → copia su dGPU → uscita HDMI
```

Le variabili come `KWIN_DRM_DEVICES` richiedono la disconnessione completa, mentre il riavvio forzato del compositor chiude le finestre non-Qt. **kwin-gpuswitch** sfrutta le capacità interne di migrazione di Plasma 6.8 per cambiare la GPU di compositing direttamente all'interno del processo attivo.

## Caratteristiche Principali

- **Cambio GPU Senza Disconnessione** — Sposta il carico di rendering del compositor tra GPU integrata e dedicata in una frazione di secondo senza chiudere i programmi aperti o alterare le finestre.
- **Commutazione Automatica Intelligente** — Rileva la topologia degli schermi collegati: passa alla GPU dedicata quando i display attivi sono pilotati da essa e torna alla grafica integrata in mobilità o su configurazioni ibride.
- **Utility CLI Dedicata (`kwin-gpu`)** — Comandi intuitivi via terminale per verificare lo stato (`kwin-gpu status`), selezionare la scheda (`kwin-gpu nvidia`, `kwin-gpu amd`, `kwin-gpu integrated`) o abilitare l'automatismo.
- **Riavvio Ottimizzato della Shell Plasma** — Riavvia in modo controllato i pannelli e lo sfondo per evitare copie inutili di pixel tra GPU diverse, con rate-limiting integrato per la massima stabilità.
- **Hook Automatico per Pacman (Arch Linux)** — Include un hook di sistema che ricompila automaticamente il plugin a ogni aggiornamento di pacchetto di KWin.
- **Compatibilità Multi-Vendor** — Supporta configurazioni AMD, Intel e NVIDIA, interagendo correttamente anche con hardware dotato di switch MUX hardware.

## Stack Tecnologico

| Componente | Tecnologia |
|------------|------------|
| Linguaggio | C++ (C++23) |
| Framework Compositor | KDE KWin 6.8+ (Wayland) |
| Comunicazione IPC | D-Bus (strumento `kwin-gpu`) |
| Build System | CMake, Extra CMake Modules (ECM) |
| API Grafiche | Vulkan Headers, sottosistema DRM/KMS di Linux |
| Integrazione di Sistema | Hook Pacman, script Shell, systemd |

## Requisiti

- KDE Plasma 6.8 o successivo in sessione Wayland
- Sistema con due o più GPU (es. AMD+NVIDIA, Intel+NVIDIA, AMD+Intel)
- Kernel Linux con supporto DRM/KMS
