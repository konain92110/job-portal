import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchJobs } from "../api/jobsApi";

const initialForm = { name: "", email: "", message: "" };

export default function Apply() {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchJobs().then((jobs) => {
      setJob(jobs.find((item) => item.slug === slug) || null);
    }).catch(() => {});
  }, [slug]);

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (form.message.trim().length < 10) next.message = "Message must be at least 10 characters.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-7">
        <Link to={job ? `/job/${job.slug}` : "/"} className="btn btn-sm btn-outline-secondary mb-4">
          ← Back
        </Link>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-md-5">
            <h1 className="h3">Application / Contact Form</h1>
            <p className="text-secondary">{job ? `Applying for: ${job.title}` : "Job application"}</p>

            {submitted ? (
              <div className="alert alert-success">
                Form submitted successfully! (Demo submission — no real application was sent.)
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    rows="5"
                    className={`form-control ${errors.message ? "is-invalid" : ""}`}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your application message..."
                  />
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>

                <button className="btn btn-primary w-100" type="submit">Submit Application</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}