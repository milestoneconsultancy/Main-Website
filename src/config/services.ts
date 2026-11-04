import {
  Briefcase,
  Route,
  Building2,
  Building,
  Ruler,
  Receipt,
  CalendarClock,
  FileSignature,
  ShieldCheck,
  FolderKanban,
  HardHat,
  FileSearch,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  description: string;
}

export const services: Service[] = [
  // ============ NEW SERVICES (Top मध्ये) ============
  {
    slug: "prebid-engineering-services",
    title: "Prebid Engineering Services",
    icon: FileSearch,
    summary:
      "Comprehensive pre-bid engineering support including feasibility studies, technical due diligence, and cost estimation for competitive project proposals.",
    description:
      "Feasibility studies, cost estimation, technical due diligence, and bid preparation support for infrastructure, highway, and building projects. Our pre-bid engineering services help clients make informed bidding decisions with accurate quantity take-offs, risk assessment, and competitive proposal development aligned with tender requirements.",
  },
  {
    slug: "project-management-consultancy",
    title: "Project Management Consultancy",
    icon: Briefcase,
    summary:
      "Structured planning, disciplined execution, and rigorous monitoring across the full project lifecycle for infrastructure and building projects.",
    description:
      "End-to-end project management consultancy from inception through commissioning with structured planning, disciplined execution, and rigorous monitoring across the full project lifecycle. We provide comprehensive PMC services including project planning, scheduling, cost control, quality management, and stakeholder coordination for highway, infrastructure, and building projects.",
  },
  {
    slug: "construction-management",
    title: "Construction Management",
    icon: Wrench,
    summary:
      "End-to-end construction management including planning, quality control, safety oversight, and project execution from groundbreaking to handover.",
    description:
      "Comprehensive construction management services including project planning, coordination, quality control, safety oversight, and site execution from groundbreaking to handover. Our construction management team ensures timely delivery, budget compliance, and quality standards across residential, commercial, and industrial construction projects.",
  },

  // ============ EXISTING SERVICES ============
  {
    slug: "highway-engineering",
    title: "Highway Engineering",
    icon: Route,
    summary:
      "Geometric design, pavement engineering, drainage systems, and highway construction supervision for road infrastructure projects.",
    description:
      "Design review, quality supervision, and technical assurance for national and state highway works. Our highway engineering services include geometric design, pavement analysis, drainage systems, construction supervision, and quality control for road and bridge infrastructure projects across India.",
  },
  {
    slug: "infrastructure-consultancy",
    title: "Infrastructure Consultancy",
    icon: Building2,
    summary:
      "Independent engineering advisory for roads, bridges, urban infrastructure, and public works projects across the project lifecycle.",
    description:
      "Independent engineering advice for concept development, feasibility studies, detailed design, and project delivery of infrastructure assets. Our infrastructure consultancy services support government and private clients with technical due diligence, project planning, and quality assurance for urban and regional infrastructure development.",
  },
  {
    slug: "building-consultancy",
    title: "Building Consultancy",
    icon: Building,
    summary:
      "Technical consultancy for residential, commercial, institutional, and industrial building construction projects.",
    description:
      "Design coordination, execution planning, and construction supervision for building projects. Our building consultancy services cover residential complexes, commercial buildings, institutional facilities, and industrial structures with a focus on quality control, project monitoring, and timely delivery.",
  },
  {
    slug: "quantity-surveying",
    title: "Quantity Surveying",
    icon: Ruler,
    summary:
      "Accurate measurement, cost estimation, cost control, and commercial management for construction and infrastructure projects.",
    description:
      "BOQ preparation, quantity take-offs, cost estimation, and value engineering to protect project economics. Our quantity surveying services provide accurate measurement, cost planning, tender documentation, and commercial management across the project lifecycle for highway, infrastructure, and building projects.",
  },
  {
    slug: "billing-engineering",
    title: "Billing Engineering",
    icon: Receipt,
    summary:
      "Contractor billing, RA bills, joint measurement, reconciliation, and transparent billing workflows aligned with contract conditions.",
    description:
      "Transparent billing workflows aligned with contract conditions and measurement standards. Our billing engineering services include contractor billing, running account bills, joint measurement, reconciliation, and payment certification for highway, infrastructure, and building projects.",
  },
  {
    slug: "planning-scheduling",
    title: "Planning & Scheduling",
    icon: CalendarClock,
    summary:
      "Baseline schedules, look-ahead planning, progress analytics, delay analysis, and recovery planning using Primavera and MS Project.",
    description:
      "Primavera and MS Project based scheduling, delay analysis, and recovery planning. Our planning and scheduling services include baseline schedule development, progress monitoring, critical path analysis, and recovery planning for infrastructure, highway, and building projects.",
  },
  {
    slug: "contract-management",
    title: "Contract Management",
    icon: FileSignature,
    summary:
      "FIDIC and Indian contract administration, correspondence, variation orders, claim management, and dispute avoidance support.",
    description:
      "Contract compliance, correspondence, variation orders, and dispute avoidance support. Our contract management services cover FIDIC and Indian contract administration, claim management, and dispute resolution for highway, infrastructure, and building projects.",
  },
  {
    slug: "qa-qc",
    title: "QA / QC",
    icon: ShieldCheck,
    summary:
      "Independent quality assurance and quality control frameworks including method statements, ITPs, checklists, and third-party inspection.",
    description:
      "Method statements, ITPs, checklists, and third-party inspection frameworks. Our quality assurance and quality control services ensure compliance with Indian and international standards through independent inspection, testing, and documentation for highway, infrastructure, and building projects.",
  },
  {
    slug: "documentation",
    title: "Documentation",
    icon: FolderKanban,
    summary:
      "Structured project documentation including DPRs, MPRs, site records, and audit-ready project record keeping.",
    description:
      "Daily, weekly, and monthly reporting with audit-ready project record keeping. Our documentation services include detailed project reports, progress reports, site records, and comprehensive documentation management for infrastructure, highway, and building projects.",
  },
  {
    slug: "site-coordination",
    title: "Site Coordination",
    icon: HardHat,
    summary:
      "Resident engineering, multi-agency site coordination, supervision, safety oversight, and stakeholder management.",
    description:
      "Supervision teams, safety oversight, and coordination across owner, contractor, and stakeholders. Our site coordination services provide resident engineering, multi-agency coordination, and construction supervision for highway, infrastructure, and building projects across India.",
  },
];
