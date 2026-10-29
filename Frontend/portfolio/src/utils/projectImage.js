export default function getProjectImageUrl(target) {
  // Accepts either a project object { imglink: "..." } or a raw string URL
  const imageLink = typeof target === "object" && target !== null ? target.imglink : target;

  if (typeof imageLink !== "string" || !imageLink.startsWith("/project-image/")) {
    return typeof imageLink === "string" ? imageLink : "";
  }

  const backendUrl = import.meta.env.VITE_BACKENDLINK;
  return backendUrl
    ? `${backendUrl.replace(/\/$/, "")}${imageLink}`
    : imageLink;
}
