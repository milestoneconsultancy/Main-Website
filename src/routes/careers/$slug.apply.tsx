import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ChevronRight,
  ArrowLeft,
  Mail,
  Copy,
  Check,
  Building2,
  MapPin,
  Briefcase,
  AlertCircle,
  FileText,
  ShieldCheck,
  Send,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useCareersConfig } from "@/hooks/use-careers";
import { loadPublicJob } from "@/server/public-careers";
import { isJobOpen } from "@/lib/job-policy";
import { Button } from "@/components/ui/button";
import engineerImg from "@/assets/careers-apply-engineer.jpg";

export const Route = createFileRoute("/careers/$slug/apply")({
  loader: async ({ params }) => {
    const job = await loadPublicJob({ data: params.slug });
    if (!job || !isJobOpen(job)) throw notFound();
    return { job };
  },
  staleTime: 0,
  gcTime: 0,
  head: ({ loaderData }) => {
    const job = loaderData?.job;
    const title = job
      ? `Apply for ${job.title} | Milestone Consultancy`
      : "Apply for Job | Milestone Consultancy";
    return {
      meta: [{ title }, { name: "robots", content: "noindex, nofollow" }],
    };
  },
  component: JobApplyPage,
});

function JobApplyPage() {
  const { job } = Route.useLoaderData();
  const { hrEmail } = useCareersConfig();
  const [copied, setCopied] = useState(false);
  if (!isJobOpen(job)) throw notFound();

  // Construct mailto link
  const emailSubject = `Application for ${job.title} [${job.id}] - Milestone Consultancy`;
  const emailBody = `Dear Hiring Team,

I would like to apply for the ${job.title} position at Milestone Consultancy.

Position: ${job.title}
Department: ${job.department}
Location: ${job.location}

Please find my latest CV/resume attached for your consideration.

Regards,
[Candidate Name]`;

  const mailtoHref = `mailto:${encodeURIComponent(hrEmail)}?subject=${encodeURIComponent(
    emailSubject,
  )}&body=${encodeURIComponent(emailBody)}`;

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(hrEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
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
            <Link
              to="/careers/$slug"
              params={{ slug: job.slug }}
              className="hover:text-foreground transition-colors"
            >
              {job.title}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-foreground">Apply</span>
          </nav>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            {/* Back link */}
            <div className="mb-6">
              <Link
                to="/careers/$slug"
                params={{ slug: job.slug }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--color-brand-navy)] hover:text-[color:var(--color-brand-blue)]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Job Details</span>
              </Link>
            </div>

            {/* Main Application Container */}
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-elegant)] grid grid-cols-1 md:grid-cols-12">
              {/* Left Column: Engineer Photo & Overview */}
              <div className="md:col-span-5 bg-gradient-to-b from-slate-900 via-[color:var(--color-brand-navy)] to-slate-950 text-white p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <img
                    src={engineerImg}
                    alt="Milestone engineer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="relative z-10 space-y-6">
                  <div>
                    <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-[color:var(--color-brand-orange)] backdrop-blur-xs">
                      Official Application
                    </span>
                    <h2 className="mt-3 font-display text-2xl font-bold leading-tight">
                      {job.title}
                    </h2>
                    <p className="mt-1 text-xs text-slate-300">Milestone Consultancy Careers</p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                    <div className="flex items-center gap-2.5 text-slate-200">
                      <Briefcase className="h-4 w-4 text-[color:var(--color-brand-orange)]" />
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-200">
                      <MapPin className="h-4 w-4 text-[color:var(--color-brand-orange)]" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-200">
                      <Building2 className="h-4 w-4 text-[color:var(--color-brand-orange)]" />
                      <span>
                        {job.employmentType} • {job.experience}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 pt-8 border-t border-white/10 text-[11px] text-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>
                      Direct submission to HR inbox with zero web storage of personal data.
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Direct Email Action */}
              <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-8">
                <div>
                  <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[color:var(--color-brand-orange)]">
                    <Mail className="h-4 w-4" />
                    <span>Direct Email Application</span>
                  </div>
                  <h3 className="mt-2 font-display text-xl sm:text-2xl font-extrabold text-[color:var(--color-brand-navy)]">
                    Apply for this Position
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    To maintain strict privacy and direct communication with our recruitment team,
                    we accept applications directly via your email client.
                  </p>

                  {/* Crucial Instruction Notice */}
                  <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-900 flex items-start gap-3">
                    <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="leading-relaxed font-medium">
                      Click Apply via Email to open your default email application. Please attach
                      your latest CV/resume before sending.
                    </div>
                  </div>

                  {/* Prefilled email preview summary */}
                  <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-2 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-slate-500 w-16 shrink-0">To:</span>
                      <span className="font-mono text-slate-900 break-all">{hrEmail}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-slate-500 w-16 shrink-0">Subject:</span>
                      <span className="font-medium text-slate-900">{emailSubject}</span>
                    </div>
                    <div className="flex items-start gap-2 pt-2 border-t border-slate-200/70">
                      <span className="font-semibold text-slate-500 w-16 shrink-0">Note:</span>
                      <span className="text-slate-600">
                        Position, Department, and Location will be automatically prefilled in your
                        draft email.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons & Fallback */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <a
                    href={mailtoHref}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-brand-navy)] py-3.5 px-6 text-sm font-semibold text-white shadow-md transition-all hover:bg-[color:var(--color-brand-blue)] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand-navy)] focus:ring-offset-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Apply via Email</span>
                  </a>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-xl border-border hover:bg-slate-50 text-xs font-semibold text-slate-700"
                  >
                    <Link to="/careers/$slug" params={{ slug: job.slug }}>
                      <ArrowLeft className="mr-2 h-3.5 w-3.5" />
                      <span>Back to Job Details</span>
                    </Link>
                  </Button>

                  {/* Fallback Copy Option */}
                  <div className="rounded-xl border border-border bg-white p-3.5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[11px] text-muted-foreground font-medium">
                        Device without default email app?
                      </div>
                      <div className="font-mono text-xs font-semibold text-slate-900 truncate">
                        {hrEmail}
                      </div>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={handleCopyEmail}
                      className="shrink-0 h-8 px-3 text-xs gap-1.5 border-border hover:bg-slate-50"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-slate-500" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom info banner */}
            <div className="mt-8 rounded-xl border border-slate-100 bg-slate-50/80 p-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <FileText className="h-4 w-4 text-[color:var(--color-brand-orange)]" />
              <span>
                Please ensure your attached resume is in PDF, DOC, or DOCX format. Milestone
                Consultancy does not charge any application or recruitment fees.
              </span>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
