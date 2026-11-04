// src/hooks/use-careers.ts
import { useState, useEffect, useCallback } from "react";
import {
  type Job,
  type JobStatus,
  type CareerMasters,
  type CareerMasterItem,
  initialMasters,
} from "@/config/careers";

export function useCareersStore(isAdmin = false, enabled = true) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const endpoint = isAdmin ? "/api/admin/jobs" : "/api/careers/jobs";
      const res = await fetch(endpoint, {
        headers: { "Cache-Control": "no-cache" },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        if (res.status === 401 && isAdmin) {
          // Unauthenticated admin; clear list
          setJobs([]);
          setError(
            "Your session expired. Sign in again to continue. Your unsaved form is retained.",
          );
          return;
        }

        const errorMsg =
          errorData.error ||
          (res.status === 503
            ? "Careers storage is not configured"
            : `Failed to fetch vacancies (Status ${res.status})`);

        setError(errorMsg);
        setJobs([]);
        return;
      }

      const data: Job[] = await res.json();
      if (Array.isArray(data)) {
        setJobs(data);
      } else {
        setJobs([]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unable to reach careers storage.";
      setError(msg);
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (enabled) void fetchJobs();
    else {
      setJobs([]);
      setIsLoading(false);
    }
  }, [fetchJobs, enabled]);

  // Add Job (Admin only, calls server endpoint)
  const addJob = async (
    jobInput: Omit<Job, "id" | "createdAt" | "updatedAt">,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobInput),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errMsg =
          (data.details
            ? Object.entries(data.details)
                .map(
                  ([field, messages]) =>
                    `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`,
                )
                .join("; ")
            : data.error) || "Failed to create vacancy in Vercel Blob.";
        setError(errMsg);
        return { success: false, error: errMsg };
      }

      const created: Job = data;
      setJobs((prev) => [created, ...prev]);
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // Update Job (Admin only, calls server endpoint)
  const updateJob = async (
    id: string,
    updates: Partial<Job>,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          updatedAt: jobs.find((job) => job.id === id)?.updatedAt,
          ...updates,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errMsg =
          (data.details
            ? Object.entries(data.details)
                .map(
                  ([field, messages]) =>
                    `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`,
                )
                .join("; ")
            : data.error) || "Failed to update vacancy in Vercel Blob.";
        setError(errMsg);
        return { success: false, error: errMsg };
      }

      const updated: Job = data;
      setJobs((prev) => prev.map((j) => (j.id === id ? updated : j)));
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // Toggle or Set Job Status
  const setJobStatus = async (
    id: string,
    status: JobStatus,
  ): Promise<{ success: boolean; error?: string }> => {
    return updateJob(id, { status });
  };

  // Delete Job (Admin only, calls server endpoint)
  const deleteJob = async (id: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch(`/api/admin/jobs?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errMsg =
          (data.details
            ? Object.entries(data.details)
                .map(
                  ([field, messages]) =>
                    `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`,
                )
                .join("; ")
            : data.error) || "Failed to delete vacancy from Vercel Blob.";
        setError(errMsg);
        return { success: false, error: errMsg };
      }

      setJobs((prev) => prev.filter((j) => j.id !== id));
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      return { success: false, error: msg };
    }
  };

  return {
    jobs,
    activeJobs: jobs.filter((j) => j.status === "ACTIVE"),
    isLoading,
    error,
    refreshJobs: fetchJobs,
    addJob,
    updateJob,
    setJobStatus,
    deleteJob,
  };
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string>("");

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/session", {
        headers: { "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(Boolean(data.authenticated));
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsAuthChecking(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = async (password: string): Promise<{ success: boolean; error?: string }> => {
    setAuthError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errMsg =
          (data.details
            ? Object.entries(data.details)
                .map(
                  ([field, messages]) =>
                    `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`,
                )
                .join("; ")
            : data.error) || "Authentication failed.";
        setAuthError(errMsg);
        return { success: false, error: errMsg };
      }

      setIsAuthenticated(true);
      return { success: true };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Network error during login.";
      setAuthError(errMsg);
      return { success: false, error: errMsg };
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (!response.ok) throw new Error("Logout failed. Please retry.");
      setIsAuthenticated(false);
    } catch (err) {
      console.warn("Logout error:", err);
      setAuthError("Logout could not be confirmed. Please retry.");
    }
  };

  return {
    isAuthenticated,
    isAuthChecking,
    authError,
    login,
    logout,
    checkSession,
  };
}

export function useCareersConfig() {
  const [hrEmail, setHrEmail] = useState<string>("info@milestoneconsultancy.in");

  useEffect(() => {
    let isMounted = true;
    fetch("/api/careers/config")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data?.hrEmail) {
          setHrEmail(data.hrEmail);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return { hrEmail };
}

export function useAdminMasters(isAuthenticated?: boolean) {
  const [masters, setMasters] = useState<CareerMasters>(initialMasters);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMasters = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/admin/masters", {
        headers: { "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        if (
          data &&
          Array.isArray(data.departments) &&
          Array.isArray(data.designations) &&
          Array.isArray(data.locations)
        ) {
          setMasters(data);
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        if (res.status !== 401) {
          setError(errData.error || `Failed to fetch masters (${res.status})`);
        }
      }
    } catch {
      // keep default initialMasters
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated !== false) {
      fetchMasters();
    }
  }, [fetchMasters, isAuthenticated]);

  const saveMasters = async (
    updated: CareerMasters,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setError(null);
      const res = await fetch("/api/admin/masters", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const errMsg =
          (data.details
            ? Object.entries(data.details)
                .map(
                  ([field, messages]) =>
                    `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`,
                )
                .join("; ")
            : data.error) || "Failed to update masters.";
        setError(errMsg);
        return { success: false, error: errMsg };
      }

      const savedData = await res.json().catch(() => updated);
      setMasters(savedData);
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const addMasterItem = async (
    type: "departments" | "designations" | "locations",
    name: string,
  ): Promise<{ success: boolean; error?: string }> => {
    const trimmed = name.trim();
    if (!trimmed) return { success: false, error: "Name cannot be empty." };

    const newItem: CareerMasterItem = {
      id: `${type.slice(0, 4)}-${Date.now()}`,
      name: trimmed,
      status: "ACTIVE",
    };

    const updated: CareerMasters = {
      ...masters,
      [type]: [...masters[type], newItem],
    };

    return saveMasters(updated);
  };

  const updateMasterItem = async (
    type: "departments" | "designations" | "locations",
    id: string,
    updates: Partial<CareerMasterItem>,
  ): Promise<{ success: boolean; error?: string }> => {
    const updated: CareerMasters = {
      ...masters,
      [type]: masters[type].map((item) => (item.id === id ? { ...item, ...updates } : item)),
    };

    return saveMasters(updated);
  };

  const toggleMasterStatus = async (
    type: "departments" | "designations" | "locations",
    id: string,
  ): Promise<{ success: boolean; error?: string }> => {
    const item = masters[type].find((i) => i.id === id);
    if (!item) return { success: false, error: "Item not found." };
    const nextStatus = item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    return updateMasterItem(type, id, { status: nextStatus });
  };

  return {
    masters,
    activeDepartments: masters.departments.filter((d) => d.status === "ACTIVE"),
    activeDesignations: masters.designations.filter((d) => d.status === "ACTIVE"),
    activeLocations: masters.locations.filter((l) => l.status === "ACTIVE"),
    isLoading,
    error,
    refreshMasters: fetchMasters,
    addMasterItem,
    updateMasterItem,
    toggleMasterStatus,
  };
}
