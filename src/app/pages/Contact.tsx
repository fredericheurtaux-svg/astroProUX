import { useState } from "react";
import { Mail, Phone, Linkedin, Send, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to a backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl mb-6 text-gray-900">
            Contact
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Une question sur vos besoins ? Un projet à discuter ? N'hésitez pas à me contacter. 
            Je réponds généralement sous 24h.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl mb-6 text-gray-900">
                  Coordonnées
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <a href="mailto:frederic.pro[@]heurtaux.me" className="text-gray-900 hover:underline">
                        frederic.pro[@]heurtaux.me
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Téléphone</p>
                      <a href="tel:+33612345678" className="text-gray-900 hover:underline">
                        +33 6 12 34 56 78
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <Linkedin className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">LinkedIn</p>
                      <a 
                        href="https://linkedin.com/in/fredericheurtaux" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-900 hover:underline"
                      >
                        Frédéric Heurtaux
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-lg mb-4 text-gray-900">Disponibilité</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Actuellement disponible 3j/sem pour de nouveaux projets.
                </p>
                <Link
                  to="/appointment"
                  className="inline-flex items-center gap-2 text-gray-900 hover:gap-3 transition-all"
                >
                  Voir mes disponibilités
                  <Send className="w-4 h-4" />
                </Link>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-lg mb-4 text-gray-900">Localisation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Paris et Île-de-France<br />
                  Interventions à distance possibles<br />
                  Déplacements en région selon projets
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50 p-8 md:p-10 rounded border border-gray-200">
              <h2 className="text-xl mb-2 text-gray-900">
                Envoyez-moi un message
              </h2>
              <p className="text-gray-600 mb-8">
                Décrivez-moi brièvement votre projet ou vos besoins, je reviendrai vers vous rapidement.
              </p>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl mb-2 text-gray-900">Message envoyé</h3>
                  <p className="text-gray-600">
                    Merci pour votre message. Je vous répondrai dans les 24h.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm mb-2 text-gray-700">
                        Nom et prénom *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm mb-2 text-gray-700">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm mb-2 text-gray-700">
                        Entreprise
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm mb-2 text-gray-700">
                      Votre message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none bg-white"
                      placeholder="Présentez-moi votre projet, vos besoins, votre contexte..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    Envoyer le message
                    <Send className="w-4 h-4" />
                  </button>

                  <p className="text-sm text-gray-500">
                    * Champs obligatoires
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}