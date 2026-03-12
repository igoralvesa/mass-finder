#!/bin/sh
set -e
bun install
exec bun run dev --host
