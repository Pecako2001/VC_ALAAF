import { useState } from "react";
import WebLayout from "../components/WebLayout";
import Head from "next/head";
import Image from "next/image";
import {
  Container,
  Title,
  Box,
  Text,
  Paper,
  Divider,
  Group,
  Button,
  Modal,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Transition } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import styles from "../styles/WagenEarlier.module.css";

type Wagen = {
  year: string;
  theme: string;
  desc: string;
  image: string;
  gallery?: string[];
};

export default function WagensPage() {
  const items: Wagen[] = [
    {
      year: "2025",
      theme: "Kermis",
      desc: "De kermis is os um ut aeve, vasteloavend—det is os leave!",
      image: "/images/Wagen2025.jpeg",
      // gallery: [
      //   "/images/wagen2025/foto1.jpeg",
      //   "/images/wagen2025/foto2.jpeg",
      //   "/images/wagen2025/foto3.jpeg",
      //   "/images/wagen2025/foto4.jpeg",
      //   "/images/wagen2025/foto5.jpeg",
      // ],
    },
    {
      year: "2024",
      theme: "Bob de bouwer",
      desc: "Wea zien neet de BOB mer de Bouwers!",
      image: "/images/Wagen2024.jpeg",
    },
    {
      year: "2023",
      theme: "Skihut",
      desc: "Après-ski vibes op de wagen!",
      image: "/images/Wagen2023.jpeg",
    },
  ];

  const [opened, setOpened] = useState(false);
  const [gallery, setGallery] = useState<string[]>([]);

  return (
    <WebLayout>
      <Head>
        <title>Wagens – VC-ALAAF</title>
      </Head>

      {/* Hero */}
      <Box className={styles.hero}>
        <Container size="lg">
          <Title order={1} className={styles.heroTitle}>
            Onze Carnavalswagens
          </Title>
          <Text className={styles.heroSubtitle}>
            Een terugblik op de creaties van de afgelopen jaren
          </Text>
        </Container>
      </Box>

      {/* Page background */}
      <Box className={styles.pageBackground}>
        <Container size="lg" className={styles.container}>
          {items.map((wagen, i) => (
            <Transition
              key={wagen.year}
              mounted
              transition="fade"
              duration={400}
              timingFunction="ease"
            >
              {(transitionStyles) => (
                <Paper
                  style={{
                    ...transitionStyles,
                    transitionDelay: `${i * 120}ms`,
                  }}
                  className={`${styles.card} ${
                    i % 2 === 0 ? styles.normal : styles.reversed
                  }`}
                  radius="md"
                  shadow="md"
                >
                  {/* Image */}
                  <Box className={styles.imageWrapper}>
                    <Image
                      src={wagen.image}
                      alt={`Wagen ${wagen.year}`}
                      fill
                      style={{ objectFit: "cover" }}
                      className={styles.image}
                      priority
                    />
                  </Box>

                  {/* Text */}
                  <Box className={styles.text}>
                    <Group mb={4} className={styles.yearRow}>
                      <Divider
                        className={styles.yearBar}
                        orientation="vertical"
                      />
                      <Title order={2} className={styles.year}>
                        {wagen.year}
                      </Title>
                    </Group>

                    <Title order={4} className={styles.theme} mb={4}>
                      Thema: {wagen.theme}
                    </Title>
                    <Text size="sm" mb="md">
                      {wagen.desc}
                    </Text>

                    {wagen.gallery && (
                      <Button
                        size="xs"
                        leftSection={<IconPhoto size={14} />}
                        onClick={() => {
                          setGallery(wagen.gallery!);
                          setOpened(true);
                        }}
                      >
                        Bekijk meer foto’s
                      </Button>
                    )}
                  </Box>
                </Paper>
              )}
            </Transition>
          ))}
        </Container>
      </Box>

      {/* Gallery modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size="lg"
        title="Galerij"
        centered
      >
        <Carousel
          withIndicators
          slideSize="100%"
          height={400}
          styles={{ indicator: { background: "#0093d0" } }}
        >
          {gallery.map((src) => (
            <Carousel.Slide key={src}>
              <Box className={styles.slideImageWrapper}>
                <Image
                  src={src}
                  alt="Galerijfoto"
                  fill
                  style={{ objectFit: "contain", borderRadius: 8 }}
                />
              </Box>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Modal>
    </WebLayout>
  );
}
