
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");


//Initialise system parameters here
function varinit() {
  varchange();
  //Variable slider and number input types
  $("#alphaSlider").slider("value", 55); // slider initialisation : jQuery widget
  $("#alphaSpinner").spinner("value", 55); // number initialisation : jQuery widget
  $("#omega2Slider").slider("value", 1);
  $("#omega2Spinner").spinner("value", 1);
  $("#CsArea").spinner("value", 0.01);
  $("#Ivalue").spinner("value", 0.01);
}
function varchange() {
  $("#alphaSlider").slider({ max: 360, min: 0, step: 5 });
  $("#alphaSpinner").spinner({ max: 360, min: 0, step: 5 });

  $("#alphaSlider").on("slide", function (e, ui) {
    $("#alphaSpinner").spinner("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#alphaSpinner").on("spin", function (e, ui) {
    $("#alphaSlider").slider("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#alphaSpinner").on("change", function () {
    varchange();
  });

  $("#omega2Slider").slider({ max: 5, min: 0, step: 0.2 });
  $("#omega2Spinner").spinner({ max: 5, min: 0, step: 0.2 });

  $("#omega2Slider").on("slide", function (e, ui) {
    $("#omega2Spinner").spinner("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#omega2Spinner").on("spin", function (e, ui) {
    $("#omega2Slider").slider("value", ui.value);
    time = 0;
    varupdate();
  });
  $("#omega2Spinner").on("change", function () {
    varchange();
  });
  $("#omega2Spinner").on("touch-start", function () {
    varchange();
  });
  $("#CsArea").spinner({ max: 1, min: 0.01, step: 0.0001 });
  $("#Ivalue").spinner({ max: 1, min: 0.01, step: 0.0001 });
}
function varupdate() {
  // $("#alphaSpinner").spinner("value", $("#alphaSlider").slider("value")); //updating slider location with change in spinner(debug)
  // $("#omega2Spinner").spinner("value", $("#omega2Slider").slider("value"));
  // $("#dampSpinner").spinner("value", $("#dampSlider").slider("value"));
  // endalpha = $("#alphaSpinner").spinner("value"); //Updating variables
  // beamomega2 = $("#omega2Spinner").spinner("value");
  // dampingratio = $("#dampSpinner").spinner("value");
  $('#alphaslider').slider("value", $('#alphaspinner').spinner('value')); 
  $('#omega2slider').slider("value", $('#omega2spinner').spinner('value'));
 };



window.addEventListener("load", varinit);
