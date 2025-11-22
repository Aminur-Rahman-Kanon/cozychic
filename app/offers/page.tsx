export default function OffersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Special Offers</h1>
      <p className="text-sm text-slate-600">
        This is a placeholder for dynamic offers. Later you can connect it to
        the Offer model and admin panel.
      </p>
      <div className="bg-white border rounded-xl p-4 text-sm">
        <p className="font-medium">Sample Offer</p>
        <p className="text-xs text-slate-600">
          Set up your real offers in the admin panel and render them here.
        </p>
      </div>
    </div>
  );
}
