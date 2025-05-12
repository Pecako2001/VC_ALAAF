import { useState } from "react";
import WebLayout from "../components/WebLayout";
import Head from "next/head";
import Image from "next/image";
import {
  Container,
  Title,
  SimpleGrid,
  Card,
  AspectRatio,
  Box,
  Paper,
  Text,
  Button,
  TextInput,
  Textarea,
  Notification,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBrandInstagram, IconCheck, IconX } from "@tabler/icons-react";
import { Transition } from "@mantine/core";
import SponsorMarquee from "../components/Sponsors/SponsorMarquee";
import styles from "../styles/HomePage.module.css";
import { useMediaQuery } from "@mantine/hooks";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const form = useForm({
    initialValues: { naam: "", email: "", telefoon: "", bericht: "" },
    validate: {
      naam: (v: string) => (v.trim().length < 2 ? "Vul uw naam in" : null),
      email: (v: string) => (/^\S+@\S+$/.test(v) ? null : "Ongeldig e-mailadres"),
      telefoon: (v: string) => (/^\+?\d{6,15}$/.test(v) ? null : "Ongeldig telefoonnummer"),
      bericht: (v: string) => (v.trim().length === 0 ? "Vul een bericht in" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(values).forEach(([k, v]) => fd.append(k, v as string));
      const res = await fetch("https://formspree.io/f/xyzkbyza", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      if (res.ok) {
        setNotif({ type: "success", message: "Bedankt! We nemen snel contact op." });
        form.reset();
      } else throw new Error();
    } catch {
      setNotif({ type: "error", message: "Er ging iets mis. Probeer opnieuw." });
    } finally {
      setLoading(false);
      setTimeout(() => setNotif(null), 5000);
    }
  };

  return (
    <WebLayout>
      <Head>
        <title>VC AL-AAF</title>
      </Head>

      {/* Hero */}
      <Box className={styles.hero}>
        <Container size="lg">
          <Title order={1} className={styles.heroTitle}>
            Welkom bij VC AL-AAF
          </Title>
          <Text className={styles.heroSubtitle}>
            Bouw mee aan onze carnavalswagen 2026
          </Text>
          <Button size="lg" radius="xl" component="a" href="#sponsor" className={styles.cta}>
            Word sponsor
          </Button>
        </Container>
      </Box>

      {/* Wrap all sections in gradient background */}
      <Box className={styles.pageBackground}>
        {/* Video */}
        <Container size="lg" my="xl">
          <AspectRatio ratio={16 / 9} className={styles.videoWrapper}>
            <iframe
              src="https://www.youtube.com/embed/aiQFMUmnQ6s?si=WMiAg-NMGlDEH-k_"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.iframe}
            />
          </AspectRatio>
        </Container>

        {/* Bouwproces */}
        <Container size="lg" my="xl" className={styles.section}>
          <Title order={2} ta="center" mb="md">
            Het bouwproces
          </Title>
          <SimpleGrid cols={useMediaQuery('(max-width: 768px)') ? 1 : 2} spacing="md">
            {["1", "2", "3", "4"].map((n, i) => (
              <Transition key={n} mounted={true} transition="fade" duration={300 + 100 * i}>
                {(transitionStyles) => (
                  <Card shadow="sm" p={0} className={styles.card} style={transitionStyles}>
                    <Box className={styles.imageBox}>
                      <Image
                        src={`/images/wagen_2025_${n}.png`}
                        alt={`Wagen ${n}`}
                        fill
                        style={{ objectFit: "cover" }}
                        className={styles.image}
                      />
                    </Box>
                  </Card>
                )}
              </Transition>
            ))}
          </SimpleGrid>
        </Container>

        {/* Sponsoren */}
        <Container id="sponsor" my="xl" className={styles.fullWidth}>
          <Paper shadow="xs" p="lg" className={styles.sponsorPaper}>
            <Title order={3} ta="center" mb="sm">
              Onze Sponsoren!
            </Title>
            <Text ta="center" mb="md">
              Een shout-out naar al onze geweldige sponsoren.
            </Text>
            <SponsorMarquee />
          </Paper>
        </Container>

        {/* Contact Form */}
        <Container size="sm" my="xl">
          <Paper shadow="sm" p="lg" className={styles.formPaper}>
            <Title order={3} mb="sm">
              Word sponsor!
            </Title>
            <Text mb="md" className={styles.formText}>
              Interesse? Vul het formulier in of bel{" "}
              <a href="tel:+31640167158" className={styles.phone}>
                +31 6 40167158
              </a>
              .
            </Text>

            <form onSubmit={form.onSubmit(handleSubmit)} className={styles.form}>
              <TextInput
                label="Naam / Bedrijf"
                placeholder="Naam / Bedrijf"
                required
                {...form.getInputProps("naam")}
              />
              <TextInput
                mt="md"
                label="E-mail"
                placeholder="E-mail"
                required
                {...form.getInputProps("email")}
              />
              <TextInput
                mt="md"
                label="Telefoon"
                placeholder="Telefoon"
                required
                {...form.getInputProps("telefoon")}
              />
              <Textarea
                mt="md"
                label="Uw bericht"
                placeholder="Uw bericht"
                minRows={4}
                required
                {...form.getInputProps("bericht")}
              />
              <Button type="submit" fullWidth mt="md" loading={loading}>
                Submit
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>

      {/* Inline Notification */}
      {notif && (
        <Box className={styles.notificationBox}>
          <Notification
            icon={notif.type === "success" ? <IconCheck /> : <IconX />}
            color={notif.type === "success" ? "green" : "red"}
            onClose={() => setNotif(null)}
          >
            {notif.message}
          </Notification>
        </Box>
      )}

      {/* Footer */}
      <Box component="footer" className={styles.footer}>
        <Text ta="center" mb="xs">
          Volg ons op Instagram
        </Text>
        <Button
          component="a"
          href="https://www.instagram.com/"
          target="_blank"
          variant="gradient"
          gradient={{ from: "pink", to: "orange" }}
          radius="xl"
          rightSection={<IconBrandInstagram size={18} />}
        >
          Instagram
        </Button>
      </Box>
    </WebLayout>
  );
}
