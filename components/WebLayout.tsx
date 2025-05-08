import React from "react";
import { AppShell } from "@mantine/core";
import NavbarSimpleContent from "./Navbar/NavbarSimpleContent";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      padding={0}
      header={{ height: 60 }}
      navbar={undefined}
      styles={{
        main: {
          marginTop: 60,
          padding: "0",
        },
      }}
    >
      <AppShell.Header px="md" style={{ background: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
        <NavbarSimpleContent />
      </AppShell.Header>
      {children}
    </AppShell>
  );
}
