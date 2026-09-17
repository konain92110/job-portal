import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSavedJobs } from "../context/SavedJobsContext";

export default function Navbar() {
  const { savedJobs } = useSavedJobs();

  const navClass = ({ isActive }) =>
    `nav-link ${isActive ? "active fw-semibold" : ""}`;

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          JobFinder
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <div className="navbar-nav ms-auto">
            <NavLink className={navClass} to="/">
              Jobs
            </NavLink>

            <NavLink className={navClass} to="/saved">
              Saved Jobs{" "}
              <span className="badge text-bg-primary">
                {savedJobs.length}
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}