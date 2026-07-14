---
title: PostgREST
slug: postgrest
order: 2
subtitle: Gateway HTTP-to-PostgreSQL self-contained
description: PostgREST (Self-Contained Edition) è un gateway HTTP-to-PostgreSQL scritto in Rust; ogni richiesta JSON trasporta query SQL, credenziali e certificati TLS, senza file di configurazione.
keywords: PostgREST, Rust, PostgreSQL, HTTP gateway, mTLS, connection pooling, REST, VibeCodders
tags: Rust, PostgreSQL, HTTP, mTLS, REST
language: Rust
os: Windows, Linux
repo: https://github.com/stignarnia/PostgREST
download: https://github.com/stignarnia/PostgREST/releases/latest
---

Questa è una **Self-Contained Edition** di PostgREST: un leggero gateway HTTP-to-PostgreSQL scritto in **Rust** (edition 2024) che accetta query al database tramite richieste JSON. A differenza del PostgREST tradizionale, ogni segreto — credenziali, query SQL e certificati TLS — viene passato **dentro** la richiesta JSON, senza bisogno di file di configurazione su disco.

## Caratteristiche Principali

- **Richieste self-contained** — dettagli di connessione, credenziali e certificati viaggiano nella richiesta, senza file di config
- **Mutual TLS completo** — certificato client, chiave e root CA passati come stringhe PEM
- **Riuso delle connessioni in memoria** — fino a 100 connessioni concorrenti in cache per set di credenziali (eviction LRU tramite Moka)
- **Isolamento multi-tenant** — connessioni live indipendenti per ogni chiamante
- **Query parametrizzate** — supporto per placeholder `$1, $2`
- **Output JSON** — i risultati delle query vengono restituiti come array JSON con conversione type-aware (boolean, numeri, oggetti, null)
- **Gestione come servizio** — integrazione nativa con systemd e Windows Service tramite flag CLI

## Sicurezza

Il servizio mette la sicurezza al primo posto mantenendo tutti i dati sensibili **in memoria**, senza mai scriverli su disco. Il pooling delle connessioni con eviction LRU garantisce prestazioni elevate senza compromettere l'isolamento tra tenant differenti.

## Stack Tecnologico

| Componente | Tecnologia |
|------------|------------|
| Linguaggio | Rust (edition 2024, toolchain 1.85+) |
| TLS / mTLS | OpenSSL |
| Connection cache | Moka (LRU in-memory) |
| Database | PostgreSQL |
