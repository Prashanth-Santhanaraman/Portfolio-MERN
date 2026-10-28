export default function getProjectImageUrl(imageLink) {
  if (!imageLink?.startsWith("/project-image/")) {
    return imageLink || "";
  }

  const backendUrl = import.meta.env.VITE_BACKENDLINK;
  return backendUrl
    ? `${backendUrl.replace(/\/$/, "")}${imageLink}`
    : imageLink;
}
