import type { LiquidOptions } from "./LiquidGlass";

export type LiquidComponentKind =
  | "button"
  | "badge"
  | "card"
  | "container"
  | "dialog"
  | "drawer"
  | "input"
  | "overlay"
  | "tabs";

const LIQUID_DEFAULT_OPTIONS: Record<LiquidComponentKind, LiquidOptions> = {
  button: {
    cornerRadius: 0,
    blur: 1,
    depth: 8,
    borderLight: 0.2,
    brightness: 100,
    displacementScale: 20,
  },
  badge: {
    cornerRadius: 0,
    blur: 1,
    depth: 4,
    borderLight: 0,
    brightness: 100,
    displacementScale: 20,
  },
  card: {
    cornerRadius: 0,
    blur: 2,
    depth: 10,
    borderLight: 0.2,
    brightness: 100,
    displacementScale: 80,
  },
  container: {
    cornerRadius: 0,
    blur: 2,
    depth: 10,
    borderLight: 0,
    brightness: 100,
    displacementScale: 120,
  },
  dialog: {
    cornerRadius: 8,
    blur: 2,
    depth: 16,
    borderLight: 0.2,
    brightness: 75,
    displacementScale: 160,
    chromaticAberration: 10,
  },
  drawer: {
    cornerRadius: 0,
    blur: 2,
    depth: 24,
    borderLight: 0.2,
    brightness: 50,
    displacementScale: 260,
    chromaticAberration: 30,
  },
  input: {
    cornerRadius: 0,
    blur: 1,
    depth: 4,
    borderLight: 0.15,
    brightness: 100,
    displacementScale: 40,
  },
  overlay: {
    cornerRadius: 0,
    blur: 2,
    depth: 10,
    borderLight: 0.16,
    brightness: 90,
  },
  tabs: {
    cornerRadius: 0,
    blur: 1,
    depth: 8,
    borderLight: 0,
    brightness: 100,
    displacementScale: 24,
  },
};

export const getDefaultLiquidOptions = (
  kind: LiquidComponentKind
): LiquidOptions => ({
  ...LIQUID_DEFAULT_OPTIONS[kind],
  style: {
    ...(LIQUID_DEFAULT_OPTIONS[kind].style ?? {}),
  },
});

export const mergeLiquidOptions = (
  ...sources: Array<LiquidOptions | undefined>
): LiquidOptions => {
  let style: LiquidOptions["style"] = {};
  let className: string | undefined;
  let contentClassName: string | undefined;

  const merged = sources.reduce<LiquidOptions>((acc, source) => {
    if (!source) return acc;

    style = {
      ...(style ?? {}),
      ...(source.style ?? {}),
    };

    className = className;
    contentClassName = contentClassName;

    return {
      ...acc,
      ...source,
    };
  }, {});

  if (style && Object.keys(style).length > 0) {
    merged.style = style;
  }

  if (className) {
    merged.className = className;
  }

  if (contentClassName) {
    merged.contentClassName = contentClassName;
  }

  return merged;
};
