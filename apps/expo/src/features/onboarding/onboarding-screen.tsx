import React from "react";

import { Screen } from "~/components/screen";
import { Typography } from "~/components/typography";

function Title(props: React.PropsWithChildren) {
  return (
    <Typography size="xxl" bold>
      {props.children}
    </Typography>
  );
}

function Content(props: React.PropsWithChildren) {
  return <Typography size="md">{props.children}</Typography>;
}

export function OnboardingScreen(props: React.PropsWithChildren) {
  return <Screen>{props.children}</Screen>;
}

OnboardingScreen.Title = Title;
OnboardingScreen.Content = Content;
