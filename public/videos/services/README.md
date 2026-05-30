# Services background video

Optimized from `src/assets/7702061-uhd_4096_2160_25fps.mp4` (14 MB, 2732×1440, 25 fps).

| File          | Size    | Notes                                |
| ------------- | ------- | ------------------------------------ |
| `hero.webm`   | ~2.2 MB | VP9, preferred in supported browsers |
| `hero.mp4`    | ~1.4 MB | H.264 fallback                       |
| `poster.webp` | ~58 KB  | Shown until video loads              |

Settings: 1280×720, 24 fps, no audio, full color, crop-to-fill (no letterboxing), CRF 28 (MP4) / 32 (WebM).

To re-encode after replacing the source:

```bash
ffmpeg -y -i src/assets/7702061-uhd_4096_2160_25fps.mp4 \
  -ss 00:00:00.5 -vframes 1 -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720" \
  public/videos/services/poster.webp

ffmpeg -y -i src/assets/7702061-uhd_4096_2160_25fps.mp4 \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,format=yuv420p" \
  -r 24 -c:v libx264 -crf 28 -preset slow -movflags +faststart -an \
  public/videos/services/hero.mp4

ffmpeg -y -i src/assets/7702061-uhd_4096_2160_25fps.mp4 \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720" \
  -r 24 -c:v libvpx-vp9 -crf 32 -b:v 0 -an \
  public/videos/services/hero.webm
```
