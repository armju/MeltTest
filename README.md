# MeltTest

A simple JavaScript project that demonstrates document redaction and restoration.

## Overview

This project implements a basic text redaction system with three core ideas:

- Parse a list of sensitive words or quoted phrases
- Replace matched content in a document with `XXXX`
- Store enough metadata to reconstruct the original document later

This solution is written in plain JavaScript and can be executed with Node.js.

## Features

- Supports single-word terms
- Supports multi-word quoted phrases such as `"credit card"`
- Uses longest-match-first behavior by sorting terms by length
- Returns both:
  - the redacted document
  - a key with the removed content for later restoration
- Includes unredaction logic to rebuild the original text

## Project Structure

```bash
.
├── index.js
├── package.json
├── package-lock.json
