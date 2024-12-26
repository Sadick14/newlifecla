/*const countdownDate = new Date("2025-12-31T00:00:00").getTime();

const interval = setInterval(function() {
  const now = new Date().getTime();
  const timeLeft = countdownDate - now;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

  if (timeLeft < 0) {
    clearInterval(interval);
    document.getElementById("countdown").innerText = "EXPIRED";
  }
}, 1000);*/


// Toggle Mobile Menu
const menuButton = document.getElementById("menu-button");
const closeButton = document.getElementById("close-menu");
const mobileMenu = document.getElementById("mobile-menu");

menuButton.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

closeButton.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});


document.getElementById("waitlist-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  // Validate form fields (optional)
  if (!fullname || !email) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill in all fields.",
    });
    return;
  }

  // Prepare the data using FormData
  const formData = new FormData();
  formData.append("fullname", fullname);
  formData.append("email", email);
  formData.append("phone", phone);

  try {
    // Send data to Zapier webhook
    const response = await fetch("https://hooks.zapier.com/hooks/catch/20838656/2i3qe28/", {
      method: "POST",
      body: formData,
    });

    // Explicitly handle response to avoid rendering raw JSON on mobile
    if (response.ok) {
      const result = await response.json();
      console.log("Response from Zapier:", result);

      // Show success message with SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Thank you for joining our waitlist! You will receive updates soon.",
        confirmButtonText: "OK",
      });

      // Optionally reset the form
      document.getElementById("waitlist-form").reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong. Please try again.",
      });
    }
  } catch (error) {
    console.error("Error submitting the form:", error);
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "There was an error. Please try again later.",
    });
  }
});
