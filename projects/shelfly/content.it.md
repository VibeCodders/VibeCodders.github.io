---
title: Shelfly
slug: shelfly
order: 7
subtitle: Tracker di serie TV e film per Android con sync WebDAV
description: Shelfly è un'app Android per monitorare film e serie TV che sostituisce la sincronizzazione cloud proprietaria con backup WebDAV automatici verso la propria infrastruttura personale.
keywords: Shelfly, Android, serie TV, film, tracker, WebDAV, TMDB, Obtainium, Nextcloud, open source, privacy, VibeCodders
tags: Kotlin, Android, WebDAV, TMDB
language: Kotlin
os: Android
repo: https://github.com/stignarnia/shelfly
download: https://github.com/stignarnia/shelfly/releases/latest
---

**Shelfly** è un'applicazione open source per Android dedicata al tracciamento di film e serie TV, pensata per offrire il pieno controllo sui propri dati di visione e sulle statistiche personali. Nata come fork specializzato di Showly, Shelfly rimuove qualsiasi dipendenza da servizi cloud di terze parti a pagamento, sostituendo la sincronizzazione proprietaria con backup e ripristini automatici su **WebDAV** verso la propria infrastruttura (Nextcloud, NAS o qualsiasi server WebDAV compatibile).

Il catalogo multimediale attinge direttamente da **The Movie Database (TMDB)** tramite una chiave API gratuita configurabile al primo avvio, garantendo privacy totale, assenza di intermediari e nessuna chiave inserita a priori nell'APK.

## Caratteristiche Principali

- **Sincronizzazione WebDAV Self-Hosted** — Backup pianificati e ripristino istantaneo su server personali (Nextcloud, NAS, server WebDAV) senza passare da account terzi o intermediari.
- **Architettura Local-First e Privacy** — La cronologia di visione e lo stato della libreria risiedono esclusivamente sul dispositivo e sullo spazio di archiviazione scelto dall'utente.
- **Catalogo TMDB Diretto** — Schede dettagliate per film, stagioni ed episodi fornite dalle API TMDB con chiavi personali fornite al runtime.
- **Filtri Piattaforme di Streaming** — Filtri integrati basati sui provider TMDB per la propria regione, che mostrano in tempo reale dove visualizzare i contenuti in streaming.
- **Temi e Material You** — Supporto ai colori dinamici Material You (Android 14+), modalità scura, chiara e opzione AMOLED a contrasto elevato (nero assoluto).
- **Widget a Tema Personalizzabili** — Widget per la schermata home che si adattano al tema del sistema, con trasparenza e opzioni configurabili singolarmente (Android 12+).
- **Interfaccia Adattiva** — Supporto completo per tablet, dispositivi pieghevoli e rotazione orizzontale senza blocchi fissi in verticale.
- **Aggiornamenti Semplificati** — Integrazione diretta con [Obtainium](https://github.com/ImranR98/Obtainium) per il rilevamento e l'installazione automatica dei nuovi rilasci da GitHub.

## Stack Tecnologico

| Componente | Tecnologia |
|------------|------------|
| Linguaggio | Kotlin |
| Piattaforma | Android (minSdk 24 / Android 7.0+) |
| Architettura | Architettura multi-modulo pulita (MVVM, Coroutines, Flow) |
| Database locale | Room Database, EncryptedSharedPreferences |
| Rete e Sync | Retrofit, OkHttp, protocollo WebDAV |
| Catalogo remoto | API TMDB (The Movie Database) |
| UI e Temi | Material Design Components, Dynamic Theming, Android Jetpack |

## Perché WebDAV?

Molte app di tracciamento legano i dati a piattaforme esterne che limitano l'accesso e la portabilità dei propri dati storici. Shelfly restituisce la proprietà dei dati all'utente: l'intero archivio viene esportato e sincronizzato sul proprio server casalingo in maniera trasparente e sicura.
