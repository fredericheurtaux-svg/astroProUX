import { createBrowserRouter } from "react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { ClientLayout } from "./components/ClientLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./pages/Home";
import { Login } from "./pages/client/Login";
import { ClientDashboard } from "./pages/client/Dashboard";
import { AuditHeuristiqueList } from "./pages/client/AuditHeuristiqueList";
import { ProjectFindings } from "./pages/client/ProjectFindings";

// Lazy load non-critical pages
const About = lazy(() => import("./pages/About").then(m => ({ default: m.About })));
const Services = lazy(() => import("./pages/Services").then(m => ({ default: m.Services })));
const Methods = lazy(() => import("./pages/Methods").then(m => ({ default: m.Methods })));
const Contact = lazy(() => import("./pages/Contact").then(m => ({ default: m.Contact })));
const Appointment = lazy(() => import("./pages/Appointment").then(m => ({ default: m.Appointment })));
const CaseStudies = lazy(() => import("./pages/CaseStudies").then(m => ({ default: m.CaseStudies })));
const SNCFReseauRefonte = lazy(() => import("./pages/case-studies/SNCFReseauRefonte").then(m => ({ default: m.SNCFReseauRefonte })));
const AuchanOutilsMagasin = lazy(() => import("./pages/case-studies/AuchanOutilsMagasin").then(m => ({ default: m.AuchanOutilsMagasin })));
const SNCFReseauNomadeVigirail = lazy(() => import("./pages/case-studies/SNCFReseauNomadeVigirail").then(m => ({ default: m.SNCFReseauNomadeVigirail })));
const DrealComfluence = lazy(() => import("./pages/case-studies/DrealComfluence").then(m => ({ default: m.DrealComfluence })));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales").then(m => ({ default: m.default })));

const Theatronic = lazy(() => import("./pages/theatronic/Theatronic").then(m => ({ default: m.Theatronic })));

const TheatronicGalerie = lazy(() => import("./pages/theatronic/TheatronicGalerie").then(m => ({ default: m.TheatronicGalerie })));

const TheatronicMentions = lazy(() => import("./pages/theatronic/TheatronicMentions").then(m => ({ default: m.TheatronicMentions })));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-sm text-gray-500">Chargement...</div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { 
        path: "about", 
        Component: () => (
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        )
      },
      { 
        path: "services", 
        Component: () => (
          <Suspense fallback={<PageLoader />}>
            <Services />
          </Suspense>
        )
      },
      { 
        path: "methods", 
        Component: () => (
          <Suspense fallback={<PageLoader />}>
            <Methods />
          </Suspense>
        )
      },
      { 
        path: "contact", 
        Component: () => (
          <Suspense fallback={<PageLoader />}>
            <Contact />
          </Suspense>
        )
      },
      { 
        path: "appointment", 
        Component: () => (
          <Suspense fallback={<PageLoader />}>
            <Appointment />
          </Suspense>
        )
      },
      { 
        path: "case-studies", 
        Component: () => (
          <Suspense fallback={<PageLoader />}>
            <CaseStudies />
          </Suspense>
        )
      },
      { 
        path: "case-studies/sncf-reseau-refonte", 
        Component: () => (
          <Suspense fallback={<PageLoader />}>
            <SNCFReseauRefonte />
          </Suspense>
        )
      },
      { 
        path: "case-studies/auchan-outils-magasin", 
        Component: () => (
          <Suspense fallback={<PageLoader />}>
            <AuchanOutilsMagasin />
          </Suspense>
        )
      },
      { 
        path: "case-studies/sncf-reseau-nomade-vigirail", 
        Component: () => (
          <Suspense fallback={<PageLoader />}>
            <SNCFReseauNomadeVigirail />
          </Suspense>
        )
      },
      { 
        path: "case-studies/dreal-comfluence", 
        Component: () => (
          <Suspense fallback={<PageLoader />}>
            <DrealComfluence />
          </Suspense>
        )
      },
      { 
        path: "mentions-legales", 
        Component: () => (
          <Suspense fallback={<PageLoader />}>
            <MentionsLegales />
          </Suspense>
        )
      },
    ],
  },
  // Théâtronic - independent section (own header/footer)
  {
    path: "/theatronic",
    Component: () => (
      <Suspense fallback={<PageLoader />}>
        <Theatronic />
      </Suspense>
    ),
  },
  {
    path: "/theatronic/galerie",
    Component: () => (
      <Suspense fallback={<PageLoader />}>
        <TheatronicGalerie />
      </Suspense>
    ),
  },
  {
    path: "/theatronic/mentions-legales",
    Component: () => (
      <Suspense fallback={<PageLoader />}>
        <TheatronicMentions />
      </Suspense>
    ),
  },
  // Client space - login (no auth required)
  {
    path: "/client/login",
    Component: Login,
  },
  // Client space - protected routes
  {
    path: "/client",
    Component: () => (
      <ProtectedRoute>
        <ClientLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: ClientDashboard },
      { path: "audit-heuristique", Component: AuditHeuristiqueList },
      { path: "audit-heuristique/:projectId/findings", Component: ProjectFindings },
    ],
  },
]);