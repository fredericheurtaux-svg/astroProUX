import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { TheatronicShell } from "./TheatronicShell";
import { ExampleCard } from "./ExampleCard";
import { examples, gallery } from "./data";

export function TheatronicGalerie() {
  return (
    <TheatronicShell title="Galerie">
      <main className="max-w-6xl mx-auto px-6 py-16">
        <Link to="/theatronic" className="inline-flex items-center gap-2 text-sm font-bold text-[#546075] hover:text-[#f26430] mb-8">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Retour à Théâtronic
        </Link>
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">Galerie</h1>
        <p className="text-[#546075] mb-14">Photos, vidéos et histoires créées lors des ateliers Théâtronic.</p>

        <section aria-labelledby="photos" className="mb-20">
          <h2 id="photos" className="text-2xl font-extrabold mb-6">Photos</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((g) => (
              <li key={g.src}>
                <figure>
                  <img src={g.src} alt={g.alt} loading="lazy" className="w-full aspect-[4/3] object-cover rounded-2xl border border-[#eddacf]" />
                  <figcaption className="mt-2 text-sm text-[#546075]">{g.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="histoires">
          <h2 id="histoires" className="text-2xl font-extrabold mb-8">Vidéos et histoires</h2>
          <div className="grid gap-12">
            {examples.map((ex) => (
              <ExampleCard key={ex.videoId} ex={ex} />
            ))}
          </div>
        </section>
      </main>
    </TheatronicShell>
  );
}
