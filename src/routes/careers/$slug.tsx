// src/routes/careers/$slug.tsx
import { createFileRoute, Link, notFound, Outlet, useChildMatches } from "@tanstack/react-router";
import {
  MapPin,
  Briefcase,
  Clock,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Share2,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { loadPublicJob } from "@/server/public-careers";
import { isJobOpen } from "@/lib/job-policy";
import { createJobPostingSchema } from "@/config/careers";
import { company } from "@/config/company";
import { siteUrl } from "@/config/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import roadMachineryImg from "@/assets/projects/maldhakka-road-roller.jpg";

export const Route = createFileRoute("/careers/$slug")({
  loader: async ({ params }) => {
    const job = await loadPublicJob({ data: params.slug });
    if (!job) throw notFound();
    return { job };
  },
  staleTime: 0,
  gcTime: 0,
  head: ({ loaderData, match }) => {
    if (match.pathname?.endsWith("/apply")) {
      return {
        meta: [
          { title: "Apply for Job | Milestone Consultancy" },
          { name: "robots", content: "noindex, nofollow" },
        ],
      };
    }

    const job = loaderData?.job;
    if (!job) {
      return {
        meta: [{ title: "Job Vacancy | Milestone Consultancy" }],
      };
    }

    const loc = job.location.split(",")[0].trim();
    const cleanTitle = job.title.length > 50 ? `${job.title.slice(0, 47).trim()}...` : job.title;
    const title = `${cleanTitle} Jobs in ${loc} | Milestone Consultancy`;
    let description = `Apply for ${job.title} (${job.experience}) at Milestone Consultancy in ${loc}. Review requirements and submit application directly via HR email.`;
    if (description.length > 160) {
      description = description.slice(0, 157).trim() + "...";
    }
    const pageUrl = `${siteUrl}/careers/${job.slug}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "robots",
          content: isJobOpen(job)
            ? "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            : "noindex, follow",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: pageUrl },
        {
          property: "og:image",
          content: `${siteUrl}/milestone-logo.jpeg`,
        },
        { property: "og:site_name", content: company.name },
        { property: "og:locale", content: "en_IN" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        {
          name: "twitter:image",
          content: `${siteUrl}/milestone-logo.jpeg`,
        },
      ],
      links: [{ rel: "canonical", href: pageUrl }],
      scripts: isJobOpen(job)
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify(createJobPostingSchema(job)).replace(/</g, "\\u003c"),
            },
          ]
        : [],
    };
  },
  component: JobSlugRoute,
});

function JobSlugRoute() {
  const childMatches = useChildMatches();
  if (childMatches.length > 0) {
    return <Outlet />;
  }
  return <JobDetailPage />;
}

function JobDetailPage() {
  const { job } = Route.useLoaderData();
  const isActive = isJobOpen(job);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: `${job.title} at Milestone Consultancy`,
          url: window.location.href,
        })
        .catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Job link copied to clipboard!");
    }
  };

  return (
    <SiteLayout>
      {/* ========================================================
          BREADCRUMBS
          ======================================================== */}
      <div className="bg-slate-50 border-b border-border/60 py-3">
        <div className="container-page">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/careers" className="hover:text-foreground transition-colors">
              Careers
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-foreground">{job.title}</span>
          </nav>
        </div>
      </div>

      {/* ========================================================
          VACANCY HEADER WITH MACHINERY BANNER (Matching Mockup Panel 2)
          ======================================================== */}
      <section className="bg-white border-b border-border/60 py-10 lg:py-14">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Title & Metadata */}
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[color:var(--color-brand-navy)]">
                  {job.title}
                </h1>
                <Badge
                  variant={isActive ? "default" : "secondary"}
                  className={
                    isActive
                      ? "bg-emerald-600 text-white font-bold text-xs uppercase px-3 py-1"
                      : "bg-slate-200 text-slate-700 font-bold text-xs uppercase px-3 py-1"
                  }
                >
                  {isActive ? "ACTIVE" : "CLOSED"}
                </Badge>
              </div>

              {/* Metadata strip */}
              <div className="mt-5 flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-foreground/80">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[color:var(--color-brand-orange)]" />
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{job.department}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{job.experience}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--color-brand-orange)]" />
                  <span>{job.employmentType}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Posted on {job.postedDate}</span>
                </div>
              </div>
            </div>

            {/* Header Machinery Banner Photo */}
            <div className="lg:col-span-4">
              <div className="overflow-hidden rounded-xl border border-border/80 shadow-[var(--shadow-soft)]">
                <img
                  src={roadMachineryImg}
                  alt="Milestone road construction machinery and paving project"
                  className="h-44 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          MAIN CONTENT & STICKY APPLICATION CARD
          ======================================================== */}
      <section className="py-12 lg:py-16">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Full Job Details */}
            <div className="lg:col-span-8 space-y-10">
              {/* Job Description */}
              <div>
                <h2 className="font-display text-xl font-bold text-[color:var(--color-brand-navy)]">
                  Job Description
                </h2>
                <p className="mt-3 text-base text-foreground/85 leading-relaxed">
                  {job.jobDescription}
                </p>
              </div>

              {/* Key Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-bold text-[color:var(--color-brand-navy)]">
                    Key Responsibilities
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {job.responsibilities.map((resp: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-foreground/85 leading-relaxed"
                      >
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Required Qualifications */}
              {job.qualifications && (
                <div>
                  <h2 className="font-display text-xl font-bold text-[color:var(--color-brand-navy)]">
                    Required Qualifications
                  </h2>
                  <div className="mt-3 flex items-start gap-2.5 text-sm text-foreground/85">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                    <span>{job.qualifications}</span>
                  </div>
                </div>
              )}

              {/* Required Experience */}
              {job.requiredExperience && (
                <div>
                  <h2 className="font-display text-xl font-bold text-[color:var(--color-brand-navy)]">
                    Required Experience
                  </h2>
                  <p className="mt-2 text-sm text-foreground/85 leading-relaxed">
                    {job.requiredExperience}
                  </p>
                </div>
              )}

              {/* Preferred Skills */}
              {job.preferredSkills && job.preferredSkills.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-bold text-[color:var(--color-brand-navy)]">
                    Preferred Skills
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.preferredSkills.map((skill: string, idx: number) => (
                      <span
                        key={idx}
                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-800 border border-slate-200/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Information */}
              {job.otherInformation && (
                <div>
                  <h2 className="font-display text-xl font-bold text-[color:var(--color-brand-navy)]">
                    Other Information
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {job.otherInformation}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Application Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-elegant)]">
                <h3 className="font-display text-lg font-bold text-[color:var(--color-brand-navy)]">
                  Interested in this position?
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Submit your application and join our growing engineering team.
                </p>

                {/* Apply CTA */}
                <div className="mt-6">
                  {isActive ? (
                    <Button
                      asChild
                      className="w-full rounded-xl bg-[color:var(--color-brand-navy)] py-3 text-sm font-semibold text-white shadow-md hover:bg-[color:var(--color-brand-blue)] hover:shadow-lg"
                    >
                      <Link to="/careers/$slug/apply" params={{ slug: job.slug }}>
                        <span>Apply Now</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <div className="rounded-xl bg-slate-100 p-4 text-center">
                      <ShieldAlert className="mx-auto h-6 w-6 text-slate-500" />
                      <div className="mt-2 text-sm font-semibold text-slate-700">
                        Position Closed
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        This vacancy is no longer accepting new applications.
                      </p>
                    </div>
                  )}
                </div>

                {/* Position Summary Attributes */}
                <div className="mt-6 space-y-3.5 border-t border-border/60 pt-6 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-[color:var(--color-brand-orange)]" />
                      <span>Location</span>
                    </span>
                    <span className="font-medium text-foreground">{job.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Employment Type</span>
                    </span>
                    <span className="font-medium text-foreground">{job.employmentType}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span>Department</span>
                    </span>
                    <span className="font-medium text-foreground">{job.department}</span>
                  </div>

                  {job.salary && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Compensation</span>
                      <span className="font-medium text-emerald-700">{job.salary}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Posted On</span>
                    </span>
                    <span className="font-medium text-foreground">{job.postedDate}</span>
                  </div>

                  {job.deadline && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Application Deadline</span>
                      <span className="font-medium text-foreground">{job.deadline}</span>
                    </div>
                  )}
                </div>

                {/* Share Link */}
                <div className="mt-6 pt-4 border-t border-border/40 text-center">
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[color:var(--color-brand-navy)] transition-colors"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share this opportunity</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
