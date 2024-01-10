import { shorthands } from "@tamagui/shorthands";
import { themes, tokens } from "@tamagui/themes";
import { createTamagui } from "tamagui";

import { animations } from "./animations";
import fonts from "./fonts";

const appConfig = createTamagui({
  shouldAddPrefersColorThemes: true,
  animations,
  fonts,
  shorthands,
  themes,
  tokens,
});

export type AppConfig = typeof appConfig;
export default appConfig;

declare module "tamagui" {
  type TamaguiCustomConfig = AppConfig;
}
