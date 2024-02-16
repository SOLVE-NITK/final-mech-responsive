const data = [
  {
    title: "Position analysis of Grashof four bar mechanism",
    path: "exp_position_analysis_grashof_nitk",
    intern: "Prajna",
  },
  {
    title: "Velocity analysis of Grashof four bar mechanism",
    path: "exp_velocity_analysis_grashof_nitk",
    intern: "Shwetha",
  },
  {
    title: "Acceleration analysis of Grashof four bar mechanism",
    path: "exp_acceleration_analysis_grashof_nitk",
    intern: "Varun",
  },
  {
    title: "Position analysis of NonGrashof four bar mechanism",
    path: "exp_position_analysis_nongrashof_nitk",
    intern: "Shwetha",
  },
  {
    title: "Velocity analysis of NonGrashof four bar mechanism",
    path: "exp_velocity_analysis_nongrashof_nitk",
    intern: "Prajna",
  },
  {
    title: "Acceleration analysis of NonGrashof four bar mechanism",
    path: "exp_acceleration_analysis_nongrashof_nitk",
    intern: "Varun",
  },
  {
    title: "Position analysis of Slider crank mechanism",
    path: "exp_position_analysis_slider_crank_nitk",
    intern: "Saishree",
  },
  {
    title: "Velocity analysis of Slider crank mechanism",
    path: "exp_velocity_analysis_slider_crank_nitk",
    intern: "Prajwal",
  },
  {
    title: "Acceleration analysis of Slider crank mechanism",
    path: "exp_acceleration_analysis_slider_crank_nitk",
    intern: "Akshaya",
  },
  {
    title: "Position analysis of Slider crank mechanism with Offset",
    path: "exp_position_analysis_slider_crank_offset_nitk",
    intern: "Anusha",
  },
  {
    title: "Position analysis of Scotch Yoke Mechanism",
    path: "exp_position_analysis_scotch_yoke_nitk",
    intern: "Karthik Ganapa, AJIET",
  },
  {
    title: "Velocity analysis of Scotch Yoke Mechanism",
    path: "exp_velocity_analysis_scotch_yoke_nitk",
    intern: "Snehith, AJIET",
  },
  {
    title: "Acceleration analysis of Scotch Yoke Mechanism",
    path: "exp_acceleration_analysis_scotch_yoke_nitk",
    intern: "Adithya, AJIET",
  },
  {
    title: "Position analysis of Elliptical Trammel",
    path: "exp_position_analysis_elliptical_trammel_nitk",
    intern: "Karthik Ganapa, AJIET",
  },
  {
    title: "Hart Straight Line Mechanism",
    path: "exp_hart_straight_line_nitk",
    intern: "Adithya, AJIET",
  },
  {
    title: "Peaucellier Straight Line Mechanism",
    path: "exp_peaucellier_straight_line_nitk",
    intern: "Druthi, AJIET",
  },
  {
    title: "Elliptical Cam Mechanism",
    path: "exp_elliptical_cam_mechanism_nitk",
    intern: "Anaum Fathima, AJIET",
  },
  {
    title: "Eccentric Cam Mechanism",
    path: "exp_eccentric_cam_mechanism_nitk",
    intern: "Druthi, AJIET",
  },
  {
    title: "Klann Mechanism",
    path: "exp_klann_mechanism_nitk",
    intern: "Druthi, AJIET",
  },
  {
    title: "Jansen Linkage Model",
    path: "exp_jansen_linkage_model_nitk",
    intern: "Anaum Fathima, AJIET",
  },
  {
    title: "Chebyshev's Straight Line Mechanism",
    path: "exp_tchebichev_straight_line_nitk",
    intern: "Snehith, AJIET",
  },
  {
    title: "Whitworth Mechanism",
    path: "exp_whitworth_mechanism_nitk",
    intern: "Anaum Fathima, AJIET",
  },
  {
    title: "Crank and Slotted Mechanism",
    path: "exp_crank_slotted_mechanism_nitk",
    intern: "Anaum Fathima, AJIET",
  },
  {
    title: "Universal Joint",
    path: "exp_universal_joint_nitk",
    intern: "Karthik Ganapa, AJIET",
  },
];
const filterInput = function (val) {
  const filteredArray = data.filter(
    (d) =>
      d.title.toLowerCase().includes(val.toLowerCase()) ||
      d.intern.toLowerCase().includes(val.toLowerCase())
  );
  displayExperiments(filteredArray);
};

const searchInput = document.querySelector(".search__input");
searchInput.addEventListener("input", function (e) {
  filterInput(e.target.value);
});

const row = document.querySelector(".row");
const displayExperiments = function (data) {
  row.innerHTML = "";
  data.forEach((d) => {
    const col = document.createElement("div");
    col.classList.add("col");
    col.textContent = d.title;
    const intern = document.createElement("p");
    intern.classList.add("intern");
    // intern.textContent = d.intern;
    const link = document.createElement("a");
    link.classList.add("link");
    link.href = `${d.path}/index.html`;
    link.target = "_blank";
    // link.textContent = "Click Here";
    // col.appendChild(intern);
    link.appendChild(col);
    row.appendChild(link);
  });
};
displayExperiments(data);

console.log(data.map((d) => d.title));
