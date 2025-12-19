export function Footer() {
  return (
    <footer className="border-t bg-white mt-8">
      <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-slate-500 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <p>© {new Date().getFullYear()} Bean &amp; Bite Cafe. All rights reserved.</p>
        <p>Made with ☕ &amp; Next.js</p>
      </div>
    </footer>
  );
}
