// src/config/careers.ts

export type JobStatus = "ACTIVE" | "CLOSED" | "DRAFT";

export type JobDepartment = string;

export interface CareerMasterItem {
  id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface CareerMasters {
  departments: CareerMasterItem[];
  designations: CareerMasterItem[];
  locations: CareerMasterItem[];
}

export const initialMasters: CareerMasters = {
  departments: [
    { id: "dept-1", name: "Engineering", status: "ACTIVE" },
    { id: "dept-2", name: "Site", status: "ACTIVE" },
    { id: "dept-3", name: "Quality", status: "ACTIVE" },
    { id: "dept-4", name: "Accounts", status: "ACTIVE" },
    { id: "dept-5", name: "Management", status: "ACTIVE" },
  ],
  designations: [
    { id: "desig-1", name: "Quality Engineer", status: "ACTIVE" },
    { id: "desig-2", name: "Junior Engineer (Civil)", status: "ACTIVE" },
    { id: "desig-3", name: "Highway Design Engineer", status: "ACTIVE" },
    { id: "desig-4", name: "Accountant", status: "ACTIVE" },
    { id: "desig-5", name: "Site Engineer", status: "ACTIVE" },
    { id: "desig-6", name: "Project Manager", status: "ACTIVE" },
    { id: "desig-7", name: "Billing & Quantity Surveyor", status: "ACTIVE" },
  ],
  locations: [
    { id: "loc-1", name: "Pune Head Office", status: "ACTIVE" },
    { id: "loc-2", name: "Nashik Site Office", status: "ACTIVE" },
    { id: "loc-3", name: "Mumbai Project Office", status: "ACTIVE" },
    { id: "loc-4", name: "Nagpur Site Office", status: "ACTIVE" },
    { id: "loc-5", name: "Chhatrapati Sambhajinagar", status: "ACTIVE" },
  ],
};

export interface Job {
  id: string;
  title: string;
  slug: string;
  status: JobStatus;
  department: JobDepartment;
  location: string;
  experience: string;
  employmentType: string;
  skills: string[];
  postedDate: string;
  deadline?: string;
  salary?: string;
  featured?: boolean;
  shortDescription: string;
  jobDescription: string;
  responsibilities: string[];
  qualifications: string;
  requiredExperience: string;
  preferredSkills: string[];
  otherInformation?: string;
  heroImage?: string;
  createdAt: string;
  updatedAt: string;
}

export type ApplicationStatus =
  "NEW" | "UNDER REVIEW" | "SHORTLISTED" | "INTERVIEW" | "SELECTED" | "REJECTED";

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  jobSlug: string;
  fullName: string;
  mobile: string;
  email: string;
  currentLocation?: string;
  totalExperience: string;
  currentCompany?: string;
  resumeFileName: string;
  resumeFileSize?: number;
  additionalMessage?: string;
  status: ApplicationStatus;
  submittedAt: string;
}

