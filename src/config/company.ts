/**
 * Single source of truth for company information.
 * Update this file to reflect any change across the site.
 */
export const company = {
  name: "Milestone Consultancy",
  legalName: "Milestone Consultancy",
  tagline: "Engineering Tomorrow. Delivering Excellence.",
  shortDescription:
    "Milestone Consultancy is a project management consultancy and engineering consultancy firm headquartered in Kalyan, serving clients across the Mumbai Metropolitan Region, Thane, and Maharashtra. The firm provides construction management, civil engineering consultancy, and infrastructure advisory services for highway engineering, building construction, and industrial development projects. Milestone Consultancy offers quantity surveying, billing engineering, cost estimation, tender consultancy, and contract management to both government infrastructure projects and private sector developments. The consultancy delivers project planning, project monitoring, quality assurance, and quality control (QA QC) for residential, commercial, and industrial projects, providing engineering solutions that meet technical specifications and project schedules throughout Maharashtra and beyond.",
  industry:
    "Project Management Consultancy (PMC), Civil Engineering, Construction Management, Highway Engineering, Infrastructure Development, Building Construction, Quantity Surveying, Cost Estimation, Tender & Contract Management, Quality Assurance & Quality Control (QA/QC), Project Planning & Monitoring",
  founded: 2024,

  contact: {
    phone: "+91 9225112090",
    phoneHref: "tel:+919225112090",
    email: "info@milestoneconsultancy.in",
    emailHref: "mailto:info@milestoneconsultancy.in",
    whatsappNumber: "+91 9225112090",
    whatsappMessage: "Hello! I would like to know more about your services.",
  },

  address: {
    line1: "Kalyan",
    line2: "Maharashtra – 421301",
    country: "India",
    full: "Kalyan, Maharashtra – 421301, India",
  },

  workingHours: [
    { days: "Monday – Saturday", hours: "9:30 AM – 6:30 PM" },
    { days: "Sunday", hours: "Closed" },
  ],

  socials: {
    linkedin: "#",
    twitter: "#",
    facebook: "#",
    instagram: "#",
  },

  googleMapsEmbed: "https://www.google.com/maps?q=Kalyan,+Maharashtra+421301,+India&output=embed",
  googleMapsUrl: "https://www.google.com/maps?q=Kalyan,+Maharashtra+421301,+India",

  brand: {
    logoSrc: "/milestone-logo.jpeg",
    logoAlt: "Milestone Consultancy",
  },
} as const;

export type Company = typeof company;
