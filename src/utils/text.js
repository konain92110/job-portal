export function stripHtml(html = "") {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
}

export function getCategory(job) {
  return job?.tags?.[0] || "Other";
}