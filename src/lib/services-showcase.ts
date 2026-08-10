export function getActiveServiceIndex(progress: number, count: number) {
  if (count <= 0) return -1;

  const clampedProgress = Math.min(1, Math.max(0, progress));
  if (clampedProgress < 0.05) return -1;

  return Math.min(count - 1, Math.floor(clampedProgress * count));
}

export type ServiceCardState =
  | "intro"
  | "active"
  | "previous"
  | "next"
  | "hidden"
  | "exited";

export function getServiceCardState(
  cardIndex: number,
  activeIndex: number,
): ServiceCardState {
  if (activeIndex < 0) return cardIndex === 0 ? "intro" : "hidden";
  if (cardIndex === activeIndex) return "active";
  if (cardIndex === activeIndex - 1) return "previous";
  if (cardIndex === activeIndex + 1) return "next";
  return cardIndex < activeIndex ? "exited" : "hidden";
}
