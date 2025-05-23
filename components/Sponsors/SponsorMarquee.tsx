// components/Sponsors/SponsorMarquee.tsx

import { useMemo } from "react";
import { Container, Box } from "@mantine/core";
import Image from "next/image";
import sponsorList from "../../public/sponsors/sponsors.json";
import styles from "./SponsorMarquee.module.css";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SponsorMarquee() {
  const logos = useMemo(
    () =>
      shuffleArray(sponsorList).map((file) => `/sponsors/${file}`),
    []
  );
  const items = [...logos, ...logos];

  return (
    <Container fluid className={styles.marqueeWrapper}>
      <Box className={styles.marqueeTrack}>
        {items.map((src, idx) => (
          <Box key={idx} className={styles.marqueeItem}>
            <Image
              src={src}
              alt={`Sponsor ${idx + 1}`}
              fill
              sizes="260px"
              style={{ objectFit: "contain" }}
              priority={idx < logos.length}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
