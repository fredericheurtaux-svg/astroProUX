import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Methods } from "./pages/Methods";
import { Contact } from "./pages/Contact";
import { Appointment } from "./pages/Appointment";
import { CaseStudies } from "./pages/CaseStudies";
import { SNCFReseauRefonte } from "./pages/case-studies/SNCFReseauRefonte";
import { AuchanOutilsMagasin } from "./pages/case-studies/AuchanOutilsMagasin";
import { SNCFReseauNomadeVigirail } from "./pages/case-studies/SNCFReseauNomadeVigirail";
import { DrealComfluence } from "./pages/case-studies/DrealComfluence";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "methods", Component: Methods },
      { path: "contact", Component: Contact },
      { path: "appointment", Component: Appointment },
      { path: "case-studies", Component: CaseStudies },
      { path: "case-studies/sncf-reseau-refonte", Component: SNCFReseauRefonte },
      { path: "case-studies/auchan-outils-magasin", Component: AuchanOutilsMagasin },
      { path: "case-studies/sncf-reseau-nomade-vigirail", Component: SNCFReseauNomadeVigirail },
      { path: "case-studies/dreal-comfluence", Component: DrealComfluence },
    ],
  },
]);