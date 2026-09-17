import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchJobs } from "../api/jobsApi";
import { useSavedJobs } from "../context/SavedJobsContext";

export default function JobDetails() {
  const { slug } = useParams();
  const { isSaved, toggleSaved } = useSavedJobs();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const jobs = await fetchJobs();
        const found = jobs.find((item) => item.slug === slug);

        if (!found) {
          setError("Job not found.");
        } else {
          setJob(found);
        }
      } catch {
        setError("Could not load job details.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-9">
        <Link
          to="/"
          className="btn btn-sm btn-outline-secondary mb-4"
        >
          ← Back to Jobs
        </Link>

        <article className="card border-0 shadow-sm">
          <div className="card-body p-4 p-md-5">
            <div className="d-flex flex-wrap justify-content-between gap-3">
              <div>
                <h1 className="h2">{job.title}</h1>
                <p className="lead text-secondary">
                  {job.company_name}
                </p>
              </div>

              <button
                className={`btn ${
                  isSaved(job.slug)
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => toggleSaved(job)}
              >
                {isSaved(job.slug)
                  ? "Remove from Saved"
                  : "Save Job"}
              </button>
            </div>

            <div className="d-flex flex-wrap gap-2 my-3">
              <span className="badge text-bg-light border">
                📍 {job.location || "Not specified"}
              </span>

              <span className="badge text-bg-light border">
                💼 {job.job_types?.join(", ") || "Not specified"}
              </span>

              {job.remote && (
                <span className="badge text-bg-success">
                  Remote
                </span>
              )}

              {(job.tags || []).map((tag) => (
                <span
                  className="badge text-bg-secondary"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>

            <hr />

            <h2 className="h4">Job Description</h2>

            <div
              className="job-description"
              dangerouslySetInnerHTML={{
                __html: job.description,
              }}
            />

            <div className="mt-4 d-flex flex-wrap gap-2">
              <Link
                className="btn btn-primary"
                to={`/apply/${job.slug}`}
              >
                Apply / Contact Form
              </Link>

              <a
                className="btn btn-outline-secondary"
                href={job.url}
                target="_blank"
                rel="noreferrer"
              >
                Original Job
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}