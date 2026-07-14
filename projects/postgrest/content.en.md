---
title: PostgREST
slug: postgrest
order: 2
subtitle: Self-contained HTTP-to-PostgreSQL gateway
description: PostgREST (Self-Contained Edition) is an HTTP-to-PostgreSQL gateway written in Rust; every JSON request carries the SQL query, credentials and TLS certificates, with no configuration files.
keywords: PostgREST, Rust, PostgreSQL, HTTP gateway, mTLS, connection pooling, REST, VibeCodders
tags: Rust, PostgreSQL, HTTP, mTLS, REST
language: Rust
os: Windows, Linux
repo: https://github.com/stignarnia/PostgREST
download: https://github.com/stignarnia/PostgREST/releases/latest
---

This is a **Self-Contained Edition** of PostgREST: a lightweight HTTP-to-PostgreSQL gateway written in **Rust** (edition 2024) that accepts database queries via JSON requests. Unlike traditional PostgREST, every secret — credentials, SQL queries and TLS certificates — is passed **inside** the JSON request, with no need for configuration files on disk.

## Key Features

- **Self-contained requests** — connection details, credentials and certificates travel in the request, with no config files
- **Full mutual TLS** — client certificate, key and root CA passed as PEM strings
- **In-memory connection reuse** — up to 100 concurrent connections cached per credential set (LRU eviction via Moka)
- **Multi-tenant isolation** — independent live connections per caller
- **Parameterized queries** — support for `$1, $2` placeholders
- **JSON output** — query results are returned as JSON arrays with type-aware conversion (booleans, numbers, objects, null)
- **Service management** — native systemd and Windows Service integration via CLI flags

## Security

The service puts security first by keeping all sensitive data **in memory**, never writing it to disk. Connection pooling with LRU eviction guarantees high performance without compromising isolation between different tenants.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Language | Rust (edition 2024, toolchain 1.85+) |
| TLS / mTLS | OpenSSL |
| Connection cache | Moka (in-memory LRU) |
| Database | PostgreSQL |
