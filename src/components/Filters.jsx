import React from "react";

export default function Filters({
  search,
  setSearch,
  jobType,
  setJobType,
  location,
  setLocation,
  category,
  setCategory,
  jobTypes = [],
  locations = [],
  categories = [],
  onReset,
}) {
  return (
    <div className="filter-card">
      <div className="filter-header">
        <div>
          <h5 className="mb-1">Search & Filter Jobs</h5>
          <p className="text-secondary mb-0 small">
            Find your next European job opportunity
          </p>
        </div>
      </div>

      <div className="row g-3 mt-1">

        {/* Search */}
        <div className="col-12 col-md-6 col-lg-3">
          <label className="form-label">
            Search Jobs
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Job title, company..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* Job Type */}
        <div className="col-12 col-md-6 col-lg-3">
          <label className="form-label">
            Job Type
          </label>

          <select
            className="form-select"
            value={jobType}
            onChange={(e) =>
              setJobType(e.target.value)
            }
          >
            <option value="">All Types</option>

            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="col-12 col-md-6 col-lg-3">
          <label className="form-label">
            Location
          </label>

          <select
            className="form-select"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          >
            <option value="">
              All Locations
            </option>

            {locations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="col-12 col-md-6 col-lg-3">
          <label className="form-label">
            Category
          </label>

          <select
            className="form-select"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="">
              All Categories
            </option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="col-12 d-flex gap-2 mt-2">

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {}}
          >
            Search Jobs
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onReset}
          >
            Reset Filters
          </button>

        </div>
      </div>
    </div>
  );
}