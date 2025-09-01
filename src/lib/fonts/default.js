import {
  Caveat,
  IBM_Plex_Sans,
  IBM_Plex_Serif,
  Inter,
  JetBrains_Mono,
  Open_Sans,
  Playfair_Display,
  Roboto_Flex,
  Sora,
  Space_Grotesk,
} from "next/font/google";

// Variable Fonts
const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk-sans",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair-serif",
  subsets: ["latin"],
  display: "swap",
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex-sans",
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat-handwriting",
  subsets: ["latin"],
  display: "swap",
});

// Static Font (non-variable): IBM Plex Serif with full weights
const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Export all font variables as a single string
export const allFonts = [
  inter.variable,
  sora.variable,
  spaceGrotesk.variable,
  playfair.variable,
  robotoFlex.variable,
  openSans.variable,
  ibmPlexSans.variable,
  ibmPlexSerif.variable,
  jetBrainsMono.variable,
  caveat.variable,
].join(" ");

// Export individual fonts if needed
export {
  caveat,
  ibmPlexSans,
  ibmPlexSerif,
  inter,
  jetBrainsMono,
  openSans,
  playfair,
  robotoFlex,
  sora,
  spaceGrotesk,
};
