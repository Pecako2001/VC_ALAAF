import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Box, Container, Group, Text } from "@mantine/core";
import { IconHome, IconPackage } from "@tabler/icons-react";
import classes from "./NavbarSimple.module.css";

const links = [
  { href: "/", label: "Home", icon: IconHome },
  { href: "/WagenPage", label: "Wagens", icon: IconPackage },
];

export default function NavbarSimpleContent() {
  const { pathname } = useRouter();

  return (
    <Box component="nav" className={classes.nav}>
      <Container className={classes.navContainer}>
        {/* logo + title */}
        <Group align="center" gap={8} wrap="nowrap">
          <Image src="/images/Logo.png" width={32} height={32} alt="VC-ALAAF Logo" />
          <Text className={classes.title}>VC-ALAAF</Text>
        </Group>

        {/* nav links */}
        <Group className={classes.links} wrap="nowrap">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`${classes.link} ${active ? classes.active : ""}`}
              >
                <Icon size={18} className={classes.icon} />
                <span>{label}</span>
              </Link>
            );
          })}
        </Group>
      </Container>
    </Box>
  );
}
