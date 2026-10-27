"use strict";
const planets = {
  mercury: {
    name: "Mercury",
    region: "Inner planet · Terrestrial",
    order: "First",
    description:
      "Mercury is the smallest planet in our solar system and the closest planet to the Sun. Its rocky surface is covered in impact craters.",
    notes: ["A small, rocky world.", "The innermost of the eight planets."],
  },
  venus: {
    name: "Venus",
    region: "Inner planet · Terrestrial",
    order: "Second",
    description:
      "Venus is the second planet from the Sun. Thick clouds surround this rocky world, hiding its surface from ordinary visible-light views.",
    notes: [
      "One of the four terrestrial planets.",
      "Its cloud cover gives it a pale appearance.",
    ],
  },
  earth: {
    name: "Earth",
    region: "Inner planet · Terrestrial",
    order: "Third",
    description:
      "Earth is our home planet and the third world from the Sun. Oceans, continents and clouds shape the view that Apollo 17 astronauts photographed from space.",
    notes: [
      "The fifth-largest planet in the solar system.",
      "The only world where life is known to exist.",
    ],
  },
  mars: {
    name: "Mars",
    region: "Inner planet · Terrestrial",
    order: "Fourth",
    description:
      "Mars is the fourth planet from the Sun, a rocky world recognised for its reddish appearance. Spacecraft explore its surface and observe it from orbit.",
    notes: [
      "One of the four inner planets.",
      "Smaller than Earth, larger than Mercury.",
    ],
  },
  jupiter: {
    name: "Jupiter",
    region: "Outer planet · Gas giant",
    order: "Fifth",
    description:
      "Jupiter is the largest planet in our solar system. Swirling clouds and the Great Red Spot give this giant world its distinctive appearance.",
    notes: [
      "The fifth planet from the Sun.",
      "A gas giant without a hard outer surface.",
    ],
  },
  saturn: {
    name: "Saturn",
    region: "Outer planet · Gas giant",
    order: "Sixth",
    description:
      "Saturn is the sixth planet from the Sun and the second largest in our solar system. Its broad rings make it one of the most recognisable planets.",
    notes: [
      "An outer gas giant.",
      "Photographed in detail by the Cassini spacecraft.",
    ],
  },
  uranus: {
    name: "Uranus",
    region: "Outer planet · Ice giant",
    order: "Seventh",
    description:
      "Uranus is the seventh planet from the Sun and the third largest. This pale blue world belongs to the outer solar system and is classified as an ice giant.",
    notes: ["An ice giant, like Neptune.", "Shown here in a Voyager 2 image."],
  },
  neptune: {
    name: "Neptune",
    region: "Outer planet · Ice giant",
    order: "Eighth",
    description:
      "Neptune is the eighth and most distant of the eight planets. Blue cloud bands and storms appear in spacecraft views of this outer world.",
    notes: [
      "The fourth-largest planet.",
      "An ice giant in the outer solar system.",
    ],
  },
};
const cards = [...document.querySelectorAll(".planet-card")];
const filters = [...document.querySelectorAll(".filter")];
const search = document.getElementById("planetSearch");
let activeFilter = "all";
function filterPlanets() {
  const query = search.value.trim().toLowerCase();
  let count = 0;
  cards.forEach((card) => {
    const matchesRegion =
      activeFilter === "all" || card.dataset.region === activeFilter;
    const matchesName = planets[card.dataset.planet].name
      .toLowerCase()
      .includes(query);
    const visible = matchesRegion && matchesName;
    card.hidden = !visible;
    card.classList.remove("card-enter");
    if (visible) {
      count++;
      void card.offsetWidth;
      card.classList.add("card-enter");
    }
  });
  document.getElementById("results").textContent =
    `Showing ${count} ${count === 1 ? "world" : "worlds"}`;
  document.getElementById("emptyState").hidden = count !== 0;
}
filters.forEach((button) =>
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle("active", selected);
      filter.setAttribute("aria-pressed", String(selected));
    });
    filterPlanets();
  }),
);
search.addEventListener("input", filterPlanets);
const dialog = document.getElementById("planetDialog");
const dialogContent = document.getElementById("dialogContent");
let previousFocus;
function showDialog(html) {
  previousFocus = document.activeElement;
  dialogContent.innerHTML = html;
  dialog.showModal();
  document.querySelector(".dialog-close").focus();
}
cards.forEach((card) =>
  card.addEventListener("click", () => {
    const id = card.dataset.planet;
    const planet = planets[id];
    showDialog(
      `<p class="eyebrow">FIELD NOTES / ${planet.region.toUpperCase()}</p><img src="images/${id}.jpg" alt="${planet.name} photographed from space"><h2 id="dialogTitle">${planet.name}</h2><p>${planet.description}</p><ul class="field-notes"><li>${planet.order} planet from the Sun.</li>${planet.notes.map((note) => `<li>${note}</li>`).join("")}</ul><p class="small-note">Images and facts: <a href="https://science.nasa.gov/solar-system/planets/" target="_blank" rel="noopener noreferrer">NASA Science ↗</a></p>`,
    );
  }),
);
document.getElementById("openGuide").addEventListener("click", () => {
  showDialog(
    '<p class="eyebrow">GET YOUR BEARINGS</p><h2 id="dialogTitle">Your cosmic field guide.</h2><p>Start with the eight planets in our solar system.</p><ol class="field-notes"><li>Choose All worlds, Inner planets or Outer planets.</li><li>Type a planet name in the search box.</li><li>Select a card to open its field notes.</li><li>Visit the observatory to pause and resume the orbital animation.</li></ol><p class="small-note">The orbital sketch is illustrative: sizes, distances and speeds are not to scale.</p>',
  );
});
document
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (
    event.target === dialog &&
    (event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom)
  )
    dialog.close();
});
dialog.addEventListener("close", () => {
  if (previousFocus) previousFocus.focus({ preventScroll: true });
});
const orbitModel = document.querySelector(".orbit-model");
const orbitButton = document.getElementById("orbitToggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
function syncMotionPreference() {
  if (reducedMotion.matches) {
    orbitModel.classList.add("paused");
    orbitButton.setAttribute("aria-pressed", "true");
    orbitButton.textContent = "Reduced motion enabled";
    orbitButton.disabled = true;
  } else {
    orbitButton.disabled = false;
    orbitModel.classList.remove("paused");
    orbitButton.setAttribute("aria-pressed", "false");
    orbitButton.innerHTML = "Pause orbits <span>Ⅱ</span>";
  }
}
syncMotionPreference();
reducedMotion.addEventListener("change", syncMotionPreference);
orbitButton.addEventListener("click", () => {
  const paused = orbitModel.classList.toggle("paused");
  orbitButton.setAttribute("aria-pressed", String(paused));
  orbitButton.innerHTML = paused
    ? "Resume orbits <span>▷</span>"
    : "Pause orbits <span>Ⅱ</span>";
});
const menuButton = document.querySelector(".menu-button");
const navigation = document.getElementById("navigation");
menuButton.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
navigation.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }),
);
const backTop = document.getElementById("backToTop");
function updateScroll() {
  backTop.hidden = window.scrollY < 500;
}
window.addEventListener("scroll", updateScroll, { passive: true });
updateScroll();
backTop.addEventListener("click", () =>
  window.scrollTo({
    top: 0,
    behavior: reducedMotion.matches ? "instant" : "smooth",
  }),
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        navigation
          .querySelectorAll("a")
          .forEach((link) =>
            link.classList.toggle(
              "active",
              link.hash === `#${entry.target.id}`,
            ),
          );
    });
  },
  { rootMargin: "-15% 0px -55% 0px" },
);
["home", "explore", "observatory"].forEach((id) =>
  observer.observe(document.getElementById(id)),
);
