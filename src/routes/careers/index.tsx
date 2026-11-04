// src/routes/careers/index.tsx
import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Briefcase, ArrowDown, Send, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { JobCard } from "@/components/careers/JobCard";
import { CareerValueStrip } from "@/components/careers/CareerValueStrip";
import { useCareersStore } from "@/hooks/use-careers";
import { type JobDepartment } from "@/config/careers";
import { company } from "@/config/company";
import { siteUrl } from "@/config/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImg from "@/assets/careers-hero.jpg";

export const Route = createFileRoute("/careers/")({
  head: () => ({
    meta: [
      {
        title: `Careers at Milestone Consultancy | Civil & Highway Engineering Jobs`,
      },
      {
        name: "description",
        content:
          "Explore civil engineering, quality control, site execution, and PMC career opportunities at Milestone Consultancy in Kalyan and Nashik, Maharashtra.",
      },
      {
        name: "keywords",
        content:
          "Civil Engineering Jobs Maharashtra, Highway Engineer Vacancies Nashik, Quality Engineer DLC PQC, Site Engineer Jobs Kalyan, Construction Careers Mumbai MMR, Milestone Consultancy Hiring",
      },
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      {
        name: "googlebot",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      {
        property: "og:title",
        content: `Careers at Milestone Consultancy | Join Our Engineering Team`,
      },
      {
        property: "og:description",
        content:
          "Build your career with Milestone Consultancy. Explore open positions in civil engineering, road execution, QA/QC, and project management.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${siteUrl}/careers` },
      {
        property: "og:image",
        content: `${siteUrl}/milestone-logo.jpeg`,
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Careers at Milestone Consultancy" },
      { property: "og:site_name", content: company.name },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: `Careers at Milestone Consultancy`,
      },
      {
        name: "twitter:description",
        content:
          "Join our team delivering excellence across road, bridge, and infrastructure assignments in Maharashtra.",
      },
      {
        name: "twitter:image",
        content: `${siteUrl}/milestone-logo.jpeg`,
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${siteUrl}/careers`,
      },
    ],
  }),
  component: CareersPage,
});

const DEPARTMENTS: ("All" | JobDepartment)[] = [
  "All",
  "Engineering",
  "Site",
  "Quality",
  "Accounts",
  "Management",
];

function CareersPage() {
  const { jobs, error } = useCareersStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<"All" | JobDepartment>("All");

  // Public users see active jobs first, closed jobs at bottom; draft jobs are filtered out
  const publicJobs = useMemo(() => {
    return jobs.filter((j) => j.status !== "DRAFT");
  }, [jobs]);

  // Filter based on search and selected department
  const filteredJobs = useMemo(() => {
    return publicJobs.filter((job) => {
      // Dept match
      const matchesDept =
        selectedDept === "All" || job.department.toLowerCase() === selectedDept.toLowerCase();

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.department.toLowerCase().includes(query) ||
        job.skills.some((s) => s.toLowerCase().includes(query));

      return matchesDept && matchesSearch;
    });
  }, [publicJobs, selectedDept, searchQuery]);

  const scrollToOpenPositions = () => {
    const el = document.getElementById("open-positions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SiteLayout>
      {/* ========================================================
          HERO SECTION (Cinematic Split Layout matching Reference)
          ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-12 md:py-20 lg:py-24 border-b border-border/60">
        <div className="container-page">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-brand-navy)]/15 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-brand-navy)] shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-[color:var(--color-brand-orange)]" />
                <span>Careers at Milestone</span>
              </div>

              <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-[color:var(--color-brand-navy)] sm:text-5xl lg:text-6xl text-balance">
                Build Your Career With{" "}
                <span className="text-[color:var(--color-brand-blue)]">Milestone</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed text-balance">
                Join a multidisciplinary team delivering engineering excellence across state
                highways, concrete pavements, urban corridors, and Project Management Consultancy
                (PMC) assignments.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  onClick={scrollToOpenPositions}
                  className="rounded-full bg-[color:var(--color-brand-navy)] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[color:var(--color-brand-blue)] hover:shadow-lg"
                >
                  <span>View Open Positions</span>
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-border bg-white px-6 py-3.5 text-sm font-medium text-foreground hover:bg-slate-50"
                >
                  <Link to="/about">About Our Work Culture</Link>
                </Button>
              </div>
            </div>

            {/* Right Column: High Quality Construction Imagery */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="overflow-hidden rounded-2xl border border-border/80 bg-white p-2 shadow-[var(--shadow-elegant)]">
                  <img
                    src={heroImg}
                    alt="Milestone Consultancy civil engineers reviewing construction plans on an active highway infrastructure site"
                    className="h-72 w-full rounded-xl object-cover sm:h-96"
                    loading="eager"
                  />
                </div>
                {/* Floating Stat Pill */}
                <div className="absolute -bottom-5 -left-4 hidden sm:flex items-center gap-3 rounded-xl border border-border/80 bg-white/95 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 font-bold">
                    100%
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[color:var(--color-brand-navy)]">
                      Committed Team
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      Professional Infrastructure Growth
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CAREER VALUE STRIP (4 Pillars)
          ======================================================== */}
      <CareerValueStrip />

      {/* ========================================================
          OPEN POSITIONS SECTION (Search & Filters)
          ======================================================== */}
      <section id="open-positions" className="scroll-mt-28 py-16 lg:py-24">
        <div className="container-page">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[color:var(--color-brand-navy)] sm:text-4xl">
              Open Positions
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Explore current job openings and find the right opportunity for your career.
            </p>
          </div>

          {/* Search Bar & Department Filter Controls */}
          <div className="mt-10 mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by job title, location, skills..."
                  className="pl-10 h-11 rounded-xl border-border bg-white text-sm shadow-xs focus-visible:ring-[color:var(--color-brand-navy)]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Department Filters (Pills) */}
              <div className="flex flex-wrap items-center gap-1.5 justify-center md:justify-start">
                {DEPARTMENTS.map((dept) => {
                  const isSelected = selectedDept === dept;
                  return (
                    <button
                      key={dept}
                      onClick={() => setSelectedDept(dept)}
                      className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                        isSelected
                          ? "bg-[color:var(--color-brand-navy)] text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {dept}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Job Listings Grid */}
          <div className="mt-12 mx-auto max-w-6xl">
            {error ? (
              <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-amber-200 bg-amber-50/60 p-8 text-center sm:p-12">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-[color:var(--color-brand-navy)]">
                  Careers Portal Updating
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Our vacancy portal is currently undergoing scheduled updates. Please check back
                  shortly or email your resume directly to our HR team.
                </p>
                <div className="mt-6 flex justify-center">
                  <Button
                    asChild
                    className="rounded-full bg-[color:var(--color-brand-navy)] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[color:var(--color-brand-blue)]"
                  >
                    <Link to="/contact">
                      <Send className="mr-1.5 h-3.5 w-3.5" />
                      <span>Contact HR Team</span>
                    </Link>
                  </Button>
                </div>
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              /* No Vacancies / Empty State */
              <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-border bg-slate-50/80 p-8 text-center sm:p-12">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-brand-navy)]/10 text-[color:var(--color-brand-navy)]">
                  <Briefcase className="h-6 w-6" />
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-[color:var(--color-brand-navy)]">
                  Currently, We Have No Open Positions
                </h3>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  While there are no current openings matching your criteria, we are always
                  interested in connecting with talented engineering and construction professionals.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button
                    asChild
                    className="rounded-full bg-[color:var(--color-brand-navy)] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[color:var(--color-brand-blue)]"
                  >
                    <Link to="/contact">
                      <Send className="mr-1.5 h-3.5 w-3.5" />
                      <span>Send Your Resume</span>
                    </Link>
                  </Button>

                  {(searchQuery || selectedDept !== "All") && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedDept("All");
                      }}
                      className="rounded-full text-xs"
                    >
                      Reset Filters
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          ADMIN / HR LINK STRIP (Discreet footer link for management)
          ======================================================== */}
      <div className="border-t border-border/40 bg-slate-50 py-4 text-center text-xs text-muted-foreground">
        <span>Are you managing hiring at Milestone? </span>
        <Link
          to="/admin/careers"
          className="font-medium text-[color:var(--color-brand-blue)] underline hover:text-[color:var(--color-brand-navy)]"
        >
          Access Career Management Portal
        </Link>
      </div>
    </SiteLayout>
  );
}
