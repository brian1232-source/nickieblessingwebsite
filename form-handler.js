document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll('form[action^="https://formspree.io/"]');

  forms.forEach((form) => {
    const button = form.querySelector('button[type="submit"]');
    const status = document.createElement("p");
    status.className = "form-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    form.appendChild(status);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const trap = form.querySelector('input[name="website"]');
      if (trap && trap.value) return;

      button.disabled = true;
      status.textContent = "Sending your message...";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });

        if (!response.ok) throw new Error("The form submission failed.");

        form.reset();
        status.textContent = "Thank you. Your message was sent successfully.";
      } catch (error) {
        status.textContent = "Something went wrong. Please try again.";
      } finally {
        button.disabled = false;
      }
    });
  });
});
