import '@/app/ui/global.css';
import { genos, grotesk, inter, overlock, josefin } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${genos.variable} ${grotesk.variable} ${inter.variable} ${overlock.variable} ${josefin.variable} bg-background-0 text-primary-normal font-grotesk`}>
      <body>{children}</body>
    </html>
  );
}
