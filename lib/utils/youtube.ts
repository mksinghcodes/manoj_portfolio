export function extractYouTubeId(urlOrId: string): string | null {
  if (!urlOrId) return null;
  const trimmed = urlOrId.trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = trimmed.match(regExp);

  return match && match[1].length === 11 ? match[1] : null;
}

export function getYouTubeEmbedUrl(urlOrId: string): string | null {
  const id = extractYouTubeId(urlOrId);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}

export function getYouTubeThumbnailUrl(urlOrId: string): string | null {
  const id = extractYouTubeId(urlOrId);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}
