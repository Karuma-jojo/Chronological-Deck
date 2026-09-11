export const DEFAULT_STAGE_NAMES = ["Scientific temperament", "Universal foundations", "Field gateway", "Advanced field depth", "Graduate forge"];
export function routeLayout(terminal) {
  const stageNames = terminal.stageNames?.length ? terminal.stageNames : DEFAULT_STAGE_NAMES;
  return { stageNames, columns: stageNames.map((_, i) => 20 + 220 * i), width: Math.max(1100, stageNames.length * 220) };
}
export function validTerminalStage(stage, terminal) {
  return Number.isInteger(stage) && stage >= 0 && stage < routeLayout(terminal).stageNames.length;
}
