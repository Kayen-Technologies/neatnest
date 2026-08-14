export function getActiveSpaceIndex(progress: number, count: number) {
  if (count <= 0) return -1;

  const clampedProgress = Math.min(1, Math.max(0, progress));
  if (clampedProgress < 0.05) return -1;

  return Math.min(count - 1, Math.floor(clampedProgress * count));
}
