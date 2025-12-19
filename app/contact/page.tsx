export default function ContactPage() {
  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-2xl font-semibold tracking-tight">Contact Us</h1>
      <form className="bg-white border rounded-xl p-4 space-y-3 text-sm">
        <div className="space-y-1">
          <label>Name</label>
          <input className="w-full border rounded-lg px-3 py-2 text-sm" />
        </div>
        <div className="space-y-1">
          <label>Email</label>
          <input type="email" className="w-full border rounded-lg px-3 py-2 text-sm" />
        </div>
        <div className="space-y-1">
          <label>Message</label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 text-sm"
            rows={4}
          />
        </div>
        <button className="rounded-full bg-amber-600 text-white px-5 py-2 text-sm font-medium hover:bg-amber-700">
          Send Message
        </button>
      </form>
    </div>
  );
}
