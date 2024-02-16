
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");


//Initialise system parameters here
function varinit() {
  varchange();
  //Variable slider and number input types
  $("#omegaslider").slider("value", 25); // slider initialisation : jQuery widget
  $("#omegaspinner").spinner("value", 25); // number initialisation : jQuery widget
  $("#betaslider").slider("value", 1500);
  $("#betaspinner").spinner("value", 1500);
  $("#thetaslider").slider("value", 0.05);
  $("#thetaspinner").spinner("value", 0.05);
  $("#CsArea").spinner("value", 0.01);
  $("#Ivalue").spinner("value", 0.01);
}
function varchange() {
  $("#omegaslider").slider({ max: 2, min: 0.1, step: 0.1 });
  $("#omegaspinner").spinner({ max: 2, min: 0.1, step: 0.1 });

  $("#omegaslider").on("slide", function (e, ui) {
    $("#omegaspinner").spinner("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#omegaspinner").on("spin", function (e, ui) {
    $("#omegaslider").slider("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#omegaspinner").on("change", function () {
    varchange();
  });

  $("#betaslider").slider({ max: 60, min: 0, step: 1 });
  $("#betaspinner").spinner({ max: 60, min: 0, step: 1 });

  $("#betaslider").on("slide", function (e, ui) {
    $("#betaspinner").spinner("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#betaspinner").on("spin", function (e, ui) {
    $("#betaslider").slider("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#betaspinner").on("change", function () {
    varchange();
  });
  $("#betaspinner").on("touch-start", function () {
    varchange();
  });

  $("#thetaslider").slider({ max: 360, min: 0, step: 1 });
  $("#thetaspinner").spinner({ max: 360, min: 0, step: 1 });

  $("#thetaslider").on("slide", function (e, ui) {
    $("#thetaspinner").spinner("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#thetaspinner").on("spin", function (e, ui) {
    $("#thetaslider").slider("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#thetaspinner").on("change", function () {
    varchange();
  });
  $("#CsArea").spinner({ max: 1, min: 0.01, step: 0.0001 });
  $("#Ivalue").spinner({ max: 1, min: 0.01, step: 0.0001 });
}
function varupdate() {
  $("#omegaspinner").spinner("value", $("#omegaslider").slider("value")); //updating slider location with change in spinner(debug)
  $("#betaspinner").spinner("value", $("#betaslider").slider("value"));
  $("#thetaspinner").spinner("value", $("#thetaslider").slider("value"));
  endmass = $("#omegaspinner").spinner("value"); //Updating variables
  beamlength = $("#betaspinner").spinner("value");
  dampingratio = $("#thetaspinner").spinner("value");

 };



window.addEventListener("load", varinit);
