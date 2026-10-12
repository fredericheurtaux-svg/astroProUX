import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { TheatronicShell } from "./TheatronicShell";
import { MentionsLegalesContent } from "../MentionsLegales";

export function TheatronicMentions() {
  return (
    <TheatronicShell title="Mentions légales">
      <main className="max-w-3xl mx-auto px-6 pt-12">
        <Link to="/theatronic" className="inline-flex items-center gap-2 text-sm font-bold text-[#546075] hover:text-[#f26430]">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Retour à Théâtronic
        </Link>
        <MentionsLegalesContent className="py-10" />
      </main>
    </TheatronicShell>
  );
}
