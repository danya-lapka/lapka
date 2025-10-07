import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import localFont from "next/font/local";
import '@/styles/globals.scss';
import '@/styles/all.scss';
import '@/styles/adaptive.scss';
import { Header, Footer } from "@/blocks";

const heading = Unbounded({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"]
});

const body = localFont({
  src: [
    {
      path: './fonts/monocraft/Monocraft-Black-Italic.otf',
      weight: '700',
      style: 'italic'
    },
    {
      path: './fonts/monocraft/Monocraft-Bold-Italic.otf',
      weight: '600',
      style: 'italic'
    },
    {
      path: './fonts/monocraft/Monocraft-SemiBold-Italic.otf',
      weight: '500',
      style: 'italic'
    },
    {
      path: './fonts/monocraft/Monocraft-Italic.otf',
      weight: '400',
      style: 'italic'
    },
    {
      path: './fonts/monocraft/Monocraft-ExtraLight-Italic.otf',
      weight: '300',
      style: 'italic'
    },
    {
      path: './fonts/monocraft/Monocraft-Black.otf',
      weight: '700',
      style: 'normal'
    },
    {
      path: './fonts/monocraft/Monocraft-Bold.otf',
      weight: '600',
      style: 'normal'
    },
    {
      path: './fonts/monocraft/Monocraft-SemiBold.otf',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/monocraft/Monocraft-Light.otf',
      weight: '300',
      style: 'normal'
    }
  ],
  variable: '--font-body'
})

export const metadata: Metadata = {
  title: "Danya_lapka",
  description: "Dada"
};

export default function RootLayout(
  { children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${heading.variable} ${body.variable}`}>
        <Header />
        <main>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
