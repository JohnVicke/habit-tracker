import type { TextProps } from "react-native";
import { Text } from "react-native";

import { cn } from "~/utils/cn";

type Size = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

type TypographyProps = Omit<TextProps, "className"> & {
  size?: Size;
  tw?: string;
} & (
    | {
        bold: boolean;
        thin?: never;
        italic?: never;
      }
    | {
        bold?: never;
        thin: boolean;
        italic?: never;
      }
    | {
        bold?: never;
        thin?: never;
        italic: boolean;
      }
    | {
        bold?: never;
        thin?: never;
        italic?: never;
      }
  );

export function Typography({
  size = "md",
  bold,
  thin,
  italic,
  tw,
  ...rest
}: TypographyProps) {
  const family = bold
    ? fontFamily.bold
    : thin
      ? fontFamily.thin
      : italic
        ? fontFamily.italic
        : fontFamily.default;

  return (
    <Text
      className={cn(`${family} ${fontSize[size]} ${tw} text-slate-800 `)}
      {...rest}
    />
  );
}

type FontFamily = "bold" | "thin" | "italic" | "default";

const fontFamily = {
  bold: "font-qs-bold",
  thin: "font-qs-thin",
  italic: "font-qs-italic",
  default: "font-qs-regular",
} satisfies Record<FontFamily, string>;

const fontSize = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-xl",
  xl: "text-2xl",
  xxl: "text-6xl",
} satisfies Record<Size, string>;
