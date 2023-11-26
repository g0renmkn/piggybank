import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <p>Landing Page</p>
      <Link href="/dashboard">&lt;Go to Dashboard&gt;</Link>
    </main>
  );
}
