# About page background video

Optimized from `src/assets/13496634_3840_2160_25fps.mp4` (16 MB, 4K).

| File | Size | Notes |
|------|------|-------|
| `hero.webm` | ~496 KB | VP9, preferred in supported browsers |
| `hero.mp4` | ~589 KB | H.264 fallback |
| `poster.webp` | ~27 KB | Shown until video loads |

Settings: 1280×720, 24 fps, no audio, CRF 28 (MP4) / 32 (WebM).

To re-encode after replacing the source:

```bash
ffmpeg -y -i src/assets/13496634_3840_2160_25fps.mp4 \
  -ss 00:00:00.5 -vframes 1 -vf "scale=1280:-2" \
  public/videos/about/poster.webp

ffmpeg -y -i src/assets/13496634_3840_2160_25fps.mp4 \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,format=yuv420p" \
  -r 24 -c:v libx264 -crf 28 -preset slow -movflags +faststart -an \
  public/videos/about/hero.mp4

ffmpeg -y -i src/assets/13496634_3840_2160_25fps.mp4 \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" \
  -r 24 -c:v libvpx-vp9 -crf 32 -b:v 0 -an \
  public/videos/about/hero.webm
```
