export function getInitials(name: string | undefined) {
  if (!name) {
    return "N/A";
  }

  return name
    .trim()
    .split(/\s+/u)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2); // limit to 2 characters
}