export const initialJobs: Job[] = [
  {
    id: "job-001",
    title: "Quality Engineer",
    slug: "quality-engineer",
    status: "ACTIVE",
    department: "Quality",
    location: "Nashik, Maharashtra",
    experience: "4+ Years",
    employmentType: "Full Time",
    skills: ["DLC", "PQC", "Asphalt", "Bitumen", "Mix Design", "Quality Control", "Lab Testing"],
    postedDate: "05 Oct 2026",
    deadline: "31 Dec 2026",
    salary: "₹45,000 - ₹65,000 / month",
    featured: true,
    shortDescription:
      "Lead quality assurance, mix design verification, and field testing for major highway and white topping infrastructure packages in Maharashtra.",
    jobDescription:
      "We are looking for a detail-oriented Quality Engineer to join our team. You will be responsible for ensuring quality standards across construction and infrastructure projects, including road works, concrete structures, and associated materials.",
    responsibilities: [
      "Monitor and ensure quality control on-site and in laboratory testing",
      "Supervise DLC, PQC, asphalt and bitumen works in accordance with MoRTH and IRC standards",
      "Coordinate with site engineers and project managers on material approval and mix designs",
      "Maintain quality records, pour cards, cube testing registers, and documentation",
      "Ensure compliance with relevant IS codes, MoRTH specifications, and client QA/QC manual",
      "Conduct field material testing and review third-party laboratory test reports",
    ],
    qualifications: "Diploma / B.E. / B.Tech in Civil Engineering",
    requiredExperience:
      "Minimum 4+ years of quality engineering experience in road, highway, or pavement infrastructure projects",
    preferredSkills: [
      "DLC, PQC, Asphalt, Bitumen, Mix Design, MoRTH Specifications, IS Codes, QA/QC Documentation",
      "Cube compression testing, core extraction, bitumen penetration and viscosity testing",
      "Client liaison with municipal corporations and state public works departments",
    ],
    otherInformation:
      "The role requires regular site visits across project packages in Nashik and Mumbai Metropolitan Region.",
    createdAt: "2026-10-05T00:00:00.000Z",
    updatedAt: "2026-10-05T00:00:00.000Z",
  },
  {
    id: "job-002",
    title: "Site Engineer",
    slug: "site-engineer",
    status: "ACTIVE",
    department: "Site",
    location: "Nashik, Maharashtra",
    experience: "2+ Years",
    employmentType: "Full Time",
    skills: [
      "Site Execution",
      "AutoCAD",
      "Survey Verification",
      "Contract Compliance",
      "Billing Support",
    ],
    postedDate: "03 Oct 2026",
    deadline: "15 Dec 2026",
    salary: "₹30,000 - ₹45,000 / month",
    featured: true,
    shortDescription:
      "Manage day-to-day site execution, contractor supervision, levels, and progress monitoring for urban corridor development.",
    jobDescription:
      "Milestone Consultancy is seeking a dedicated Site Engineer to oversee field execution across active road development and corridor enhancement projects in Nashik. The candidate will coordinate contractors, verify levels, and ensure adherence to contract drawings.",
    responsibilities: [
      "Supervise daily construction activities on site ensuring strict adherence to approved drawings",
      "Direct contractor labour and plant deployment to meet weekly project milestones",
      "Conduct level checking, alignment verification, and coordinate with surveying teams",
      "Prepare daily progress reports (DPR), site measurement sheets, and hindrances records",
      "Ensure safety measures and traffic management plans are strictly followed on active corridors",
      "Liaise with utility agencies for water pipeline and electrical line shifting",
    ],
    qualifications: "Diploma / B.E. in Civil Engineering",
    requiredExperience:
      "Minimum 2+ years of field execution experience in road, drainage, or earthwork construction",
    preferredSkills: [
      "Ensure compliance with contract management",
      "AutoCAD drawing interpretation and site layout marking",
      "Level instrument handling and total station data coordination",
      "Subgrade, GSB, WMM, and concrete pavement laying",
    ],
    otherInformation:
      "Working hours align with active construction site shifts. Accommodation/travel allowance provided for outstation candidates.",
    createdAt: "2026-10-03T00:00:00.000Z",
    updatedAt: "2026-10-03T00:00:00.000Z",
  },
  {
    id: "job-003",
    title: "Lab Technician",
    slug: "lab-technician",
    status: "ACTIVE",
    department: "Quality",
    location: "Nashik, Maharashtra",
    experience: "1+ Years",
    employmentType: "Full Time",
    skills: [
      "Soil Testing",
      "Aggregate Testing",
      "Concrete Testing",
      "Bitumen Testing",
      "Field Density",
    ],
    postedDate: "01 Oct 2026",
    deadline: "31 Dec 2026",
    salary: "₹20,000 - ₹30,000 / month",
    featured: false,
    shortDescription:
      "Perform soil testing, aggregate gradation, concrete compressive strength, and bituminous testing in project field laboratories.",
    jobDescription:
      "We are looking for a qualified Civil Engineering Lab Technician to perform routine and specialized testing on construction materials at our site testing facility in Nashik.",
    responsibilities: [
      "Perform sampling and laboratory testing of soils, aggregates, cement, and bitumen",
      "Conduct field dry density tests using Core Cutter and Sand Replacement methods",
      "Cast concrete cubes, monitor curing tanks, and execute compressive strength testing",
      "Maintain calibration logs of testing apparatus, sieves, and compression testing machines",
      "Prepare timely test certificates and reports for Quality Engineer certification",
    ],
    qualifications: "Diploma in Civil Engineering / B.Sc / ITI Lab Assistant",
    requiredExperience:
      "Minimum 1+ years experience in a civil materials testing laboratory or site testing facility",
    preferredSkills: [
      "Soil Testing, Aggregate Testing, Concrete Testing, MoRTH lab registers",
      "Sieve analysis, Flakiness & Elongation index, Impact value, Los Angeles abrasion",
      "Standard Proctor Compaction, California Bearing Ratio (CBR)",
    ],
    otherInformation: "Immediate joiners preferred.",
    createdAt: "2026-10-01T00:00:00.000Z",
    updatedAt: "2026-10-01T00:00:00.000Z",
  },
  {
    id: "job-004",
    title: "Accounts Executive",
    slug: "accounts-executive",
    status: "CLOSED",
    department: "Accounts",
    location: "Nashik, Maharashtra",
    experience: "2+ Years",
    employmentType: "Full Time",
    skills: ["Tally Prime", "GST Compliance", "Invoicing", "ERP", "Vendor Reconciliation"],
    postedDate: "25 Sep 2026",
    deadline: "15 Oct 2026",
    salary: "₹25,000 - ₹35,000 / month",
    featured: false,
    shortDescription:
      "Handle project billing accounts, GST filings, contractor bookkeeping, and vendor reconciliations.",
    jobDescription:
      "Milestone Consultancy required an Accounts Executive to manage project-level accounting, billing verifications, TDS/GST compliance, and vendor payments for infrastructure consulting assignments.",
    responsibilities: [
      "Maintain day-to-day accounting entries in Tally Prime",
      "Verify contractor interim payment certificates (IPC) and supplier invoices",
      "Prepare GST returns (GSTR-1, GSTR-3B) and reconcile input tax credits",
      "Process staff payroll, site expense reimbursements, and bank reconciliations",
    ],
    qualifications: "B.Com / M.Com / Inter CA",
    requiredExperience: "2+ years in construction consultancy or contractor accounts management",
    preferredSkills: ["Tally Prime, GST, TDS, Invoicing, ERP, MS Excel"],
    otherInformation: "This vacancy is currently closed. Thank you to all applicants.",
    createdAt: "2026-09-25T00:00:00.000Z",
    updatedAt: "2026-09-25T00:00:00.000Z",
  },
  {
    id: "job-005",
    title: "Senior Highway Project Manager",
    slug: "senior-highway-project-manager",
    status: "ACTIVE",
    department: "Management",
    location: "Kalyan / MMR, Maharashtra",
    experience: "8+ Years",
    employmentType: "Full Time",
    skills: [
      "PMC Supervision",
      "FIDIC Contracts",
      "Project Planning",
      "Client Coordination",
      "Team Leadership",
    ],
    postedDate: "04 Oct 2026",
    deadline: "15 Jan 2027",
    salary: "₹80,000 - ₹1,20,000 / month",
    featured: true,
    shortDescription:
      "Lead Project Management Consultancy (PMC) assignments for major urban road and white topping packages.",
    jobDescription:
      "We are seeking an experienced Senior Highway Project Manager to lead our multidisciplinary engineering team on state and municipal infrastructure assignments across Maharashtra.",
    responsibilities: [
      "Provide executive leadership for PMC assignments, monitoring progress against master schedules",
      "Liaise with municipal commissioners, chief engineers, and administrative stakeholders",
      "Administer FIDIC and Indian standard contracts, variation orders, and claims reviews",
      "Ensure multi-package site coordination, safety compliance, and quality auditing",
      "Lead milestone review meetings and present executive status reports",
    ],
    qualifications: "B.E. / B.Tech / M.Tech in Civil Engineering (PMP / NICMAR preferred)",
    requiredExperience: "8+ years in highway / urban road execution or PMC supervision",
    preferredSkills: [
      "FIDIC, MS Project / Primavera P6, Highway Design, Client Relationship Management",
      "White topping and major pavement rehabilitation expertise",
    ],
    otherInformation: "Senior leadership position reporting directly to the Director.",
    createdAt: "2026-10-04T00:00:00.000Z",
    updatedAt: "2026-10-04T00:00:00.000Z",
  },
];

