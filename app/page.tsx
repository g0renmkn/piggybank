export default function Page() {
  return (
    <main>
      <p className="hidden md:block">Landing Page for Desktop</p>
      <p className="block md:hidden">Landing Page for Mobile</p>
    </main>
  );
}
