const GOOGLE_DRIVE_EMBED = "https://drive.google.com/file/d";

export function getTrainingIntroVideoEmbedUrl(googleDriveFileId, autoplay = false) {
  if (!googleDriveFileId) return null;
  const base = `${GOOGLE_DRIVE_EMBED}/${googleDriveFileId}/preview`;
  return autoplay ? `${base}?autoplay=1` : base;
}
