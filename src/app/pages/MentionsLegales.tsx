import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function MentionsLegales() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Mentions légales</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Éditeur du site</h2>
        <p>
          Frédéric Heurtaux<br />
          31 rue de Fourmentel<br />
          59800 Lille<br />
          Email : frederic.pro[@]heurtaux.me
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Hébergement</h2>
        <p>
          Infomaniak Network SA<br />
          Rue Eugène-Marziano 25<br />
          1227 Genève - Suisse<br />
          www.infomaniak.com
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus (textes, images, graphismes, logo, icônes, etc.) présents sur ce site sont la propriété exclusive de Frédéric Heurtaux, sauf mention contraire. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Données personnelles</h2>
        <p>
          Les informations recueillies via les formulaires sont destinées uniquement à la prise de contact et ne sont jamais transmises à des tiers. Conformément à la loi « Informatique et Libertés », vous pouvez exercer votre droit d'accès, de rectification ou de suppression des données vous concernant en envoyant un email à l'adresse ci-dessus.
          Elle ne sont pas stockées dans des bases de données, mais uniquement transmises par email.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Responsabilité</h2>
        <p>
          L'éditeur du site ne saurait être tenu responsable des dommages directs ou indirects causés au matériel de l'utilisateur lors de l'accès au site, ni des éventuelles erreurs ou omissions dans les contenus.
        </p>
      </section>
    </div>
  );
}
