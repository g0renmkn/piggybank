/**
 * fonts.ts
 * 
 * Fonts definition file.
 * 
 */
import { Inter, Overlock, Genos, Josefin_Sans, Space_Grotesk } from 'next/font/google';

/* Inter font */
export const inter = Inter({ 
    subsets: ['latin'],
    display: "swap",
    variable: "--font-inter"
});

/* Overlock font */
export const overlock = Overlock({
    subsets: ['latin'], 
    weight: [
        "400", 
        "700", 
        "900"
    ],
    display: "swap",
    variable: "--font-overlock"
});

/* Genos font */
export const genos = Genos({ 
    subsets: ['latin'], 
    weight: [
        "100", 
        "200", 
        "300", 
        "400", 
        "500", 
        "600", 
        "700", 
        "800", 
        "900"
    ],
    display: "swap",
    variable: "--font-genos"
});

/* Josefin Sans font */
export const josefin = Josefin_Sans({ 
    subsets: ['latin'], 
    weight: [
        "100", 
        "200", 
        "300", 
        "400", 
        "500", 
        "600", 
        "700"
    ],
    display: "swap",
    variable: "--font-josefin"
});

export const grotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: [
        "300", 
        "400", 
        "500", 
        "600", 
        "700"
    ],
    display: "swap",
    variable: "--font-grotesk"
});