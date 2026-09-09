import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CUT — курс монтажа в CapCut',
  description:
    'Практический курс по монтажу Reels, TikTok и Shorts в CapCut: ритм, кадр, субтитры, звук и цельная история.',
  openGraph: {
    title: 'CUT — курс монтажа в CapCut',
    description:
      'Монтаж коротких видео с пониманием ритма, кадра, текста и звука.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'CUT — курс монтажа в CapCut',
    description: 'Практический курс по монтажу Reels, TikTok и Shorts.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
