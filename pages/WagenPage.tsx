import { useState } from "react";
import WebLayout from "../components/WebLayout";
import Head from "next/head";
import '@mantine/carousel/styles.css';
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
      gallery: [
        "/images/wagen2025/foto1.jpg",
        "/images/wagen2025/foto2.jpg",
        "/images/wagen2025/foto3.jpg",
        "/images/wagen2025/foto4.jpg",
        "/images/wagen2025/foto5.jpg",
        "/images/wagen2025/foto6.jpg",
        "/images/wagen2025/foto7.jpg",
        "/images/wagen2025/foto8.jpg",
        "/images/wagen2025/foto9.jpg",
        "/images/wagen2025/foto10.jpg",
        "/images/wagen2025/foto11.jpg",
        "/images/wagen2025/foto12.jpg",
        "/images/wagen2025/foto13.jpg",
        "/images/wagen2025/foto14.jpg",
        "/images/wagen2025/foto15.jpg",
        "/images/wagen2025/foto16.jpg",
        "/images/wagen2025/foto17.jpg",
        "/images/wagen2025/foto18.jpg",
        "/images/wagen2025/foto19.jpg",
        "/images/wagen2025/foto20.jpg",
        "/images/wagen2025/foto21.jpg",
        "/images/wagen2025/foto22.jpg",
        "/images/wagen2025/foto23.jpg",
        "/images/wagen2025/foto24.jpg",
        "/images/wagen2025/foto25.jpg",
        "/images/wagen2025/foto26.jpeg",
        "/images/wagen2025/foto27.jpeg",
        "/images/wagen2025/foto28.jpeg",
        "/images/wagen2025/foto29.jpeg",

      ],
    },
    {
      year: "2024",
      theme: "Bob de bouwer",
      desc: "Wea zien neet de BOB mer de Bouwers!",
      image: "/images/Wagen2024.jpeg",
      gallery: [
        "/images/wagen2024/foto1.jpg",
        "/images/wagen2024/foto2.jpg",
        "/images/wagen2024/foto3.jpg",
      ],
    },
    {
      year: "2023",
      theme: "Skihut",
      desc: "Bij os zit de vasteloavend in de lift!",
      image: "/images/Wagen2023.jpeg",
      gallery: [
        "/images/wagen2023/foto1.jpg",
        "/images/wagen2023/foto2.jpg",
        "/images/wagen2023/foto3.jpg",
      ],
    },
    {
      year: "2020",
      theme: "Skihut",
      desc: "Neet naor het malieveld, vasteloavend det telt!",
      image: "/images/Wagen2020.jpeg",
      gallery: [
        "/images/wagen2020/foto1.jpg",
        "/images/wagen2020/foto2.jpeg",
        "/images/wagen2020/foto3.jpeg",
        "/images/wagen2020/foto4.jpg",
      ],
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
        size="xl"  // Changed from "lg" to "xl"
        centered
      >
        <Carousel
          withIndicators
          slideSize="100%"
          height={800}
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
