import maldhakkaImg from "@/assets/projects/maldhakka-road.jpg";
import maldhakkaRollerImg from "@/assets/projects/maldhakka-road-roller.jpg";
import maldhakkaDrainImg from "@/assets/projects/maldhakka-road-drain.jpg";

import chowkImg from "@/assets/projects/nashik-road-chowk.jpg";
import chowkPaverImg from "@/assets/projects/nashik-chowk-paver.jpg";
import chowkSurveyImg from "@/assets/projects/nashik-chowk-survey.jpg";

import whiteToppingImg from "@/assets/projects/white-topping-corridor.jpg";
import whiteToppingPaverImg from "@/assets/projects/white-topping-paver.jpg";
import whiteToppingSlabImg from "@/assets/projects/white-topping-slab.jpg";

import nandurBridgeImg from "@/assets/projects/nandur-bridge-jatra.jpg";
import nandurBridgeOverpassImg from "@/assets/projects/nandur-bridge-overpass.jpg";
import nandurBridgeEarthworkImg from "@/assets/projects/nandur-bridge-earthwork.jpg";

export type ProjectStatus = "ongoing" | "completed" | "upcoming";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  status: ProjectStatus;
  description: string;
  workType?: string;
  authority?: string;
  client?: string;
  projectValue?: string;
  overview?: string;
  scope?: string[];
  highlights?: string[];
  heroImage: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: "aa-19-maldhakka-road",
    slug: "aa-19-maldhakka-road",
    title:
      "AA-19 – Development of Maldhakka Road and Railway Station Connecting Roads at Nashik Road",
    category: "Highway & Urban Road Engineering",
    location: "Nashik Road, Maharashtra",
    status: "ongoing",
    workType: "Concrete + Bituminous",
    authority: "Nashik Municipal Corporation (NMC)",
    client: "S. B. Constructions",
    description:
      "Development and structural improvement of Maldhakka Road and railway station connecting roads at Nashik Road with concrete and bituminous pavement.",
    overview:
      "This project involves the strategic development and structural rehabilitation of Maldhakka Road and key approach roads connecting directly to Nashik Road Railway Station. As an essential transit corridor facilitating heavy commercial freight and high-density commuter movement, the project combines high-grade rigid concrete and durable bituminous layers in accordance with strict MoRTH and IRC standards.",
    scope: [
      "Project planning, baseline scheduling, and resource deployment monitoring",
      "Full-time technical supervision and workmanship monitoring across all road sections",
      "Quality Assurance & Quality Control (QA/QC) inspection and laboratory testing coordination",
      "Pavement layer inspection: subgrade preparation, GSB, concrete and bituminous courses",
      "Quantity verification, measurement books (MB) validation, and Running Account (RA) bill certification",
      "Coordination with NMC, Nashik Kumbh Mela Pradhikaran, and statutory testing agencies",
      "Preparation of audit-ready DPR, WPR, MPR, delay analysis, and site inspection records",
    ],
    highlights: [
      "Pavement Structure: Combined rigid concrete and flexible bituminous engineering",
      "Strategic Urban Arterial: Primary connectivity corridor to Nashik Road Railway Station",
      "Comprehensive Oversight: Continuous QA/QC sampling and laboratory material certification",
      "Client Engagement: Executed under S. B. Constructions PMC supervision",
    ],
    heroImage: maldhakkaImg,
    gallery: [maldhakkaImg, maldhakkaRollerImg, maldhakkaDrainImg],
  },
  {
    id: "aa-20-nashik-road",
    slug: "aa-20-nashik-road",
    title:
      "AA-20 – Improvement of Road from Chhatrapati Shivaji Maharaj Statue to Dr. Babasaheb Ambedkar Chowk to Satkar Point at Nashik Road",
    category: "Highway & Urban Road Engineering",
    location: "Nashik Road, Maharashtra",
    status: "ongoing",
    workType: "Concrete + Bituminous",
    authority: "Nashik Municipal Corporation (NMC)",
    client: "S. B. Constructions",
    description:
      "Urban roadway improvement from Shivaji Maharaj Statue to Ambedkar Chowk and Satkar Point at Nashik Road with concrete and bituminous pavement.",
    overview:
      "A flagship urban transport infrastructure upgrade spanning high-traffic civic junctions in Nashik Road from Chhatrapati Shivaji Maharaj Statue through Dr. Babasaheb Ambedkar Chowk to Satkar Point. The scope focuses on widening, pavement strengthening, concrete and bituminous surfacing, and utility/drainage coordination to withstand heavy urban vehicular loads.",
    scope: [
      "Continuous Project Management Consultancy (PMC) and site engineering supervision",
      "Review and validation of contractor methodology, work sequencing, and equipment deployment",
      "Independent QA/QC testing for raw aggregates, concrete cubes, and bitumen mix designs",
      "Geometric alignment, camber, and elevation checks during sub-base and pavement construction",
      "Running Account (RA) bill inspection, joint measurements, and quantity reconciliation",
      "Stakeholder coordination with NMC, Kumbh Mela authorities, traffic police, and utility agencies",
      "Comprehensive documentation, photographic logging, and periodic progress reporting",
    ],
    highlights: [
      "Pavement Technology: Engineered concrete and high-performance bituminous surface courses",
      "Civic Importance: Interlinks premier central commercial and civic junctions at Nashik Road",
      "Traffic Management: Phased construction sequencing maintaining daily urban vehicular flow",
      "Client Engagement: Executed under S. B. Constructions PMC supervision",
    ],
    heroImage: chowkImg,
    gallery: [chowkImg, chowkPaverImg, chowkSurveyImg],
  },
  {
    id: "mumbai-naka-trimbak-naka",
    slug: "mumbai-naka-trimbak-naka",
    title: "Development of Road from Mumbai Naka to Gadkari Signal to Trimbak Naka",
    category: "Urban Road Infrastructure",
    location: "Nashik, Maharashtra",
    status: "ongoing",
    workType: "White Topping Concrete Overlay",
    authority: "Nashik Municipal Corporation (NMC)",
    client: "S. B. Constructions",
    description:
      "White Topping concrete overlay construction across the central civic corridor connecting Mumbai Naka, Gadkari Signal, and Trimbak Naka in Nashik.",
    overview:
      "This high-profile urban project implements White Topping concrete overlay technology over one of Nashik's busiest arterial corridors connecting Mumbai Naka to Gadkari Signal and onward to Trimbak Naka. White topping applies a high-strength concrete layer over the existing bituminous pavement, providing long-term structural integrity, eliminating recurring potholes, and offering maximum resistance to monsoon degradation.",
    scope: [
      "Specialized technical supervision for white topping pavement execution",
      "Surface milling, profiling, and structural assessment of existing bituminous base",
      "Mix design verification, batching plant calibration, and concrete compressive testing",
      "Supervision of concrete placement, texturing, contraction joint cutting, and curing",
      "Independent quantity surveying, joint measurement sheets, and IPC payment verification",
      "Traffic circulation planning and safety barricading in active city center",
      "Quality documentation and authority compliance reporting for Kumbh Mela corridor readiness",
    ],
    highlights: [
      "Engineering Technology: High-strength White Topping rigid concrete overlay",
      "Central Arterial: Major connecting corridor between Mumbai Naka, Gadkari Signal, and Trimbak Naka",
      "Longevity & Performance: Superior load distribution and flood-resilient pavement life cycle",
      "Client Engagement: Executed under S. B. Constructions PMC supervision",
    ],
    heroImage: whiteToppingImg,
    gallery: [whiteToppingImg, whiteToppingPaverImg, whiteToppingSlabImg],
  },
  {
    id: "nandur-bridge-jatra",
    slug: "nandur-bridge-jatra",
    title: "Development of Road from Nandur Bridge to Jatra Hotel (Approach to Ghats)",
    category: "Highway & Road Infrastructure",
    location: "Nashik, Maharashtra",
    status: "ongoing",
    workType: "Road & Ghat Approach Construction",
    authority: "Nashik Municipal Corporation (NMC)",
    client: "Rushabh Construction",
    projectValue: "Approx. ₹44.00 Crore",
    description:
      "Highway corridor and ghat approach road development connecting Nandur Bridge to Jatra Hotel in Nashik, strengthening regional freight connectivity.",
    overview:
      "A premier infrastructure assignment linking Nandur Bridge with the Jatra Hotel junction, functioning as the vital approach corridor to the ghat section for regional traffic. Under appointment by Rushabh Construction for the Nashik Municipal Corporation project, Milestone Consultancy provides end-to-end PMC oversight across road formation, slope stabilization, cross-drainage, and multi-layer pavement works.",
    scope: [
      "Full Project Management Consultancy (PMC) services from site mobilization through completion",
      "Geometric alignment review, gradient verification, and slope stability monitoring",
      "Rigorous QA/QC oversight for embankment earthworks, subgrade, and structural courses",
      "Material validation for stone aggregates, WMM, bitumen, and concrete specifications",
      "Quantity survey, running account bill verification, and joint measurement sign-offs every 15 days",
      "High-traffic bypass safety management, environmental compliance, and site barricading",
      "Preparation of DPR, WPR, MPR, delay analysis, and statutory compliance documentation",
    ],
    highlights: [
      "Project Scale: Balance project value available for billing is approximately ₹44.00 Crore",
      "Strategic Corridor: Key regional ghat approach connecting Nandur Bridge to Jatra Hotel",
      "Heavy Transit Engineering: Earthworks, reinforced culverts, and high-load pavement structure",
      "Consultancy Deliverables: Quality control audits, joint measurements, and executive progress monitoring",
    ],
    heroImage: nandurBridgeImg,
    gallery: [nandurBridgeImg, nandurBridgeOverpassImg, nandurBridgeEarthworkImg],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const legacyProjectSlugs: Record<string, string> = {
  "maldhakka-road-nashik-road-railway-station": "aa-19-maldhakka-road",
  "white-topping-corridor-mumbai-naka-trimbak-naka": "mumbai-naka-trimbak-naka",
  "nandur-bridge-jatra-hotel-link-road": "nandur-bridge-jatra",
};
