import { Container, Box } from "@mantine/core";
import Image from "next/image";
import sponsorList from "../../public/sponsors/sponsors.json";
import styles from "./SponsorMarquee.module.css";

const logos = sponsorList.map((file) => `/sponsors/${file}`);

export default function SponsorMarquee() {
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
