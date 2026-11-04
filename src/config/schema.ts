import { company } from "@/config/company";

export type JsonLd = Record<string, unknown>;

export const siteUrl = "https://milestoneconsultancy.in";
export const siteLogo = `${siteUrl}/milestone-logo.jpeg`;

const organizationId = `${siteUrl}#organization`;
const websiteId = `${siteUrl}#website`;

const organizationDescription =
  "Milestone Consultancy is a project management consultancy and engineering consultancy firm in Kalyan, Maharashtra, providing civil engineering, construction management, highway engineering, infrastructure consultancy, and quality assurance services for government and private projects across the Mumbai Metropolitan Region.";

export const organizationSchema: JsonLd = {
  "@type": "ProfessionalService",
  "@id": organizationId,
  name: company.name,
  alternateName: company.legalName,
  description: organizationDescription,
  url: siteUrl,

  logo: {
    "@type": "ImageObject",
    "@id": `${siteUrl}#logo`,
    url: siteLogo,
    contentUrl: siteLogo,
    width: 1200,
    height: 630,
    caption: `${company.name} Logo`,
  },

  image: {
    "@id": `${siteUrl}#logo`,
  },

  telephone: company.contact.phone,
  email: company.contact.email,

  address: {
    "@type": "PostalAddress",
    addressLocality: "Kalyan West",
    addressRegion: "Maharashtra",
    postalCode: "421301",
    addressCountry: "IN",
  },

  areaServed: [
    {
      "@type": "City",
      name: "Kalyan",
    },
    {
      "@type": "City",
      name: "Thane",
    },
    {
      "@type": "State",
      name: "Maharashtra",
    },
    {
      "@type": "AdministrativeArea",
      name: "Mumbai Metropolitan Region",
    },
  ],

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:30",
      closes: "18:30",
    },
  ],
};

export const websiteSchema: JsonLd = {
  "@type": "WebSite",
  "@id": websiteId,
  url: siteUrl,
  name: company.name,
  description: organizationDescription,
  publisher: {
    "@id": organizationId,
  },
  inLanguage: "en-IN",
};

export const serviceSchemas: JsonLd[] = [
  {
    "@type": "Service",
    "@id": `${siteUrl}/services#prebid-engineering`,
    name: "Prebid Engineering Services",
    serviceType: "Prebid Engineering",
    description:
      "Feasibility studies, cost estimation, technical due diligence, and bid preparation support for infrastructure, highway, and building projects.",
    provider: {
      "@id": organizationId,
    },
    areaServed: {
      "@type": "State",
      name: "Maharashtra",
    },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/services#pmc`,
    name: "Project Management Consultancy",
    serviceType: "Project Management Consultancy",
    description:
      "End-to-end project management consultancy from inception through commissioning with structured planning, disciplined execution, and rigorous monitoring across the full project lifecycle.",
    provider: {
      "@id": organizationId,
    },
    areaServed: {
      "@type": "State",
      name: "Maharashtra",
    },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/services#construction-management`,
    name: "Construction Management",
    serviceType: "Construction Management",
    description:
      "Comprehensive construction management services including project planning, coordination, quality control, safety oversight, and site execution from groundbreaking to handover.",
    provider: {
      "@id": organizationId,
    },
    areaServed: {
      "@type": "State",
      name: "Maharashtra",
    },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/services#highway-engineering`,
    name: "Highway Engineering",
    serviceType: "Highway Engineering",
    description:
      "Design review, quality supervision, and technical assurance for highway works, including geometric design, pavement analysis, drainage systems, and construction supervision.",
    provider: {
      "@id": organizationId,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/services#infrastructure-consultancy`,
    name: "Infrastructure Consultancy",
    serviceType: "Infrastructure Consultancy",
    description:
      "Independent engineering advice for concept development, feasibility studies, detailed design, and project delivery of infrastructure assets.",
    provider: {
      "@id": organizationId,
    },
    areaServed: {
      "@type": "State",
      name: "Maharashtra",
    },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/services#building-consultancy`,
    name: "Building Consultancy",
    serviceType: "Building Consultancy",
    description:
      "Design coordination, execution planning, and construction supervision for residential, commercial, institutional, and industrial building projects.",
    provider: {
      "@id": organizationId,
    },
    areaServed: {
      "@type": "State",
      name: "Maharashtra",
    },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/services#quantity-surveying`,
    name: "Quantity Surveying",
    serviceType: "Quantity Surveying",
    description:
      "BOQ preparation, quantity take-offs, cost estimation, and value engineering to protect project economics.",
    provider: {
      "@id": organizationId,
    },
    areaServed: {
      "@type": "State",
      name: "Maharashtra",
    },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/services#billing-engineering`,
    name: "Billing Engineering",
    serviceType: "Billing Engineering",
    description:
      "Transparent billing workflows aligned with contract conditions, including contractor billing, running account bills, joint measurement, and payment certification.",
    provider: {
      "@id": organizationId,
    },
    areaServed: {
      "@type": "State",
      name: "Maharashtra",
    },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/services#planning-scheduling`,
    name: "Planning & Scheduling",
    serviceType: "Planning and Scheduling",
    description:
      "Project scheduling, delay analysis, recovery planning, baseline schedule development, and critical path analysis.",
    provider: {
      "@id": organizationId,
    },
    areaServed: {
      "@type": "State",
      name: "Maharashtra",
    },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/services#contract-management`,
    name: "Contract Management",
    serviceType: "Contract Management",
    description:
      "Contract compliance, correspondence, variation orders, and dispute avoidance support for construction and infrastructure contracts.",
    provider: {
      "@id": organizationId,
    },
    areaServed: {
      "@type": "State",
      name: "Maharashtra",
    },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/services#qa-qc`,
    name: "QA / QC",
    serviceType: "Quality Assurance and Quality Control",
    description:
      "Method statements, ITPs, checklists, and inspection frameworks supporting compliance with applicable engineering and construction standards.",
    provider: {
      "@id": organizationId,
    },
    areaServed: {
      "@type": "State",
      name: "Maharashtra",
    },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/services#site-coordination`,
    name: "Site Coordination",
    serviceType: "Site Coordination",
    description:
      "Site supervision, safety oversight, and coordination across owners, contractors, engineers, and project stakeholders.",
    provider: {
      "@id": organizationId,
    },
    areaServed: {
      "@type": "State",
      name: "Maharashtra",
    },
  },
];

export const offerCatalogSchema: JsonLd = {
  "@type": "OfferCatalog",
  "@id": `${siteUrl}#service-catalog`,
  name: "Engineering & Project Management Services",
  itemListElement: serviceSchemas.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@id": service["@id"],
    },
  })),
};

export const organizationGraph: JsonLd = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, websiteSchema, offerCatalogSchema, ...serviceSchemas],
};

export function createWebPageSchema({
  id,
  url,
  name,
  description,
  type = "WebPage",
}: {
  id: string;
  url: string;
  name: string;
  description: string;
  type?: string;
}): JsonLd {
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: {
      "@id": websiteId,
    },
    about: {
      "@id": organizationId,
    },
    inLanguage: "en-IN",
  };
}

export function createBreadcrumbSchema(
  url: string,
  items: Array<{
    name: string;
    item: string;
  }>,
): JsonLd {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}
