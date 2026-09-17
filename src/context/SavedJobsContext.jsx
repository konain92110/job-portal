import React, { createContext, useContext, useEffect, useState } from "react";

const SavedJobsContext = createContext(null);
const STORAGE_KEY = "jobfinder_saved_jobs";

export function SavedJobsProvider({ children }) {
  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedJobs));
  }, [savedJobs]);

  function isSaved(slug) {
    return savedJobs.some((job) => job.slug === slug);
  }

  function toggleSaved(job) {
    setSavedJobs((current) =>
      current.some((item) => item.slug === job.slug)
        ? current.filter((item) => item.slug !== job.slug)
        : [...current, job]
    );
  }

  return (
    <SavedJobsContext.Provider value={{ savedJobs, isSaved, toggleSaved }}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  return useContext(SavedJobsContext);
}