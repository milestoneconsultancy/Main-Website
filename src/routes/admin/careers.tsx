// src/routes/admin/careers.tsx
import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  Plus,
  CheckCircle2,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Users,
  Lock,
  LogOut,
  Mail,
  Search,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  Settings,
  Sliders,
} from "lucide-react";
import {
  useCareersStore,
  useAdminAuth,
  useAdminMasters,
  useCareersConfig,
} from "@/hooks/use-careers";
import { type Job, type JobStatus, type JobDepartment } from "@/config/careers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/careers")({
  head: () => ({
    meta: [
      { title: "Career Management Portal | Milestone Consultancy" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminCareersPage,
});

function AdminCareersPage() {
  const { isAuthenticated, isAuthChecking, authError, login, logout } = useAdminAuth();
  const {
    jobs,
    isLoading,
    error: jobsError,
    refreshJobs,
    addJob,
    updateJob,
    setJobStatus,
    deleteJob,
  } = useCareersStore(true, isAuthenticated);
  const {
    masters,
    activeDepartments,
    activeDesignations,
    activeLocations,
    addMasterItem,
    updateMasterItem,
    toggleMasterStatus,
    error: mastersError,
  } = useAdminMasters(isAuthenticated);
  const { hrEmail } = useCareersConfig();

  const [passwordInput, setPasswordInput] = useState("");
  const [localAuthError, setLocalAuthError] = useState("");
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Tabs
  const [activeTab, setActiveTab] = useState<
    "all" | "active" | "closed" | "applications" | "masters"
  >("all");
  const [activeMasterSection, setActiveMasterSection] = useState<
    "departments" | "designations" | "locations"
  >("departments");
  const [newMasterName, setNewMasterName] = useState("");
  const [editingMasterId, setEditingMasterId] = useState<string | null>(null);
  const [editingMasterName, setEditingMasterName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Form Fields for Add / Edit
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formDepartment, setFormDepartment] = useState<JobDepartment>("Quality");
  const [formLocation, setFormLocation] = useState("Nashik, Maharashtra");
  const [formEmploymentType, setFormEmploymentType] = useState("Full Time");
  const [formExperience, setFormExperience] = useState("3+ Years");
  const [formSalary, setFormSalary] = useState("");
  const [formDeadline, setFormDeadline] = useState("");
  const [formStatus, setFormStatus] = useState<JobStatus>("ACTIVE");
  const [formFeatured, setFormFeatured] = useState(false);
  const [formShortDescription, setFormShortDescription] = useState("");
  const [formJobDescription, setFormJobDescription] = useState("");
  const [formResponsibilities, setFormResponsibilities] = useState("");
  const [formQualifications, setFormQualifications] = useState("");
  const [formRequiredExperience, setFormRequiredExperience] = useState("");
  const [formPreferredSkills, setFormPreferredSkills] = useState("");
  const [formOtherInfo, setFormOtherInfo] = useState("");

  // Authentication Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalAuthError("");
    setIsSubmittingAuth(true);

    try {
      const result = await login(passwordInput);
      if (!result.success) {
        setLocalAuthError(result.error || "Incorrect credentials. Please verify and try again.");
      } else {
        setPasswordInput("");
      }
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setSaveError("");
    setEditingJob(null);
    const defaultDept = activeDepartments[0]?.name || "Quality";
    const defaultDesig = activeDesignations[0]?.name || "";
    const defaultLoc = activeLocations[0]?.name || "Nashik, Maharashtra";

    setFormTitle(defaultDesig);
    setFormSlug(
      defaultDesig
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    );
    setFormDepartment(defaultDept);
    setFormLocation(defaultLoc);
    setFormEmploymentType("Full Time");
    setFormExperience("2+ Years");
    setFormSalary("");
    setFormDeadline("");
    setFormStatus("ACTIVE");
    setFormFeatured(false);
    setFormShortDescription("");
    setFormJobDescription("");
    setFormResponsibilities("");
    setFormQualifications("B.E. / B.Tech / Diploma in Civil Engineering");
    setFormRequiredExperience("Minimum 2+ years on highway or infrastructure projects.");
    setFormPreferredSkills("");
    setFormOtherInfo("");
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (job: Job) => {
    setSaveError("");
    setEditingJob(job);
    setFormTitle(job.title);
    setFormSlug(job.slug);
    setFormDepartment(job.department);
    setFormLocation(job.location);
    setFormEmploymentType(job.employmentType);
    setFormExperience(job.experience);
    setFormSalary(job.salary || "");
    setFormDeadline(job.deadline || "");
    setFormStatus(job.status);
    setFormFeatured(Boolean(job.featured));
    setFormShortDescription(job.shortDescription);
    setFormJobDescription(job.jobDescription);
    setFormResponsibilities(job.responsibilities.join("\n"));
    setFormQualifications(job.qualifications);
    setFormRequiredExperience(job.requiredExperience);
    setFormPreferredSkills(job.preferredSkills.join("\n"));
    setFormOtherInfo(job.otherInformation || "");
    setIsModalOpen(true);
  };

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingJob) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFormSlug(generatedSlug);
    }
  };

  // Save Job (Add or Edit)
  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    setSaveError("");
    let result;

    const responsibilitiesArray = formResponsibilities
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);

    const preferredSkillsArray = formPreferredSkills
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingJob) {
      result = await updateJob(editingJob.id, {
        updatedAt: editingJob.updatedAt,
        title: formTitle.trim(),
        slug: formSlug.trim(),
        department: formDepartment,
        location: formLocation.trim(),
        employmentType: formEmploymentType.trim(),
        experience: formExperience.trim(),
        salary: formSalary.trim(),
        deadline: formDeadline.trim(),
        status: formStatus,
        featured: formFeatured,
        shortDescription: formShortDescription.trim(),
        jobDescription: formJobDescription.trim(),
        responsibilities: responsibilitiesArray,
        qualifications: formQualifications.trim(),
        requiredExperience: formRequiredExperience.trim(),
        preferredSkills: preferredSkillsArray,
        otherInformation: formOtherInfo.trim(),
      });
    } else {
      result = await addJob({
        title: formTitle.trim(),
        slug: formSlug.trim() || `job-${Date.now()}`,
        department: formDepartment,
        location: formLocation.trim(),
        employmentType: formEmploymentType.trim(),
        experience: formExperience.trim(),
        salary: formSalary.trim(),
        deadline: formDeadline.trim(),
        status: formStatus,
        featured: formFeatured,
        skills: preferredSkillsArray.slice(0, 5),
        postedDate: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        shortDescription: formShortDescription.trim(),
        jobDescription: formJobDescription.trim(),
        responsibilities: responsibilitiesArray,
        qualifications: formQualifications.trim(),
        requiredExperience: formRequiredExperience.trim(),
        preferredSkills: preferredSkillsArray,
        otherInformation: formOtherInfo.trim(),
      });
    }

    setIsSaving(false);
    if (result.success) setIsModalOpen(false);
    else
      setSaveError(
        result.error || "Save failed. Your changes are retained; correct the error and retry.",
      );
  };

  // Filtered Vacancies
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (activeTab === "active" && job.status !== "ACTIVE") return false;
      if (activeTab === "closed" && job.status !== "CLOSED") return false;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        job.title.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q)
      );
    });
  }, [jobs, activeTab, searchQuery]);

  // Counts
  const counts = useMemo(() => {
    return {
      all: jobs.length,
      active: jobs.filter((j) => j.status === "ACTIVE").length,
      closed: jobs.filter((j) => j.status === "CLOSED").length,
    };
  }, [jobs]);

  // If Auth checking
  if (isAuthChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
        <p className="text-sm">Verifying server session...</p>
      </div>
    );
  }

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    const displayError = localAuthError || authError;

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-8 text-white shadow-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-brand-orange)]/15 text-[color:var(--color-brand-orange)]">
            <Lock className="h-6 w-6" />
          </div>

          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight">
            Milestone Career Portal
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Authorized management access for publishing vacancies and overseeing candidate
            pipelines.
          </p>

          {displayError && (
            <div className="mt-4 rounded-lg bg-red-950/60 border border-red-800/80 p-3 text-xs text-red-300">
              {displayError}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300">Admin Password</label>
              <Input
                type="password"
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="mt-1.5 h-11 border-slate-800 bg-slate-900 text-white placeholder:text-slate-500 focus-visible:ring-[color:var(--color-brand-orange)]"
                autoFocus
              />
              <p className="mt-1.5 text-[11px] text-slate-500">
                Protected server authentication. Credentials are verified strictly server-side.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmittingAuth}
              className="w-full h-11 bg-[color:var(--color-brand-orange)] hover:bg-[color:var(--color-brand-orange)]/90 text-white font-semibold text-sm transition-all"
            >
              {isSubmittingAuth ? "Authenticating..." : "Sign In to Admin Portal"}
            </Button>
          </form>

          <div className="mt-6 border-t border-slate-800/80 pt-4 text-center">
            <Link
              to="/careers"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Public Careers Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-16">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-white shadow-xs">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[color:var(--color-brand-navy)] text-white">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-base font-bold text-[color:var(--color-brand-navy)]">
                  Milestone Admin
                </span>
                <Badge
                  variant="secondary"
                  className="text-[10px] bg-slate-100 text-slate-600 font-medium"
                >
                  HR Portal
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Vacancy Management & Application Overview
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/careers"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[color:var(--color-brand-navy)] transition-colors px-3 py-1.5 rounded-lg border border-border"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>View Public Portal</span>
            </Link>

            <Button
              onClick={handleOpenAddModal}
              size="sm"
              className="h-9 gap-1.5 bg-[color:var(--color-brand-orange)] text-white hover:bg-[color:var(--color-brand-orange)]/90 text-xs font-semibold px-3.5"
            >
              <Plus className="h-4 w-4" />
              <span>Post Vacancy</span>
            </Button>

            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="h-9 text-xs text-slate-500 hover:text-red-600 hover:bg-red-50 gap-1.5 px-2.5"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {/* KPI Cards (Mockup Panel 4) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Vacancies */}
          <div className="rounded-2xl border border-border bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Total Positions
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Briefcase className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-extrabold text-slate-900">
                {counts.all}
              </span>
              <span className="text-xs text-muted-foreground">recorded positions</span>
            </div>
          </div>

          {/* Active Listings */}
          <div className="rounded-2xl border border-border bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Active Listings
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-extrabold text-emerald-600">
                {counts.active}
              </span>
              <span className="text-xs text-muted-foreground">visible to candidates</span>
            </div>
          </div>

          {/* Closed Vacancies */}
          <div className="rounded-2xl border border-border bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Closed Positions
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <XCircle className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-extrabold text-slate-700">
                {counts.closed}
              </span>
              <span className="text-xs text-muted-foreground">archived/filled</span>
            </div>
          </div>

          {/* HR Delivery Status */}
          <div className="rounded-2xl border border-border bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                HR Direct Dispatch
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[color:var(--color-brand-orange)]">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-slate-800">Encrypted</span>
              <span className="text-xs text-emerald-600 font-semibold">Active</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation & Search */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-[color:var(--color-brand-navy)] text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-border"
              }`}
            >
              All Vacancies ({counts.all})
            </button>
            <button
              onClick={() => setActiveTab("active")}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === "active"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-border"
              }`}
            >
              Active ({counts.active})
            </button>
            <button
              onClick={() => setActiveTab("closed")}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === "closed"
                  ? "bg-slate-700 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-border"
              }`}
            >
              Closed ({counts.closed})
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "applications"
                  ? "bg-[color:var(--color-brand-orange)] text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-border"
              }`}
            >
              <Mail className="h-3.5 w-3.5" />
              <span>HR Email Pipeline</span>
            </button>
            <button
              onClick={() => setActiveTab("masters")}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "masters"
                  ? "bg-[color:var(--color-brand-blue)] text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-border"
              }`}
            >
              <Settings className="h-3.5 w-3.5" />
              <span>Settings / Masters</span>
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search vacancies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs rounded-lg bg-white"
            />
          </div>
        </div>

        {/* ========================================================
            TAB 1: VACANCY TABLE (Mockup Panel 5)
            ======================================================== */}
        {activeTab !== "applications" && activeTab !== "masters" && (
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm mt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-border">
                  <tr>
                    <th className="px-4 py-3.5">#</th>
                    <th className="px-4 py-3.5">Job Title</th>
                    <th className="px-4 py-3.5">Location</th>
                    <th className="px-4 py-3.5">Department</th>
                    <th className="px-4 py-3.5">Type</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">Posted On</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job, idx) => {
                      const isActive = job.status === "ACTIVE";

                      return (
                        <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-3.5 font-medium text-muted-foreground">
                            {idx + 1}
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="font-bold text-[color:var(--color-brand-navy)] text-sm">
                              {job.title}
                            </div>
                            <div className="text-[11px] text-muted-foreground">
                              slug: /{job.slug}
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-slate-700">{job.location}</td>
                          <td className="px-4 py-3.5 text-slate-700">{job.department}</td>
                          <td className="px-4 py-3.5 text-slate-700">{job.employmentType}</td>
                          <td className="px-4 py-3.5">
                            <Badge
                              className={
                                job.status === "ACTIVE"
                                  ? "bg-emerald-600 text-white font-semibold text-[10px]"
                                  : job.status === "DRAFT"
                                    ? "bg-amber-500 text-white font-semibold text-[10px]"
                                    : "bg-slate-200 text-slate-700 font-semibold text-[10px]"
                              }
                            >
                              {job.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3.5 text-muted-foreground">{job.postedDate}</td>
                          <td className="px-4 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Edit Button */}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleOpenEditModal(job)}
                                className="h-7 px-2 text-[11px] gap-1"
                              >
                                <Edit className="h-3 w-3" />
                                <span>Edit</span>
                              </Button>

                              {/* Toggle Status */}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setJobStatus(job.id, isActive ? "CLOSED" : "ACTIVE")}
                                className={`h-7 px-2 text-[11px] gap-1 ${
                                  isActive
                                    ? "text-slate-600 hover:text-slate-900"
                                    : "text-emerald-700 hover:text-emerald-800"
                                }`}
                              >
                                {isActive ? (
                                  <>
                                    <XCircle className="h-3 w-3" />
                                    <span>Close</span>
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 className="h-3 w-3" />
                                    <span>Reopen</span>
                                  </>
                                )}
                              </Button>

                              {/* Delete Button */}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      `Are you sure you want to delete "${job.title}"?`,
                                    )
                                  ) {
                                    deleteJob(job.id);
                                  }
                                }}
                                className="h-7 px-2 text-[11px] text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-muted-foreground">
                        {isLoading
                          ? "Loading vacancies…"
                          : jobsError
                            ? "Vacancies could not be loaded."
                            : "No vacancies found matching your filter criteria."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: APPLICATIONS PIPELINE & PRIVACY ARCHITECTURE
            ======================================================== */}
        {activeTab === "applications" && (
          <div className="space-y-6 mt-6">
            <div className="overflow-hidden rounded-2xl border border-border bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-bold text-[color:var(--color-brand-navy)]">
                    Direct Email Application & Zero-Retention Security Architecture
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To strictly safeguard candidate data and ensure adherence to personal data
                    privacy standards, all candidate applications and resume attachments are
                    submitted directly from candidate email clients into your designated HR inbox.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Privacy Guarantee:</strong> Zero applicant Personally Identifiable
                    Information (PII), phone numbers, or uploaded CV files reach the web server or
                    browser storage.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Designated HR Inbox
                  </div>
                  <div className="mt-1 font-semibold text-slate-800 text-sm break-all font-mono">
                    {hrEmail}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    Configured via CAREERS_HR_EMAIL
                  </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Application Flow
                  </div>
                  <div className="mt-1 font-semibold text-slate-800 text-sm">
                    Client Email Composer (mailto:)
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    Prefills title, designation & location
                  </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Resume Handling
                  </div>
                  <div className="mt-1 font-semibold text-slate-800 text-sm">
                    Direct Attachment to Email
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    Zero server storage or processing
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: SETTINGS / MASTERS MANAGEMENT (Departments, Designations, Locations)
            ======================================================== */}
        {activeTab === "masters" && (
          <div className="space-y-6 mt-6">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-[color:var(--color-brand-navy)] flex items-center gap-2">
                    <Sliders className="h-5 w-5 text-[color:var(--color-brand-orange)]" />
                    <span>Careers Master Records</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Manage standard Departments, Designations, and Locations used in vacancy
                    creation.
                  </p>
                </div>

                {/* Section Selector */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMasterSection("departments");
                      setNewMasterName("");
                      setEditingMasterId(null);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeMasterSection === "departments"
                        ? "bg-white text-[color:var(--color-brand-navy)] shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Departments ({masters.departments.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMasterSection("designations");
                      setNewMasterName("");
                      setEditingMasterId(null);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeMasterSection === "designations"
                        ? "bg-white text-[color:var(--color-brand-navy)] shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Designations ({masters.designations.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMasterSection("locations");
                      setNewMasterName("");
                      setEditingMasterId(null);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeMasterSection === "locations"
                        ? "bg-white text-[color:var(--color-brand-navy)] shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Locations ({masters.locations.length})
                  </button>
                </div>
              </div>

              {/* Error banner if masters operation fails */}
              {mastersError && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-red-600" />
                  <span>{mastersError}</span>
                </div>
              )}

              {/* Add New Master Item Input */}
              <div className="mt-6 flex flex-col sm:flex-row gap-2 max-w-xl">
                <Input
                  type="text"
                  placeholder={`Add new ${activeMasterSection === "departments" ? "department" : activeMasterSection === "designations" ? "designation" : "location"} name...`}
                  value={newMasterName}
                  onChange={(e) => setNewMasterName(e.target.value)}
                  className="text-xs h-9"
                  onKeyDown={async (e) => {
                    if (e.key === "Enter" && newMasterName.trim()) {
                      e.preventDefault();
                      const res = await addMasterItem(activeMasterSection, newMasterName);
                      if (res.success) {
                        setNewMasterName("");
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={async () => {
                    if (newMasterName.trim()) {
                      const res = await addMasterItem(activeMasterSection, newMasterName);
                      if (res.success) {
                        setNewMasterName("");
                      }
                    }
                  }}
                  className="h-9 px-4 text-xs font-semibold bg-[color:var(--color-brand-navy)] text-white hover:bg-[color:var(--color-brand-blue)] shrink-0 gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>
                    Add{" "}
                    {activeMasterSection === "departments"
                      ? "Department"
                      : activeMasterSection === "designations"
                        ? "Designation"
                        : "Location"}
                  </span>
                </Button>
              </div>

              {/* Master Items Table */}
              <div className="mt-6 overflow-hidden rounded-xl border border-border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-border">
                    <tr>
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {masters[activeMasterSection].map((item, idx) => {
                      const isEditing = editingMasterId === item.id;
                      const isActive = item.status === "ACTIVE";

                      return (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-4 py-3 font-medium text-muted-foreground w-12">
                            {idx + 1}
                          </td>
                          <td className="px-4 py-3">
                            {isEditing ? (
                              <div className="flex items-center gap-2 max-w-sm">
                                <Input
                                  value={editingMasterName}
                                  onChange={(e) => setEditingMasterName(e.target.value)}
                                  className="h-7 text-xs"
                                  autoFocus
                                />
                                <Button
                                  size="sm"
                                  className="h-7 px-2 text-[11px]"
                                  onClick={() => {
                                    if (editingMasterName.trim()) {
                                      updateMasterItem(activeMasterSection, item.id, {
                                        name: editingMasterName.trim(),
                                      });
                                    }
                                    setEditingMasterId(null);
                                  }}
                                >
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 px-2 text-[11px]"
                                  onClick={() => setEditingMasterId(null)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <span className="font-semibold text-slate-800">{item.name}</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              className={
                                isActive
                                  ? "bg-emerald-600 text-white text-[10px]"
                                  : "bg-slate-200 text-slate-700 text-[10px]"
                              }
                            >
                              {item.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {!isEditing && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setEditingMasterId(item.id);
                                    setEditingMasterName(item.name);
                                  }}
                                  className="h-7 px-2 text-[11px] gap-1"
                                >
                                  <Edit className="h-3 w-3" />
                                  <span>Rename</span>
                                </Button>
                              )}

                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toggleMasterStatus(activeMasterSection, item.id)}
                                className={`h-7 px-2 text-[11px] gap-1 ${
                                  isActive
                                    ? "text-slate-600 hover:text-slate-900"
                                    : "text-emerald-700 hover:text-emerald-800"
                                }`}
                              >
                                {isActive ? (
                                  <>
                                    <XCircle className="h-3 w-3" />
                                    <span>Deactivate</span>
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 className="h-3 w-3" />
                                    <span>Activate</span>
                                  </>
                                )}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================
          ADD / EDIT VACANCY MODAL (Mockup Panel 4)
          ======================================================== */}
      {jobsError && (
        <div
          role="alert"
          className="fixed bottom-4 left-4 z-50 max-w-md rounded border bg-white p-4 text-red-800"
        >
          {jobsError}
          <button className="ml-3 underline" onClick={() => void refreshJobs()}>
            Retry
          </button>
        </div>
      )}
      {authError && isAuthenticated && <p role="alert">{authError}</p>}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-white shadow-2xl my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h3 className="font-display text-lg font-bold text-[color:var(--color-brand-navy)]">
                  {editingJob ? "Edit Vacancy" : "Post New Vacancy"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Fill in the vacancy details to publish to the Milestone Careers portal.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <form
              onSubmit={handleSaveJob}
              className="flex-1 overflow-y-auto p-6 space-y-4"
              aria-busy={isSaving}
            >
              {saveError && (
                <p
                  role="alert"
                  className="rounded border border-red-300 bg-red-50 p-3 text-red-800"
                >
                  {saveError}
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Designation / Job Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Designation / Title *
                  </label>
                  <div className="mt-1 space-y-1.5">
                    {activeDesignations.length > 0 && (
                      <select
                        value={
                          activeDesignations.some((d) => d.name === formTitle)
                            ? formTitle
                            : "__custom__"
                        }
                        onChange={(e) => {
                          if (e.target.value !== "__custom__") {
                            handleTitleChange(e.target.value);
                          }
                        }}
                        className="h-8 w-full rounded-md border border-input bg-white px-2.5 text-xs shadow-xs focus:outline-none"
                      >
                        <option value="__custom__">
                          -- Select Master Designation or type below --
                        </option>
                        {activeDesignations.map((desig) => (
                          <option key={desig.id} value={desig.name}>
                            {desig.name}
                          </option>
                        ))}
                      </select>
                    )}
                    <Input
                      required
                      value={formTitle}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Senior Highway Project Manager"
                      className="text-xs"
                    />
                  </div>
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">URL Slug *</label>
                  <Input
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="e.g. senior-highway-project-manager"
                    className="mt-1 text-xs"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Department *</label>
                  <select
                    value={formDepartment}
                    onChange={(e) => setFormDepartment(e.target.value)}
                    className="mt-1 h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-xs shadow-xs focus:outline-none"
                  >
                    {/* Include active departments */}
                    {activeDepartments.map((dept) => (
                      <option key={dept.id} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                    {/* Preserve existing department if deactivated */}
                    {editingJob && !activeDepartments.some((d) => d.name === formDepartment) && (
                      <option value={formDepartment}>{formDepartment} (Inactive Master)</option>
                    )}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Location *</label>
                  <div className="mt-1 space-y-1.5">
                    {activeLocations.length > 0 && (
                      <select
                        value={
                          activeLocations.some((l) => l.name === formLocation)
                            ? formLocation
                            : "__custom__"
                        }
                        onChange={(e) => {
                          if (e.target.value !== "__custom__") {
                            setFormLocation(e.target.value);
                          }
                        }}
                        className="h-8 w-full rounded-md border border-input bg-white px-2.5 text-xs shadow-xs focus:outline-none"
                      >
                        <option value="__custom__">
                          -- Select Master Location or type below --
                        </option>
                        {activeLocations.map((loc) => (
                          <option key={loc.id} value={loc.name}>
                            {loc.name}
                          </option>
                        ))}
                      </select>
                    )}
                    <Input
                      required
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      placeholder="e.g. Nashik, Maharashtra"
                      className="text-xs"
                    />
                  </div>
                </div>

                {/* Employment Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Employment Type
                  </label>
                  <Input
                    value={formEmploymentType}
                    onChange={(e) => setFormEmploymentType(e.target.value)}
                    placeholder="e.g. Full Time"
                    className="mt-1 text-xs"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Experience Required *
                  </label>
                  <Input
                    required
                    value={formExperience}
                    onChange={(e) => setFormExperience(e.target.value)}
                    placeholder="e.g. 3+ Years"
                    className="mt-1 text-xs"
                  />
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Salary Range (Optional)
                  </label>
                  <Input
                    value={formSalary}
                    onChange={(e) => setFormSalary(e.target.value)}
                    placeholder="e.g. ₹35,000 - ₹50,000 / month"
                    className="mt-1 text-xs"
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Application Deadline
                  </label>
                  <Input
                    value={formDeadline}
                    onChange={(e) => setFormDeadline(e.target.value)}
                    placeholder="e.g. 31 Dec 2026"
                    className="mt-1 text-xs"
                  />
                </div>
              </div>

              {/* Status & Featured */}
              <div className="grid grid-cols-2 gap-4 border-t border-b border-border py-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Publishing Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as JobStatus)}
                    className="mt-1 h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-xs shadow-xs focus:outline-none"
                  >
                    <option value="ACTIVE">ACTIVE (Published publicly)</option>
                    <option value="CLOSED">CLOSED (Applications closed)</option>
                    <option value="DRAFT">DRAFT (Internal review)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured-check"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[color:var(--color-brand-orange)]"
                  />
                  <label htmlFor="featured-check" className="text-xs font-medium text-slate-700">
                    Highlight as Featured Vacancy
                  </label>
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Short Summary (Card Preview) *
                </label>
                <Textarea
                  required
                  rows={2}
                  value={formShortDescription}
                  onChange={(e) => setFormShortDescription(e.target.value)}
                  placeholder="1-2 sentences summarizing the role..."
                  className="mt-1 text-xs"
                />
              </div>

              {/* Full Job Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Detailed Job Overview *
                </label>
                <Textarea
                  required
                  rows={3}
                  value={formJobDescription}
                  onChange={(e) => setFormJobDescription(e.target.value)}
                  placeholder="Full scope of the position..."
                  className="mt-1 text-xs"
                />
              </div>

              {/* Responsibilities (One per line) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Key Responsibilities (One per line) *
                </label>
                <Textarea
                  required
                  rows={4}
                  value={formResponsibilities}
                  onChange={(e) => setFormResponsibilities(e.target.value)}
                  placeholder="Perform quality checks on concrete pavement&#10;Verify compliance with MoRTH specifications&#10;Maintain cube test register"
                  className="mt-1 text-xs font-mono text-[11px]"
                />
              </div>

              {/* Qualifications */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Required Educational Qualifications *
                </label>
                <Input
                  required
                  value={formQualifications}
                  onChange={(e) => setFormQualifications(e.target.value)}
                  placeholder="e.g. B.E. / B.Tech / Diploma in Civil Engineering"
                  className="mt-1 text-xs"
                />
              </div>

              {/* Experience Details */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Experience Specifics *
                </label>
                <Input
                  required
                  value={formRequiredExperience}
                  onChange={(e) => setFormRequiredExperience(e.target.value)}
                  placeholder="e.g. Minimum 3+ years in PMC, highway, or pavement works."
                  className="mt-1 text-xs"
                />
              </div>

              {/* Preferred Skills (One per line) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Technical Skills & Competencies (One per line)
                </label>
                <Textarea
                  rows={3}
                  value={formPreferredSkills}
                  onChange={(e) => setFormPreferredSkills(e.target.value)}
                  placeholder="MoRTH Standards&#10;Quality Assurance&#10;AutoCAD"
                  className="mt-1 text-xs font-mono text-[11px]"
                />
              </div>

              {/* Other Info */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Additional Notes / Benefits (Optional)
                </label>
                <Textarea
                  rows={2}
                  value={formOtherInfo}
                  onChange={(e) => setFormOtherInfo(e.target.value)}
                  placeholder="Site travel allowance, medical insurance, PF benefits provided..."
                  className="mt-1 text-xs"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  disabled={isSaving}
                  type="submit"
                  size="sm"
                  className="bg-[color:var(--color-brand-orange)] text-white hover:bg-[color:var(--color-brand-orange)]/90 text-xs font-semibold"
                >
                  {editingJob ? "Save Changes" : "Publish Vacancy"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
