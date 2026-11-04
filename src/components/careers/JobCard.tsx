// src/components/careers/JobCard.tsx
import { Link } from "@tanstack/react-router";
import {
  MapPin,
  Briefcase,
  Clock,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { type Job } from "@/config/careers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const isActive = job.status === "ACTIVE";

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-border/80 bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:border-[color:var(--color-brand-blue)]/40 hover:shadow-[var(--shadow-elegant)]">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold text-[color:var(--color-brand-navy)] transition-colors group-hover:text-[color:var(--color-brand-blue)]">
              {job.title}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-[color:var(--color-brand-orange)] flex-shrink-0" />
              <span>{job.location}</span>
            </p>
          </div>

          <Badge
            variant={isActive ? "default" : "secondary"}
            className={
              isActive
                ? "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold uppercase tracking-wider text-[11px] px-2.5 py-0.5"
                : "bg-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[11px] px-2.5 py-0.5"
            }
          >
            {job.status}
          </Badge>
        </div>

        {/* Metadata Details */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 border-y border-border/50 py-3.5 text-xs text-foreground/80">
          <div className="flex items-center gap-2">
            <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium text-foreground/60">Dept:</span>
            <span className="font-medium text-foreground">{job.department}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium text-foreground/60">Exp:</span>
            <span className="font-medium text-foreground">{job.experience}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[color:var(--color-brand-orange)]" />
            <span className="font-medium text-foreground/60">Type:</span>
            <span className="font-medium text-foreground">{job.employmentType}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium text-foreground/60">Posted:</span>
            <span className="font-medium text-foreground">{job.postedDate}</span>
          </div>
        </div>

        {/* Skills Summary */}
        {job.skills && job.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
            <span className="line-clamp-1 font-medium text-foreground/85">
              {job.skills.join(" • ")}
            </span>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="mt-6 flex items-center justify-between gap-4 pt-2">
        <span className="text-[11px] text-muted-foreground">
          {job.deadline ? `Deadline: ${job.deadline}` : "Open until filled"}
        </span>

        {isActive ? (
          <Button
            asChild
            className="rounded-lg bg-[color:var(--color-brand-navy)] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[color:var(--color-brand-blue)] hover:shadow"
          >
            <Link to="/careers/$slug" params={{ slug: job.slug }}>
              <span>View Details</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        ) : (
          <Button
            disabled
            variant="outline"
            className="cursor-not-allowed rounded-lg border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500"
          >
            <ShieldAlert className="mr-1.5 h-3.5 w-3.5" />
            <span>Position Closed</span>
          </Button>
        )}
      </div>
    </div>
  );
}
