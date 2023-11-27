import '@/app/ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-zinc-800 text-zinc-100">
      <body>{children}</body>
    </html>
  );
}
