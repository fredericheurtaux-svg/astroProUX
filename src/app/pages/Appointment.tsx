import { useState } from "react";
import { Calendar, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function Appointment() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    timeSlot: "",
    message: "",
  });

  const projectTypes = [
    "Recherche utilisateur",
    "Cadrage de projet",
    "Conception d'interface",
    "Audit UX",
    "Accompagnement long terme",
    "Autre / À définir"
  ];

  const timeSlots = [
    { day: "Lundi 31 mars", slots: ["10h - 11h", "14h - 15h", "16h - 17h"] },
    { day: "Mardi 1er avril", slots: ["9h - 10h", "11h - 12h", "15h - 16h"] },
    { day: "Mercredi 2 avril", slots: ["10h - 11h", "14h - 15h"] },
    { day: "Jeudi 3 avril", slots: ["9h - 10h", "14h - 15h", "16h - 17h"] },
    { day: "Vendredi 4 avril", slots: ["10h - 11h", "11h - 12h"] },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to a backend
    setStep(3);
  };

  const canProceedToStep2 = formData.name && formData.email && formData.projectType;

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl mb-6 text-gray-900">
            Prendre rendez-vous
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Réservez un créneau pour un premier échange de 30 minutes, gratuit et sans engagement. 
            L'occasion de faire connaissance et de discuter de votre projet.
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step >= 1 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
            </div>
            <span className="hidden md:inline text-sm text-gray-600">Vos informations</span>
          </div>
          <div className="w-8 md:w-16 h-0.5 bg-gray-200" />
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step >= 2 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > 2 ? <CheckCircle2 className="w-5 h-5" /> : '2'}
            </div>
            <span className="hidden md:inline text-sm text-gray-600">Choix du créneau</span>
          </div>
          <div className="w-8 md:w-16 h-0.5 bg-gray-200" />
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step >= 3 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              3
            </div>
            <span className="hidden md:inline text-sm text-gray-600">Confirmation</span>
          </div>
        </div>
      </section>

      {/* Form Steps */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 pb-20">
        {step === 1 && (
          <div className="bg-gray-50 p-8 md:p-10 rounded border border-gray-200">
            <h2 className="text-2xl mb-6 text-gray-900">
              Parlez-moi de vous
            </h2>
            
            <form className="space-y-6">
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
                <label htmlFor="projectType" className="block text-sm mb-2 text-gray-700">
                  Type de projet *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                >
                  <option value="">Sélectionnez un type de projet</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2 text-gray-700">
                  Votre projet en quelques mots
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none bg-white"
                  placeholder="Contexte, objectifs, besoins identifiés..."
                />
              </div>

              <button
                type="button"
                onClick={() => canProceedToStep2 && setStep(2)}
                disabled={!canProceedToStep2}
                className={`w-full px-6 py-3 rounded flex items-center justify-center gap-2 transition-colors ${
                  canProceedToStep2
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Choisir un créneau
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gray-50 p-8 md:p-10 rounded border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-900">
                Choisissez un créneau
              </h2>
              <button
                onClick={() => setStep(1)}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Retour
              </button>
            </div>

            <div className="mb-8 p-4 bg-white rounded border border-gray-200">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Entretien de 30 minutes en visioconférence (lien envoyé par email)</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {timeSlots.map((day, dayIndex) => (
                  <div key={dayIndex}>
                    <h3 className="text-sm mb-3 text-gray-700">{day.day}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {day.slots.map((slot, slotIndex) => {
                        const slotValue = `${day.day} - ${slot}`;
                        return (
                          <label
                            key={slotIndex}
                            className={`p-3 border rounded cursor-pointer transition-all text-center text-sm ${
                              formData.timeSlot === slotValue
                                ? 'border-gray-900 bg-gray-900 text-white'
                                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                            }`}
                          >
                            <input
                              type="radio"
                              name="timeSlot"
                              value={slotValue}
                              checked={formData.timeSlot === slotValue}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            {slot}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={!formData.timeSlot}
                className={`w-full px-6 py-3 rounded flex items-center justify-center gap-2 transition-colors ${
                  formData.timeSlot
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Confirmer le rendez-vous
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="bg-gray-50 p-8 md:p-10 rounded border border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl mb-4 text-gray-900">
                Rendez-vous confirmé
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Merci {formData.name} ! Un email de confirmation avec le lien de visioconférence vous a été envoyé à <strong className="text-gray-900">{formData.email}</strong>.
              </p>

              <div className="bg-white p-6 rounded border border-gray-200 mb-8 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-gray-700" />
                  <h3 className="text-lg text-gray-900">Votre rendez-vous</h3>
                </div>
                <p className="text-gray-700 mb-2">{formData.timeSlot}</p>
                <p className="text-sm text-gray-600">Durée : 30 minutes</p>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Vous recevrez un rappel 24h avant le rendez-vous.
                </p>
                <p className="text-sm text-gray-600">
                  Besoin de modifier ou annuler ? Répondez simplement à l'email de confirmation.
                </p>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
                >
                  Retour à l'accueil
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-900 rounded hover:bg-gray-50 transition-colors"
                >
                  Découvrir mes services
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Info Section */}
      {step < 3 && (
        <section className="bg-gray-100 py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <h3 className="text-xl mb-6 text-gray-900 text-center">
              À quoi s'attendre lors de cet entretien ?
            </h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg text-gray-900">1</span>
                </div>
                <p className="text-gray-700">
                  Vous me présentez votre projet et vos enjeux
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg text-gray-900">2</span>
                </div>
                <p className="text-gray-700">
                  J'identifie comment je peux vous aider
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg text-gray-900">3</span>
                </div>
                <p className="text-gray-700">
                  On décide ensemble de la suite
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
