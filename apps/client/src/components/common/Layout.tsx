import { PropsWithChildren } from "react";
import { AppShell, Box, useMantineTheme } from "@mantine/core";
import { Navbar } from "./Navbar";

export function Layout({ children }: PropsWithChildren) {
  const theme = useMantineTheme();
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white
        }
      }}
      header={<Navbar />}
    >
      <Box mt="md">{children}</Box>
    </AppShell>
  );
}
