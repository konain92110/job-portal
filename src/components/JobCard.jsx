import React from "react";
import { Link } from "react-router-dom";
import { useSavedJobs } from "../context/SavedJobsContext";
import { getCategory, stripHtml } from "../utils/text";

export default function JobCard({ job }) {
  const { isSaved, toggleSaved } = useSavedJobs();

  return (
    <article className="card h-100 shadow-sm border-0 job-card">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between gap-2">
          <span className="badge text-bg-light border">{getCategory(job)}</span>
          <button
            type="button"
            className={`btn btn-sm ${isSaved(job.slug) ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => toggleSaved(job)}
          >
            {isSaved(job.slug) ? "Saved" : "Save"}
          </button>
        </div>

        <h2 className="h5 mt-3">{job.title}</h2>
        <p className="text-secondary mb-2">{job.company_name}</p>

        <div className="small text-secondary mb-3">
          <div>📍 {job.location || "Location not specified"}</div>
          <div>💼 {job.job_types?.join(", ") || "Not specified"}</div>
          {job.remote && <div>🏠 Remote</div>}
        </div>

        <p className="small text-secondary flex-grow-1">
          {stripHtml(job.description).slice(0, 170)}
          {stripHtml(job.description).length > 170 ? "..." : ""}
        </p>

        <Link className="btn btn-primary w-100" to={`/job/${job.slug}`}>
          View Details
        </Link>
      </div>
    </article>
  );
}