export function getInitialJobs(): Job[] {
  return initialJobs;
}

export function getJobBySlug(slug: string, jobsList: Job[]): Job | undefined {
  return jobsList.find((j) => j.slug.toLowerCase() === slug.toLowerCase());
}

export function getPublicActiveJobs(jobsList: Job[] = initialJobs): Job[] {
  return jobsList.filter((j) => j.status === "ACTIVE");
}

export function createJobPostingSchema(job: Job) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.jobDescription,
    datePosted: Number.isFinite(Date.parse(job.postedDate))
      ? new Date(job.postedDate).toISOString().slice(0, 10)
      : undefined,
    validThrough:
      job.deadline && Number.isFinite(Date.parse(job.deadline))
        ? new Date(job.deadline).toISOString().slice(0, 10) + "T23:59:59+05:30"
        : undefined,
    employmentType: (
      {
        "Full Time": "FULL_TIME",
        "Part Time": "PART_TIME",
        Contract: "CONTRACTOR",
        Internship: "INTERN",
        Temporary: "TEMPORARY",
        Volunteer: "VOLUNTEER",
      } as Record<string, string>
    )[job.employmentType],
    hiringOrganization: {
      "@type": "Organization",
      name: "Milestone Consultancy",
      sameAs: "https://milestoneconsultancy.in",
      logo: "https://milestoneconsultancy.in/milestone-logo.jpeg",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location.split(",")[0].trim(),
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    },
    // Salary stays in visible copy; omit structured salary until a numeric range is explicitly supplied.
  };
}
