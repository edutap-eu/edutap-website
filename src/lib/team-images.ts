/** Team portraits, keyed by the path form used in team.json. */
const images = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/team/*.{jpg,jpeg,png}",
  { eager: true },
);

/**
 * Resolves a team.json image path to an imported asset.
 * Throws at build time when the referenced file is missing.
 */
export function resolveTeamImage(path: string): ImageMetadata {
  const filename = path.split("/").pop();
  const match = Object.entries(images).find(([key]) =>
    key.endsWith(`/${filename}`),
  );
  if (!match) {
    throw new Error(
      `team.json references "${path}", but no such image exists in src/assets/team/`,
    );
  }
  return match[1].default;
}
