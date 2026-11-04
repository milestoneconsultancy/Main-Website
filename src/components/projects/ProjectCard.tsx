import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { MapPin, ArrowRight, Route, Layers, Building2 } from "lucide-react";
import { type Project } from "@/config/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group relative flex flex-col rounded-2xl border border-border/80 bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-elegant)] hover:border-[color:var(--color-brand-navy)]/30"
    >
      {/* Project Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <img
          src={project.heroImage}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"
          aria-hidden="true"
        />

        {/* Status Badge */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold tracking-wide text-[color:var(--color-brand-navy)] shadow-sm backdrop-blur-sm">
            <span
              className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
              aria-hidden="true"
            />
            {project.status === "ongoing"
              ? "Ongoing"
              : project.status === "completed"
                ? "Completed"
                : "Upcoming"}
          </span>
        </div>

        {/* Category Badge on Image */}
        <div className="absolute bottom-3 left-3.5 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-[color:var(--color-brand-navy)]/90 px-2.5 py-1 text-[11px] font-medium tracking-wider uppercase text-white backdrop-blur-sm">
            <Route className="h-3 w-3 text-[color:var(--color-brand-orange)]" aria-hidden="true" />
            {project.category}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Title */}
        <h3 className="font-display text-lg sm:text-xl font-bold leading-snug text-[color:var(--color-brand-navy)] group-hover:text-[color:var(--color-brand-orange)] transition-colors">
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="focus:outline-none focus-visible:underline"
          >
            {project.title}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        {/* Metadata Strip */}
        <div className="mt-5 space-y-2.5 border-t border-border/70 pt-4 text-xs text-muted-foreground">
          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin
              className="h-3.5 w-3.5 flex-shrink-0 text-[color:var(--color-brand-orange)]"
              aria-hidden="true"
            />
            <span className="font-medium text-foreground/85">{project.location}</span>
          </div>

          {/* Work Type */}
          {project.workType && (
            <div className="flex items-center gap-2">
              <Layers
                className="h-3.5 w-3.5 flex-shrink-0 text-[color:var(--color-brand-navy)]"
                aria-hidden="true"
              />
              <span>
                Work:{" "}
                <strong className="font-semibold text-foreground/90">{project.workType}</strong>
              </span>
            </div>
          )}

          {/* Authority */}
          {project.authority && (
            <div className="flex items-center gap-2">
              <Building2
                className="h-3.5 w-3.5 flex-shrink-0 text-[color:var(--color-brand-navy)]"
                aria-hidden="true"
              />
              <span className="truncate">
                Authority: <span className="text-foreground/85">{project.authority}</span>
              </span>
            </div>
          )}

          {/* Client / Principal Contractor */}
          {project.client && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Client:</span>
              <span className="font-medium text-foreground/90">{project.client}</span>
            </div>
          )}

          {/* Project Value (Omitted if not verified) */}
          {project.projectValue && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[color:var(--color-brand-navy)]">
                Project Value:
              </span>
              <span className="font-bold text-[color:var(--color-brand-orange)]">
                {project.projectValue}
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-2">
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-brand-orange)] transition-colors hover:text-[color:var(--color-brand-navy)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-orange)] rounded-md py-1"
            aria-label={`View details of ${project.title}`}
          >
            <span>View Details</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
