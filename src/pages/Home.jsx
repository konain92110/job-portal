import React, { useEffect, useMemo, useState } from "react";
import { fetchJobs } from "../api/jobsApi";
import Filters from "../components/Filters";
import JobCard from "../components/JobCard";
import { getCategory } from "../utils/text";

const PAGE_SIZE = 8;

// European countries for search
const EUROPE_COUNTRIES = [
  "Germany",
  "Poland",
  "Netherlands",
  "France",
  "Italy",
  "Spain",
  "Belgium",
  "Austria",
  "Sweden",
  "Denmark",
  "Norway",
  "Finland",
  "Ireland",
  "Portugal",
  "Switzerland",
  "Czech Republic",
];

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  // Load jobs from REST API
  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchJobs();
        setJobs(data);
      } catch (err) {
        console.error(err);
        setError("Could not load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  // Create filter options from actual API data
  const options = useMemo(() => {
    const types = [
      ...new Set(
        jobs.flatMap((job) => job.job_types || [])
      ),
    ].sort();

    const locations = [
      ...new Set(
        jobs
          .map((job) => job.location)
          .filter(Boolean)
      ),
    ].sort();

    const categories = [
      ...new Set(
        jobs
          .map((job) => getCategory(job))
          .filter(Boolean)
      ),
    ].sort();

    return {
      types,
      locations,
      categories,
    };
  }, [jobs]);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const jobTitle = job.title || "";
      const company = job.company_name || "";
      const description = job.description || "";
      const jobLocation = job.location || "";

      const jobText = `
        ${jobTitle}
        ${company}
        ${description}
        ${jobLocation}
      `.toLowerCase();

      // Search
      const searchMatch =
        !query || jobText.includes(query);

      // Job type
      const typeMatch =
        !jobType ||
        (job.job_types || []).includes(jobType);

      // Location
      const locationMatch =
        !location ||
        jobLocation.toLowerCase() ===
          location.toLowerCase();

      // Category
      const categoryMatch =
        !category ||
        getCategory(job) === category;

      return (
        searchMatch &&
        typeMatch &&
        locationMatch &&
        categoryMatch
      );
    });
  }, [
    jobs,
    search,
    jobType,
    location,
    category,
  ]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [
    search,
    jobType,
    location,
    category,
  ]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredJobs.length / PAGE_SIZE
    )
  );

  const visibleJobs = filteredJobs.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Reset filters
  function resetFilters() {
    setSearch("");
    setJobType("");
    setLocation("");
    setCategory("");
    setPage(1);
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero rounded-4 p-4 p-md-5 mb-4">
        <span className="badge text-bg-primary mb-3">
          Europe Job Portal
        </span>

        <h1 className="display-6 fw-bold">
          Find Your Dream Job in Europe
        </h1>

        <p className="lead text-secondary">
          Search and find jobs across Germany,
          Poland, Netherlands, France, Italy
          and Spain.
        </p>

        {/* Europe country quick search */}
        <div className="mt-4">
          <p className="small text-secondary mb-2">
            Popular European countries:
          </p>

          <div className="d-flex flex-wrap gap-2">
            {EUROPE_COUNTRIES.slice(0, 8).map(
              (country) => (
                <button
                  key={country}
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => {
                    setSearch(country);
                    setPage(1);
                  }}
                >
                  {country}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Filters */}
      <Filters
        search={search}
        setSearch={setSearch}
        jobType={jobType}
        setJobType={setJobType}
        location={location}
        setLocation={setLocation}
        category={category}
        setCategory={setCategory}
        jobTypes={options.types}
        locations={options.locations}
        categories={options.categories}
        onReset={resetFilters}
      />

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <div
            className="spinner-border text-primary"
            role="status"
          ></div>

          <p className="mt-3 text-secondary">
            Loading European jobs...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* Jobs */}
      {!loading && !error && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="h4 mb-1">
                Latest European Jobs
              </h2>

              <p className="text-secondary mb-0">
                {filteredJobs.length} jobs found
              </p>
            </div>

            {(search ||
              jobType ||
              location ||
              category) && (
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={resetFilters}
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* No jobs */}
          {visibleJobs.length === 0 ? (
            <div className="alert alert-info">
              <strong>No jobs found.</strong>
              <br />
              Try another search or clear the filters.
              <br />
              <button
                type="button"
                className="btn btn-primary btn-sm mt-3"
                onClick={resetFilters}
              >
                Show All Jobs
              </button>
            </div>
          ) : (
            <>
              {/* Job Cards */}
              <div className="row g-4">
                {visibleJobs.map((job) => (
                  <div
                    className="col-12 col-md-6 col-xl-3"
                    key={job.slug}
                  >
                    <JobCard job={job} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  className="mt-5"
                  aria-label="Job pagination"
                >
                  <ul className="pagination justify-content-center">

                    {/* Previous */}
                    <li
                      className={`page-item ${
                        page === 1
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <button
                        type="button"
                        className="page-link"
                        disabled={page === 1}
                        onClick={() =>
                          setPage((current) =>
                            Math.max(
                              1,
                              current - 1
                            )
                          )
                        }
                      >
                        Previous
                      </button>
                    </li>

                    {/* Page numbers */}
                    {Array.from(
                      {
                        length: totalPages,
                      },
                      (_, index) => index + 1
                    ).map((pageNumber) => (
                      <li
                        key={pageNumber}
                        className={`page-item ${
                          page === pageNumber
                            ? "active"
                            : ""
                        }`}
                      >
                        <button
                          type="button"
                          className="page-link"
                          onClick={() =>
                            setPage(pageNumber)
                          }
                        >
                          {pageNumber}
                        </button>
                      </li>
                    ))}

                    {/* Next */}
                    <li
                      className={`page-item ${
                        page === totalPages
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <button
                        type="button"
                        className="page-link"
                        disabled={
                          page === totalPages
                        }
                        onClick={() =>
                          setPage((current) =>
                            Math.min(
                              totalPages,
                              current + 1
                            )
                          )
                        }
                      >
                        Next
                      </button>
                    </li>

                  </ul>
                </nav>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}