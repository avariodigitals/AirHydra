"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Content = {
  hero: any;
  productGallery: any;
  problem: any;
  benefits: any;
  howItWorks: any;
  lifestyle: any;
  testimonials: any;
  stores: any;
  faqs: any;
  finalCta: any;
  settings: any;
};

/* ── Toast ───────────────────────────────────────────────────────── */
function Toast({ show, success }: { show: boolean; success: boolean }) {
  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      } ${success ? "bg-white border border-green-100" : "bg-white border border-red-100"}`}
    >
      {success ? (
        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      )}
      <div>
        <p className="text-sm font-medium text-gray-900">
          {success ? "Changes saved successfully" : "Failed to save changes"}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          {success ? "Your page has been updated." : "Please try again."}
        </p>
      </div>
    </div>
  );
}

/* ── Image Uploader ──────────────────────────────────────────────── */
function ImageUploader({
  label,
  currentUrl,
  currentFileId,
  folder,
  onUploaded,
}: {
  label: string;
  currentUrl: string;
  currentFileId?: string;
  folder: string;
  onUploaded: (result: { url: string; fileId?: string }) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [staged, setStaged] = useState<File | null>(null);
  const [stagedPreview, setStagedPreview] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handlePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStaged(file);
    setStagedPreview(URL.createObjectURL(file));
    setDone(false);
    setError("");
    setProgress(0);
    e.target.value = "";
  };

  const handleUpload = async () => {
    if (!staged) return;
    setError("");
    setUploading(true);
    setProgress(0);
    setDone(false);

    try {
      // 1. Get auth params from our server (fast — no file involved)
      const authRes = await fetch("/api/imagekit-auth");
      if (!authRes.ok) throw new Error("Auth failed");
      const { token, expire, signature } = await authRes.json();

      const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;

      const form = new FormData();
      form.append("file", staged);
      form.append("fileName", staged.name);
      form.append("folder", folder);
      form.append("publicKey", publicKey);
      form.append("signature", signature);
      form.append("expire", String(expire));
      form.append("token", token);

      const data = await new Promise<{ url: string; fileId: string }>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://upload.imagekit.io/api/v1/files/upload");
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(JSON.parse(xhr.responseText)?.message || "Upload failed"));
          }
        };
        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send(form);
      });

      // 3. Delete old asset in background (non-blocking)
      if (currentFileId) {
        fetch("/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileId: currentFileId }),
        }).catch(() => {});
      }

      setProgress(100);
      setDone(true);
      setUploading(false);
      setStaged(null);
      onUploaded({ url: data.url, fileId: data.fileId });
    } catch (err: any) {
      setError(err.message);
      setUploading(false);
      setProgress(0);
    }
  };

  const displayUrl = stagedPreview || currentUrl;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>

      {displayUrl && (
        <div className="mb-4 rounded-2xl overflow-hidden bg-cream aspect-video w-full max-w-sm relative">
          <img src={displayUrl} alt="Preview" className="w-full h-full object-cover" />
          {staged && !uploading && (
            <div className="absolute top-2 right-2 bg-amber-400 text-white text-xs font-medium px-2 py-1 rounded-full">
              Not uploaded yet
            </div>
          )}
          {done && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Uploaded
            </div>
          )}
        </div>
      )}

      {uploading && (
        <div className="mb-4 max-w-sm">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Uploading…</span>
            <span className="font-medium text-primary">{progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handlePick} />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-cream transition-colors disabled:opacity-40"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          {displayUrl ? "Choose Different" : "Choose Image"}
        </button>

        {staged && !uploading && (
          <button
            type="button"
            onClick={handleUpload}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload Now
          </button>
        )}
      </div>

      {error && <p className="mt-2 text-red-500 text-xs">{error}</p>}
    </div>
  );
}

/* ── Dashboard ───────────────────────────────────────────────────── */
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("hero");
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; success: boolean }>({ show: false, success: true });
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) { router.push("/admin"); return; }
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const res = await fetch("/api/content");
      setContent(await res.json());
    } catch (e) {
      console.error("Failed to load content", e);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (success: boolean) => {
    setToast({ show: true, success });
    setTimeout(() => setToast({ show: false, success }), 3500);
  };

  const saveContent = async () => {
    if (!content) return;
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_KEY}`,
        },
        body: JSON.stringify(content),
      });
      showToast(res.ok);
    } catch {
      showToast(false);
    } finally {
      setSaving(false);
    }
  };

  const updateContent = (section: string, data: any) =>
    setContent((prev) => (prev ? { ...prev, [section]: data } : null));

  const tabs = [
    { id: "hero", label: "Hero" },
    { id: "productGallery", label: "Product Gallery" },
    { id: "problem", label: "Problem" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "benefits", label: "Benefits" },
    { id: "testimonials", label: "Testimonials" },
    { id: "faqs", label: "FAQ" },
    { id: "stores", label: "Stores" },
    { id: "settings", label: "Settings" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Toast show={toast.show} success={toast.success} />

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
          <h1 className="text-2xl font-serif mb-8">AirHydra Admin</h1>
          <nav className="space-y-2 flex-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-full text-sm transition-colors ${
                  activeTab === tab.id ? "bg-primary text-white" : "text-gray-700 hover:bg-cream"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => { localStorage.removeItem("adminAuth"); router.push("/admin"); }}
            className="w-full px-4 py-3 text-gray-500 hover:text-gray-800 text-left text-sm"
          >
            Logout
          </button>
        </div>

        {/* Main */}
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif capitalize">{activeTab}</h2>
            <button
              onClick={saveContent}
              disabled={saving}
              className="bg-primary text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              )}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">
            {content && (
              <>
                {activeTab === "hero" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
                      <input
                        type="text"
                        value={content.hero.headline}
                        onChange={(e) => updateContent("hero", { ...content.hero, headline: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subheadline</label>
                      <textarea
                        value={content.hero.subheadline}
                        onChange={(e) => updateContent("hero", { ...content.hero, subheadline: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                        rows={3}
                      />
                    </div>
                    <ImageUploader
                      label="Hero Background Image"
                      currentUrl={content.hero.heroImage}
                      currentFileId={content.hero.heroImageFileId}
                      folder="/airhydra/hero"
                      onUploaded={({ url, fileId }) => updateContent("hero", { ...content.hero, heroImage: url, heroImageFileId: fileId ?? content.hero.heroImageFileId })}
                    />
                    <ImageUploader
                      label="Product Image (beside text)"
                      currentUrl={content.hero.productImage}
                      currentFileId={content.hero.productImageFileId}
                      folder="/airhydra/product"
                      onUploaded={({ url, fileId }) => updateContent("hero", { ...content.hero, productImage: url, productImageFileId: fileId ?? content.hero.productImageFileId })}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Overlay Darkness:{" "}
                        <span className="text-primary font-semibold">
                          {Math.round((content.hero.overlayOpacity ?? 0.5) * 100)}%
                        </span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={content.hero.overlayOpacity ?? 0.5}
                        onChange={(e) => updateContent("hero", { ...content.hero, overlayOpacity: parseFloat(e.target.value) })}
                        className="w-full accent-primary"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Light</span>
                        <span>Dark</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "productGallery" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Section Headline</label>
                      <input
                        type="text"
                        value={content.productGallery?.headline ?? ""}
                        onChange={(e) => updateContent("productGallery", { ...content.productGallery, headline: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subheadline</label>
                      <input
                        type="text"
                        value={content.productGallery?.subheadline ?? ""}
                        onChange={(e) => updateContent("productGallery", { ...content.productGallery, subheadline: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <p className="text-xs text-gray-400">Up to 3 images shows a grid. 4 or more switches to a carousel automatically.</p>
                    {(content.productGallery?.images ?? []).map((img: any, index: number) => (
                      <div key={index} className="border border-gray-200 p-6 rounded-2xl space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Image {index + 1}</p>
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = content.productGallery.images.filter((_: any, i: number) => i !== index);
                              updateContent("productGallery", { ...content.productGallery, images: newImages });
                            }}
                            className="text-xs text-red-400 hover:text-red-600 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
                          <input
                            type="text"
                            value={img.alt}
                            onChange={(e) => {
                              const newImages = [...content.productGallery.images];
                              newImages[index] = { ...newImages[index], alt: e.target.value };
                              updateContent("productGallery", { ...content.productGallery, images: newImages });
                            }}
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <ImageUploader
                          label="Product Image"
                          currentUrl={img.url}
                          currentFileId={img.fileId}
                          folder="/airhydra/gallery"
                          onUploaded={({ url, fileId }) => {
                            const newImages = [...content.productGallery.images];
                            newImages[index] = { ...newImages[index], url, fileId: fileId ?? img.fileId };
                            updateContent("productGallery", { ...content.productGallery, images: newImages });
                          }}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = [...(content.productGallery?.images ?? []), { url: "", alt: "AirHydra Product", fileId: "" }];
                        updateContent("productGallery", { ...content.productGallery, images: newImages });
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-dashed border-primary/40 rounded-full text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Image
                    </button>
                  </div>
                )}

                {activeTab === "problem" && (
                  <div className="space-y-6">
                    {content.problem.problemPoints.map((point: any, index: number) => (
                      <div key={index} className="border border-gray-200 p-6 rounded-2xl space-y-4">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Card {index + 1}</p>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={point.title}
                            onChange={(e) => {
                              const newPoints = [...content.problem.problemPoints];
                              newPoints[index] = { ...newPoints[index], title: e.target.value };
                              updateContent("problem", { ...content.problem, problemPoints: newPoints });
                            }}
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={point.description}
                            onChange={(e) => {
                              const newPoints = [...content.problem.problemPoints];
                              newPoints[index] = { ...newPoints[index], description: e.target.value };
                              updateContent("problem", { ...content.problem, problemPoints: newPoints });
                            }}
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                            rows={3}
                          />
                        </div>
                        <ImageUploader
                          label="Card Image"
                          currentUrl={point.image || ""}
                          currentFileId={point.imageFileId || ""}
                          folder="/airhydra/problem"
                          onUploaded={({ url, fileId }) => {
                            const newPoints = [...content.problem.problemPoints];
                            newPoints[index] = { ...newPoints[index], image: url, imageFileId: fileId ?? point.imageFileId };
                            updateContent("problem", { ...content.problem, problemPoints: newPoints });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "problem" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
                      <input
                        type="text"
                        value={content.lifestyle.headline}
                        onChange={(e) => updateContent("lifestyle", { ...content.lifestyle, headline: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={content.lifestyle.description}
                        onChange={(e) => updateContent("lifestyle", { ...content.lifestyle, description: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Text</label>
                      <input
                        type="text"
                        value={content.lifestyle.ctaText}
                        onChange={(e) => updateContent("lifestyle", { ...content.lifestyle, ctaText: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CTA WhatsApp Prefill Message</label>
                      <textarea
                        value={content.lifestyle.ctaPrefill}
                        onChange={(e) => updateContent("lifestyle", { ...content.lifestyle, ctaPrefill: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                        rows={2}
                      />
                    </div>
                    <ImageUploader
                      label="Lifestyle Image"
                      currentUrl={content.lifestyle.image}
                      currentFileId={content.lifestyle.imageFileId}
                      folder="/airhydra/lifestyle"
                      onUploaded={({ url, fileId }) => updateContent("lifestyle", { ...content.lifestyle, image: url, imageFileId: fileId ?? content.lifestyle.imageFileId })}
                    />
                  </div>
                )}

                {activeTab === "benefits" && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500 mb-2">Icons are fixed — only the title text is editable.</p>
                    {content.benefits.benefitsList.map((benefit: any, index: number) => {
                      const svgPaths = [
                        <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C8 7 5 11.5 5 14.5a7 7 0 0014 0C19 11.5 16 7 12 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18a3.5 3.5 0 01-3.5-3.5" /></>,
                        <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>,
                        <><circle cx="12" cy="12" r="4" strokeWidth={1.5} /><path strokeLinecap="round" strokeWidth={1.5} d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></>,
                        <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></>,
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
                      ];
                      return (
                        <div key={index} className="border border-gray-200 p-5 rounded-2xl flex items-center gap-5">
                          <div className="w-12 h-12 bg-[#2E6EBB]/10 rounded-xl flex items-center justify-center shrink-0 text-[#2E6EBB]">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {svgPaths[index]}
                            </svg>
                          </div>
                          <div className="flex-1">
                            <label className="block text-xs font-medium text-gray-500 mb-1.5">Title</label>
                            <input
                              type="text"
                              value={benefit.title}
                              onChange={(e) => {
                                const newList = [...content.benefits.benefitsList];
                                newList[index] = { ...newList[index], title: e.target.value };
                                updateContent("benefits", { ...content.benefits, benefitsList: newList });
                              }}
                              className="w-full px-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {activeTab === "testimonials" && (
                  <div className="space-y-4">
                    {content.testimonials.testimonialsList.map((testimonial: any, index: number) => (
                      <div key={index} className="border border-gray-200 p-6 rounded-2xl">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input
                              type="text"
                              value={testimonial.name}
                              onChange={(e) => {
                                const newList = [...content.testimonials.testimonialsList];
                                newList[index].name = e.target.value;
                                updateContent("testimonials", { ...content.testimonials, testimonialsList: newList });
                              }}
                              className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                            <input
                              type="number"
                              min="1"
                              max="5"
                              value={testimonial.rating}
                              onChange={(e) => {
                                const newList = [...content.testimonials.testimonialsList];
                                newList[index].rating = parseInt(e.target.value);
                                updateContent("testimonials", { ...content.testimonials, testimonialsList: newList });
                              }}
                              className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial</label>
                          <textarea
                            value={testimonial.text}
                            onChange={(e) => {
                              const newList = [...content.testimonials.testimonialsList];
                              newList[index].text = e.target.value;
                              updateContent("testimonials", { ...content.testimonials, testimonialsList: newList });
                            }}
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "faqs" && (
                  <div className="space-y-4">
                    {content.faqs.faqList.map((faq: any, index: number) => (
                      <div key={index} className="border border-gray-200 p-6 rounded-2xl">
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => {
                              const newList = [...content.faqs.faqList];
                              newList[index].question = e.target.value;
                              updateContent("faqs", { ...content.faqs, faqList: newList });
                            }}
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                          <textarea
                            value={faq.answer}
                            onChange={(e) => {
                              const newList = [...content.faqs.faqList];
                              newList[index].answer = e.target.value;
                              updateContent("faqs", { ...content.faqs, faqList: newList });
                            }}
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "stores" && (
                  <div className="space-y-4">
                    {content.stores.storesList.map((store: any, index: number) => (
                      <div key={index} className="border border-gray-200 p-6 rounded-2xl">
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                          <input
                            type="text"
                            value={store.name}
                            onChange={(e) => {
                              const newList = [...content.stores.storesList];
                              newList[index].name = e.target.value;
                              updateContent("stores", { ...content.stores, storesList: newList });
                            }}
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                          <textarea
                            value={store.address}
                            onChange={(e) => {
                              const newList = [...content.stores.storesList];
                              newList[index].address = e.target.value;
                              updateContent("stores", { ...content.stores, storesList: newList });
                            }}
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                            rows={2}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                          <input
                            type="text"
                            value={store.city}
                            onChange={(e) => {
                              const newList = [...content.stores.storesList];
                              newList[index].city = e.target.value;
                              updateContent("stores", { ...content.stores, storesList: newList });
                            }}
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps Link</label>
                          <input
                            type="text"
                            value={store.mapsLink || ""}
                            onChange={(e) => {
                              const newList = [...content.stores.storesList];
                              newList[index].mapsLink = e.target.value;
                              updateContent("stores", { ...content.stores, storesList: newList });
                            }}
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                          <input
                            type="text"
                            value={store.contactNumber || ""}
                            onChange={(e) => {
                              const newList = [...content.stores.storesList];
                              newList[index].contactNumber = e.target.value;
                              updateContent("stores", { ...content.stores, storesList: newList });
                            }}
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Availability Status</label>
                          <select
                            value={store.availability || "In Stock"}
                            onChange={(e) => {
                              const newList = [...content.stores.storesList];
                              newList[index].availability = e.target.value;
                              updateContent("stores", { ...content.stores, storesList: newList });
                            }}
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                          >
                            <option>In Stock</option>
                            <option>Low Stock</option>
                            <option>Out of Stock</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Instructions</label>
                          <textarea
                            value={store.pickupInstructions || ""}
                            onChange={(e) => {
                              const newList = [...content.stores.storesList];
                              newList[index].pickupInstructions = e.target.value;
                              updateContent("stores", { ...content.stores, storesList: newList });
                            }}
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
                      <input
                        type="text"
                        value={content.settings.whatsappNumber}
                        onChange={(e) => updateContent("settings", { ...content.settings, whatsappNumber: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sticky CTA Text</label>
                      <input
                        type="text"
                        value={content.settings.stickyCtaText}
                        onChange={(e) => updateContent("settings", { ...content.settings, stickyCtaText: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
