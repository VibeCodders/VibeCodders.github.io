---
title: kinect2pipe-IR
slug: kinect2pipe-ir
order: 3
subtitle: Kinect 2 as an infrared webcam for Howdy
description: kinect2pipe-IR turns a Kinect 2 sensor into an infrared webcam on Linux, routing the IR stream to a virtual video device for facial unlock with Howdy.
keywords: kinect2pipe-IR, Kinect 2, IR, infrared, Howdy, Linux, v4l2loopback, libfreenect2, C++, VibeCodders
tags: C++, CMake, Linux, Kinect, Howdy, v4l2loopback
language: C++
os: Linux
repo: https://github.com/stignarnia/kinect2pipe-IR
---

**kinect2pipe-IR** lets a **Kinect 2** sensor work as an infrared webcam on Linux systems, specifically designed for facial-recognition unlock with **Howdy**. The application captures the IR stream from the sensor and routes it through a virtual video device. It is a specialized fork of the original kinect2pipe, focused on IR stream handling rather than RGB video capture.

## Key Features

- **IR → YUV420P conversion** — infrared frames are converted to the YUV420P format for the widest compatibility with Linux applications
- **CPU efficiency** — streaming is activated only when an application requests it
- **Hardware acceleration** — optional support
- **Backup device** — fallback when the Kinect 2 is unavailable
- **PAM integration** — Linux desktop unlock via Howdy
- **Cross-distribution** — multi-distro support with detailed guidance for Arch Linux

## Tech Stack

| Component | Technology |
|-----------|------------|
| Language | C++ |
| Build system | CMake |
| Kinect 2 sensor | libfreenect2 |
| Colorspace conversion | libswscale |
| Virtual device | v4l2loopback |
| Stream management | inotify |

## How It Works

The program opens the Kinect 2 infrared stream via `libfreenect2`, converts the frames to the `YUV420P` format with `libswscale` and writes them to a `v4l2loopback` device. Thanks to `inotify`, streaming is only started when an application opens the virtual device, minimizing CPU usage when the webcam is not in use.
