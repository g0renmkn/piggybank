import '@/app/ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background-1 text-text-1">
      <body>{children}</body>
    </html>
  );
}
