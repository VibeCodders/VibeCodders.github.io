---
title: kinect2pipe-IR
slug: kinect2pipe-ir
order: 3
subtitle: Kinect 2 come webcam a infrarossi per Howdy
description: kinect2pipe-IR trasforma un sensore Kinect 2 in una webcam a infrarossi su Linux, instradando lo stream IR verso un dispositivo video virtuale per lo sblocco facciale con Howdy.
keywords: kinect2pipe-IR, Kinect 2, IR, infrared, Howdy, Linux, v4l2loopback, libfreenect2, C++, VibeCodders
tags: C++, CMake, Linux, Kinect, Howdy, v4l2loopback
language: C++
os: Linux
repo: https://github.com/stignarnia/kinect2pipe-IR
downloadLabel: ⬇️ Vedi le istruzioni di build
download: https://github.com/stignarnia/kinect2pipe-IR#readme
---

**kinect2pipe-IR** permette a un sensore **Kinect 2** di funzionare come webcam a infrarossi su sistemi Linux, pensato in particolare per lo sblocco tramite riconoscimento facciale con **Howdy**. L'applicazione cattura lo stream IR dal sensore e lo instrada attraverso un dispositivo video virtuale. È un fork specializzato dell'originale kinect2pipe, focalizzato sulla gestione dello stream a infrarossi anziché sulla cattura video RGB.

## Caratteristiche Principali

- **Conversione IR → YUV420P** — i frame a infrarossi vengono convertiti nel formato YUV420P per la massima compatibilità con le applicazioni Linux
- **Efficienza CPU** — lo streaming si attiva solo quando un'applicazione lo richiede
- **Accelerazione hardware** — supporto opzionale
- **Dispositivo di backup** — fallback quando il Kinect 2 non è disponibile
- **Integrazione PAM** — sblocco del desktop Linux tramite Howdy
- **Cross-distribuzione** — supporto multi-distro con guida dettagliata per Arch Linux

## Stack Tecnologico

| Componente | Tecnologia |
|------------|------------|
| Linguaggio | C++ |
| Build system | CMake |
| Sensore Kinect 2 | libfreenect2 |
| Conversione colorspace | libswscale |
| Dispositivo virtuale | v4l2loopback |
| Gestione stream | inotify |

## Come Funziona

Il programma apre lo stream a infrarossi del Kinect 2 tramite `libfreenect2`, converte i frame nel formato `YUV420P` con `libswscale` e li scrive su un dispositivo `v4l2loopback`. Grazie a `inotify`, lo streaming viene avviato solo quando un'applicazione apre il dispositivo virtuale, riducendo al minimo il consumo di CPU quando la webcam non è in uso.
