#!/usr/bin/env bash
# Makes a video web-ready: 1080p max, H.264, fast-start (plays before it finishes downloading).
# Needs ffmpeg:  https://ffmpeg.org/download.html
# Usage:  bash scripts/compress-video.sh my-film.mov            -> my-film-web.mp4
#         bash scripts/compress-video.sh my-film.mov final.mp4
set -euo pipefail
in="${1:?Give the video file to compress}"
out="${2:-${in%.*}-web.mp4}"
ffmpeg -y -i "$in" \
  -vf "scale='min(1920,iw)':-2" \
  -c:v libx264 -preset slow -crf 23 -profile:v high -pix_fmt yuv420p \
  -movflags +faststart \
  -c:a aac -b:a 128k \
  "$out"
echo "Created $out"; ls -lh "$out"
