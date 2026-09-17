import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import SavedJobs from "./pages/SavedJobs";
import Apply from "./pages/Apply";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Navbar />

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job/:slug" element={<JobDetails />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/apply/:slug" element={<Apply />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="border-top mt-5 py-4 text-center text-secondary">
        JobFinder · ReactJS + REST API + Bootstrap 5
      </footer>
    </>
  );
}