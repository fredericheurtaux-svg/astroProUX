import type { Example } from "./data";

export function ExampleCard({ ex }: { ex: Example }) {
  return (
    <article className="grid md:grid-cols-2 gap-6 lg:gap-8 items-start">
      <div className="aspect-video rounded-2xl overflow-hidden bg-[#162238] shadow-lg">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${ex.videoId}`}
          title={ex.title}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div>
        <h3 className="text-xl font-extrabold mb-2">{ex.title}</h3>
        <p className="text-[#546075]">{ex.context}</p>
        {ex.story && <p className="mt-4">{ex.story}</p>}
      </div>
    </article>
  );
}
