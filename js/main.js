document.addEventListener("DOMContentLoaded", function () {
  /* -------------------------------------------
     1. Dynamically Load Sponsor Images
  ------------------------------------------- */
  fetch("assets/sponsors.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("Loaded Sponsor Images:", data); // Print the JSON list to the console

      const sponsorTrack = document.querySelector(".sponsor-track");
      if (sponsorTrack) {
        sponsorTrack.innerHTML = ""; // Clear any existing content

        // Append images twice to create a seamless infinite loop
        for (let i = 0; i < 2; i++) {
          data.forEach((fileName) => {
            console.log(`Adding sponsor image: assets/sponsors/${fileName}`);

            const sponsorItem = document.createElement("div");
            sponsorItem.classList.add("sponsor-item");

            const img = document.createElement("img");
            img.src = `assets/sponsors/${fileName}`;
            img.alt = fileName.split(".")[0];

            sponsorItem.appendChild(img);
            sponsorTrack.appendChild(sponsorItem);
          });
        }
      }
    })
    .catch((error) => console.error("Error loading sponsor images:", error));

  /* -------------------------------------------
     2. Wagen Items Slide-in on Scroll (optional)
  ------------------------------------------- */
  const wagenItems = document.querySelectorAll(".wagen-item");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  wagenItems.forEach((item) => {
    observer.observe(item);
  });
});