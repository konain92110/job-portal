import React from "react";
import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";
import { useSavedJobs } from "../context/SavedJobsContext";

export default function SavedJobs() {
  const { savedJobs } = useSavedJobs();

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2">Saved Jobs</h1>
          <p className="text-secondary mb-0">Your shortlist is stored in your browser.</p>
        </div>
        <Link to="/" className="btn btn-outline-primary">Browse Jobs</Link>
      </div>

      {savedJobs.length === 0 ? (
        <div className="alert alert-info">
          You have no saved jobs yet. Go back to the jobs page and click <strong>Save</strong>.
        </div>
      ) : (
        <div className="row g-4">
          {savedJobs.map((job) => (
            <div className="col-12 col-md-6 col-xl-3" key={job.slug}>
              <JobCard job={job} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}