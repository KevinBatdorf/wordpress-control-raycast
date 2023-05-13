import type { Color } from "@raycast/api";

export const tag = (value: string, color: Color) => ({ tag: { value, color } });
