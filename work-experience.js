const cvTrigger = document.getElementById("cv-trigger");
const cvForm = document.getElementById("cv-form");
const cvEmail = document.getElementById("cv-email");
const cvViewer = document.getElementById("cv-viewer");

cvTrigger.addEventListener("click", () => {
  cvForm.hidden = !cvForm.hidden;
  cvTrigger.setAttribute("aria-expanded", String(!cvForm.hidden));
  if (!cvForm.hidden) cvEmail.focus();
});

cvForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!cvForm.reportValidity()) return;
  cvViewer.hidden = false;
  cvForm.hidden = true;
  cvTrigger.hidden = true;
  cvTrigger.setAttribute("aria-expanded", "false");
  cvForm.reset();
  document.getElementById("cv-title").focus();
});

document.getElementById("cv-close").addEventListener("click", () => {
  cvViewer.hidden = true;
  cvTrigger.hidden = false;
  cvTrigger.focus();
});
