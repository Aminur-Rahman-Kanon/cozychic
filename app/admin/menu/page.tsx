"use client";

import { FormEvent, useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function AdminMenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingCat, setSavingCat] = useState(false);
  const [savingItem, setSavingItem] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  async function handleCreateCategory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const slug = (form.elements.namedItem("slug") as HTMLInputElement).value;
    const description = (
      form.elements.namedItem("description") as HTMLInputElement
    ).value;

    setSavingCat(true);
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug, description }),
    });
    const newCat = await res.json();
    setSavingCat(false);

    if (res.ok) {
      setCategories((prev) => [...prev, newCat]);
      form.reset();
    } else {
      alert(newCat.error || "Failed to create category");
    }
  }

  async function handleCreateItem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const slug = (form.elements.namedItem("slug") as HTMLInputElement).value;
    const description = (
      form.elements.namedItem("description") as HTMLInputElement
    ).value;
    const basePrice = Number(
      (form.elements.namedItem("basePrice") as HTMLInputElement).value
    );
    const categoryId = (
      form.elements.namedItem("categoryId") as HTMLSelectElement
    ).value;

    setSavingItem(true);
    const res = await fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug, description, basePrice, categoryId }),
    });
    const data = await res.json();
    setSavingItem(false);
    if (!res.ok) {
      alert(data.error || "Failed to create item");
      return;
    }
    form.reset();
    alert("Item created");
  }

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold">Menu Management</h2>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="bg-white border rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-semibold">Create Category</h3>
          <form onSubmit={handleCreateCategory} className="space-y-3 text-sm">
            <div className="space-y-1">
              <label>Name</label>
              <input
                name="name"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
            <div className="space-y-1">
              <label>Slug</label>
              <input
                name="slug"
                placeholder="e.g. coffee"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
            <div className="space-y-1">
              <label>Description (optional)</label>
              <input
                name="description"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={savingCat}
              className="rounded-full bg-amber-600 text-white px-4 py-1.5 text-sm font-medium hover:bg-amber-700 disabled:opacity-60"
            >
              {savingCat ? "Saving..." : "Create Category"}
            </button>
          </form>
        </div>

        <div className="bg-white border rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-semibold">Create Item</h3>
          {loading ? (
            <p className="text-xs text-slate-500">Loading categories...</p>
          ) : categories.length === 0 ? (
            <p className="text-xs text-red-600">
              No categories yet. Create a category first.
            </p>
          ) : (
            <form onSubmit={handleCreateItem} className="space-y-3 text-sm">
              <div className="space-y-1">
                <label>Name</label>
                <input
                  name="name"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>
              <div className="space-y-1">
                <label>Slug</label>
                <input
                  name="slug"
                  placeholder="e.g. flat-white"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>
              <div className="space-y-1">
                <label>Description</label>
                <input
                  name="description"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label>Base Price</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="basePrice"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>
              <div className="space-y-1">
                <label>Category</label>
                <select
                  name="categoryId"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={savingItem}
                className="rounded-full bg-amber-600 text-white px-4 py-1.5 text-sm font-medium hover:bg-amber-700 disabled:opacity-60"
              >
                {savingItem ? "Saving..." : "Create Item"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
