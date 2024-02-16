//program variables

//controls section
var simstatus = 0;
var rotstatus = 1;
//comments section
var commenttext = "Some Text";
var commentloc = 0;
//computing section
var trans = new point(0, 0);
var a = new point(0, 0, "A");
var b = new point(0, 0, "B");
var c = new point(0, 0, "C");
var d = new point(0, 0, "D");
var e = new point(0, 0, "E");
var f = new point(0, 0, "F");
var va = new point(0, 0, "va");
var vc = new point(0, 0, "vc");
var vb = new point(0, 0, "vbc");
var vd = new point(0, 0, "vbd");
var ve = new point(0, 0, "vde");
var aa = new point(0, 0, "aa");
var ac = new point(0, 0, "aca");
var ab = new point(0, 0, "acb");
var ad = new point(0, 0, "adb");
var ae = new point(0, 0, "ade");
var ax = new point(0, 0, "ax");
var ay = new point(0, 0, "ay");
var ap = new point(0, 0, "ap");
var aq = new point(0, 0, "aq");
var abc = new point(0, 0, "abc");
var aed = new point(0, 0, "aed");
var a1 = new point(0, 0, "a");
var b1 = new point(0, 0, "b");
var c1 = new point(0, 0, "c");
var d1 = new point(0, 0, "d");
var e1 = new point(0, 0, "e");
var Vca = new point(0, 0, "Vca");
var Vca1 = new point(0, 0, "Vca1");
var Vcb = new point(0, 0, "Vcb");
var Vdb = new point(0, 0, "Vdb");
var Vea = new point(0, 0, "Vea");
var Ved = new point(0, 0, "Ved");
var Aca = new point(0, 0, "Aca");
var Apc = new point(0, 0, "Apc");
var Axp = new point(0, 0, "Axp");
var Axb = new point(0, 0, "Axb");
var Acb = new point(0, 0, "Acb");
var Aea = new point(0, 0, "Aea");
var Axc = new point(0, 0, "Axc");
var Aey = new point(0, 0, "Aey");
var Ayd = new point(0, 0, "Ayd");
var Adb = new point(0, 0, "Adb");
var Aed = new point(0, 0, "Aed");
var offset;
var r1 = 80,
  r2 = 60,
  r3,
  r5 = 60,
  r4 = 120,
  r6 = 150;
var vac, vbc, vbd, vde, theta5, thetax, thetay, thetaz;
var ABC = 30; // all angles to be defined either in degrees only or radians only throughout the program and convert as and when required
var BAC = deg(
  Math.atan((r2 * Math.sin(rad(ABC))) / (r1 + r2 * Math.cos(rad(ABC))))
);
var temp = 0;
//graphics section
var bc, pc;
var canvas;
var BAC1;
var ctx;
var speed = 7;
var omega2, omega4, omega5;
var alpha2, alpha4, alpha5;
var aca, acb, adb, ade, acor;
var x1coord, y1coord;
var DEO, DEO1;
var temp1, temp2;
var scale = 1;
var screenchanges = 0;
//var ac,aa,aca;
//timing section
var simTimeId = setInterval("", "1000");
var time = 0;
//point tracing section
var ptx = [];
var pty = [];
//small point tracing section
var utx = [];
var uty = [];
var trace = false;

/*
function trythis()
{ alert();}
*/

//change simulation specific css content. e.g. padding on top of variable to adjust appearance in variables window
function editcss() {
  $(".variable").css("padding", "30px");
  $("#datatable1").css("position", "absolute");
  $("#datatable1").css("left", "450px");
  $("#datatable1").css("top", "150px");
  $("#datatable1").css("fontSize", "12px");
  $("#datatable1").css("font", '"Nunito", sans-serif');
  $("#datatable1").css("border", "1px solid black");
  $("#datatable2").css("position", "absolute");
  $("#datatable2").css("left", "450px");
  $("#datatable2").css("top", "150px");
  $("#datatable2").css("fontSize", "12px");
  $("#datatable2").css("border", "1px solid black");
  $("#scale").css("position", "absolute");
  $("#scale").css("left", "240px");
  $("#scale").css("top", "300px");
  //$('#scale').css('position','absolute');
}

function startsim() {
  simTimeId = setInterval("time=time+0.1; varupdate(); ", "100");
}

// switches state of simulation between 0:Playing & 1:Paused
function simstate() {
  var imgfilename = document.getElementById("playpausebutton").src;
  imgfilename = imgfilename.substring(
    imgfilename.lastIndexOf("/") + 1,
    imgfilename.lastIndexOf(".")
  );
  if (imgfilename == "bluepausedull") {
    document.getElementById("playpausebutton").src = "images/blueplaydull.svg";
    clearInterval(simTimeId);
    simstatus = 1;
    $("#alphaspinner").spinner("value", ABC);
    pauseTime = setInterval("varupdate();", "100");
    document.querySelector(".playPause").textContent = "Play";
  }
  if (imgfilename == "blueplaydull") {
    time = 0;
    clearInterval(pauseTime);
    document.getElementById("playpausebutton").src = "images/bluepausedull.svg";
    simTimeId = setInterval("time=time+0.1; varupdate(); ", "100");
    simstatus = 0;
    document.querySelector(".playPause").textContent = "Pause";
  }
}

// switches state of rotation between 1:CounterClockWise & -1:Clockwise
function rotstate() {
  var imgfilename = document.getElementById("rotationbutton").src;
  imgfilename = imgfilename.substring(
    imgfilename.lastIndexOf("/") + 1,
    imgfilename.lastIndexOf(".")
  );
  if (imgfilename == "bluecwdull") {
    document.getElementById("rotationbutton").src = "images/blueccwdull.svg";
    rotstatus = -1;
  }
  if (imgfilename == "blueccwdull") {
    document.getElementById("rotationbutton").src = "images/bluecwdull.svg";
    rotstatus = 1;
  }
}

function screenchangef() {
  screenchanges++;
  if (screenchanges > 2) screenchanges = 2;
}
function screenchangeb() {
  screenchanges--;
  if (screenchanges < 0) screenchanges = 0;
}

function acttan(x1coord, y1coord) {
  if (x1coord >= 0 && y1coord >= 0) return deg(Math.atan(y1coord / x1coord));
  if (x1coord > 0 && y1coord < 0)
    return 360 + deg(Math.atan(y1coord / x1coord));
  if (x1coord < 0 && y1coord > 0)
    return 180 + deg(Math.atan(y1coord / x1coord));
  if (x1coord < 0 && y1coord < 0)
    return 180 + deg(Math.atan(y1coord / x1coord));
}

function varinit() {
  varchange();

  $("#ABslider").slider("value", 40);
  $("#ABspinner").spinner("value", 40);

  $("#crankslider").slider("value", 60);
  $("#crankspinner").spinner("value", 60);

  $("#alphaslider").slider("value", 55);
  $("#alphaspinner").spinner("value", 55);

  //Variable omega2 slider and number input types
  $("#omega2slider").slider("value", 1);
  $("#omega2spinner").spinner("value", 1);
}

// Initialise and Monitor variable containing user inputs of system parameters.
//change #id and repeat block for new variable. Make sure new <div> with appropriate #id is included in the markup
function varchange() {
  //Link AB
  // slider initialisation : jQuery widget
  $("#ABslider").slider({ max: 50, min: 20, step: 2 });

  // number initialisation : jQuery widget
  $("#ABspinner").spinner({ max: 50, min: 20, step: 2 });
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#ABslider").on("slide", function (c, ui) {
    $("#ABspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#ABspinner").on("spin", function (c, ui) {
    $("#ABslider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#ABspinner").on("change", function () {
    varchange();
  });

  //Link BC
  // slider initialisation : jQuery widget
  $("#crankslider").slider({ max: 80, min: 60, step: 1 });

  // number initialisation : jQuery widget
  $("#crankspinner").spinner({ max: 80, min: 60, step: 1 });
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#crankslider").on("slide", function (e, ui) {
    $("#crankspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#crankspinner").on("spin", function (e, ui) {
    $("#crankslider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#crankspinner").on("change", function () {
    varchange();
  });

  // Angle Alpha
  // slider initialisation : jQuery widget
  $("#alphaslider").slider({ max: 360, min: 0, step: 1 });

  // number initialisation : jQuery widget
  $("#alphaspinner").spinner({ max: 360, min: 0, step: 1 });

  //Speed Change
  //sliderintialisation : jquery widget
  //$('#speedslider').slider({ max : 30, min : 7, step : 2 });
  //$('#speedspinner').slider({ max : 30, min : 7, step : 2 });

  // monitoring change in value and connecting slider and number
  $("#alphaslider").on("slide", function (e, ui) {
    $("#alphaspinner").spinner("value", ui.value);
  });
  $("#alphaspinner").on("spin", function (e, ui) {
    $("#alphaslider").slider("value", ui.value);
  });
  $("#alphaspinner").on("change", function () {
    varchange();
  });

  //Variable omega2 slider and number input types
  $("#omega2slider").slider({ max: 5, min: 0.2, step: 0.2 }); // slider initialisation : jQuery widget
  $("#omega2spinner").spinner({ max: 5, min: 0.2, step: 0.2 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#omega2slider").on("slide", function (c, ui) {
    $("#omega2spinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#omega2spinner").on("spin", function (c, ui) {
    $("#omega2slider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#omega2spinner").on("change", function () {
    varchange();
  });

  varupdate();
}

function varupdate() {
  $("#ABslider").slider("value", $("#ABspinner").spinner("value")); //updating slider location with change in spinner(debug)
  $("#crankslider").slider("value", $("#crankspinner").spinner("value"));
  $("#alphaslider").slider("value", $("#alphaspinner").spinner("value"));
  $("#omega2slider").slider("value", $("#omega2spinner").spinner("value"));
  //$('#speedslider').slider("value", $('#speedspinner').spinner('value'));

  r1 = $("#ABspinner").spinner("value");
  r2 = $("#crankspinner").spinner("value");

  //printcomment("Scale 1:1",1);
  //printcomment(,2);
  //printcomment(r3,3)

  if (!simstatus) {
    $("#alphaslider").slider("disable");
    $("#alphaspinner").spinner("disable");
    $("#omega2set").show();
    //'#speedspinner').spinner("enable");
    omega2 = rotstatus * $("#omega2spinner").spinner("value");
    ABC = ABC + 0.1 * deg(omega2);
    ABC = ABC % 360;
  }
  if (simstatus) {
    $("#alphaslider").slider("enable");
    $("#crankslider").slider("enable");
    $("#alphaspinner").spinner("enable");
    $("#crankspinner").spinner("enable");
    $("#speedspinner").spinner("disable");
    $("#omega2set").hide();
    ABC = $("#alphaspinner").spinner("value");
    omega2 = rotstatus * $("#omega2spinner").spinner("value");
  }

  a.xcoord = 250;
  a.ycoord = 150;
  offset = 50;
  b.xcoord = a.xcoord;
  b.ycoord = a.ycoord + r1;
  c.xcoord = a.xcoord + r2 * Math.cos(rad(ABC));
  c.ycoord = a.ycoord + r2 * Math.sin(rad(ABC));
  BAC = acttan(c.ycoord - b.ycoord, c.xcoord - b.xcoord);
  d.xcoord = b.xcoord - r5 * Math.sin(rad(180 - BAC));
  d.ycoord = b.ycoord + r5 * Math.cos(rad(180 - BAC));
  DEO = deg(Math.asin((b.ycoord - d.ycoord) / r4));
  e.xcoord = d.xcoord + r4 * Math.cos(rad(DEO));
  e.ycoord = b.ycoord;
  r3 = Math.sqrt(
    r2 * Math.cos(rad(360 - ABC)) * (r2 * Math.cos(rad(360 - ABC))) +
      (r1 + r2 * Math.sin(rad(360 - ABC))) *
        (r1 + r2 * Math.sin(rad(360 - ABC)))
  );
  //alert();
  omega4 =
    (r2 * omega2 * Math.cos(rad(360 - ABC)) * Math.cos(rad(BAC + 90)) +
      r2 * omega2 * Math.sin(rad(360 - ABC)) * Math.sin(rad(BAC + 90))) /
    r3;
  //omega5 =
  f.xcoord = b.xcoord + r6 * Math.sin(rad(BAC));
  f.ycoord = b.ycoord + r6 * Math.cos(rad(BAC));
  vac = r2 * omega2;
  va.xcoord = 250;
  va.ycoord = 280;
  vc.xcoord = va.xcoord + 1.5 * vac * Math.cos(rad(ABC + 90));
  vc.ycoord = va.ycoord + 1.5 * vac * Math.sin(rad(ABC + 90));
  vbc = r3 * omega4;
  vb.xcoord = va.xcoord - 1.5 * vbc * Math.cos(rad(180 - BAC));
  vb.ycoord = va.ycoord - 1.5 * vbc * Math.sin(rad(180 - BAC));
  vbd = r5 * omega4;
  vd.xcoord = va.xcoord + 1.5 * vbd * Math.cos(rad(180 - BAC));
  vd.ycoord = va.ycoord + 1.5 * vbd * Math.sin(rad(180 - BAC));
  //theta5=deg(Math.acos((e.xcoord-d.xcoord)/r4));
  omega5 =
    (-r5 * omega4 * Math.cos(rad(90 + BAC))) / (r4 * Math.cos(rad(360 - DEO)));
  vde =
    -r5 * omega4 * Math.sin(rad(90 + BAC)) -
    r4 * omega5 * Math.sin(rad(360 - DEO));
  ve.xcoord = va.xcoord + 1.5 * vde;
  ve.ycoord = va.ycoord;
  //alert(omega4);
  //vb.xcoord=va.xcoord+2*vbc*Math.cos(rad(180-BAC));
  //vb.ycoord=va.ycoord+2*vbc*Math.sin(rad(180-BAC));
  alpha2 = omega2 * omega2 * r2;
  alpha4 =
    (r2 / r3) *
      (-omega2 * omega2 * Math.cos(rad(360 - ABC - 90 + BAC)) +
        alpha2 * Math.sin(rad(360 - ABC - 90 + BAC))) -
    (2 * vbc * omega4) / r3;
  alpha5 =
    (r5 *
      (omega4 * omega4 * Math.sin(rad(90 - BAC)) -
        alpha4 * Math.cos(rad(90 - BAC))) +
      r4 * omega5 * omega5 * Math.sin(rad(theta5))) /
    (r4 * Math.cos(rad(theta5)));
  aca = r2 * alpha2;
  aa.xcoord = 250;
  aa.ycoord = 250;
  ac.xcoord = aa.xcoord + 2 * alpha2 * Math.cos(rad(180 + ABC));
  ac.ycoord = aa.ycoord + 2 * alpha2 * Math.sin(rad(180 + ABC));
  acb = r3 * alpha4;
  //alert(pointdist(vb,vc))
  acor = pointdist(vb, vc) * omega4;
  ap.xcoord = ac.xcoord - 2 * acor * Math.cos(rad(180 + BAC));
  ap.ycoord = ac.ycoord + 2 * acor * Math.sin(rad(180 + BAC));
  ab.xcoord = aa.xcoord - 2 * omega4 * omega4 * r3 * Math.cos(rad(90 + BAC));
  ab.ycoord = aa.ycoord + 2 * omega4 * omega4 * r3 * Math.sin(rad(90 + BAC));
  thetax = acttan(ap.xcoord - ab.xcoord, ap.ycoord - ab.ycoord);
  bc = pointdist(ap, ab) * Math.cos(rad(thetax + BAC - 180));
  pc = pointdist(ap, ab) * Math.sin(rad(thetax - 90 - BAC));
  /*if(BAC>90&&BAC<=180)
  temp1=BAC-90;
else if(BAC>180&&BAC<=270)
  temp1=BAC-180;
else if(BAC>270&&BAC<=360)
  temp1=BAC-270;

if(thetax>90&&thetax<=180)
  temp2=thetax-90;
else if(thetax>180&&thetax<=270)
  temp2=thetax-180;
else if(thetax>270&&thetax<=360)
  temp2=thetax-270;*/
  abc.xcoord = ab.xcoord + bc * Math.cos(rad(180 - BAC));
  abc.ycoord = ab.ycoord + bc * Math.sin(rad(180 - BAC));
  thetay = acttan(abc.xcoord - aa.xcoord, abc.ycoord - aa.ycoord);
  adb = r5 * alpha4;
  ad.xcoord = aa.xcoord - (r5 / r3) * Math.abs(bc) * Math.cos(rad(thetay));
  ad.ycoord = aa.ycoord - (r5 / r3) * Math.abs(bc) * Math.sin(rad(thetay));
  ade =
    -r5 * alpha4 * Math.sin(rad(90 - BAC)) -
    r5 * omega4 * omega4 * Math.cos(rad(90 - BAC)) -
    r4 * alpha5 * Math.sin(rad(theta5)) -
    r4 * omega5 * omega5 * Math.cos(rad(theta5));
  thetaz = acttan(ad.xcoord - aa.xcoord, ad.ycoord - aa.ycoord);
  if (DEO >= 0) {
    aed.xcoord =
      ad.xcoord +
      ((pointdist(vd, ve) * pointdist(vd, ve)) / r4) * Math.cos(rad(DEO));
    aed.ycoord =
      ad.ycoord +
      ((pointdist(vd, ve) * pointdist(vd, ve)) / r4) * Math.sin(rad(DEO));
  } else {
    aed.xcoord =
      ad.xcoord -
      ((pointdist(vd, ve) * pointdist(vd, ve)) / r4) * Math.cos(rad(DEO));
    aed.ycoord =
      ad.ycoord -
      ((pointdist(vd, ve) * pointdist(vd, ve)) / r4) * Math.sin(rad(DEO));
  }
  ae.xcoord = aed.xcoord + (aed.ycoord - aa.ycoord) / Math.tan(rad(90 - DEO));
  ae.ycoord = aa.ycoord;
  //alert(thetax);
  /*var axy_c = pointdist(ab,ac)*Math.cos(rad(90-BAC));
var axy_s = pointdist(ab,ac)*Math.sin(rad(90-BAC));
ax.xcoord=ab.xcoord-0.1*axy_c*Math.cos(rad(180-BAC));
ax.ycoord=ab.ycoord+0.1*axy_c*Math.sin(rad(180-BAC));
ay.xcoord=ac.xcoord-0.1*axy_c*Math.cos(rad(180-BAC));
ay.ycoord=ac.ycoord+0.1*axy_c*Math.sin(rad(180-BAC));*/
  //alert(vbc);
  if (screenchanges == 0) {
    draw();
  }
  if (screenchanges == 1) {
    drawvel(ctx);
  }
  if (screenchanges == 2) {
    drawacc(ctx);
  }
}

function tacc(ctx) {
  document.getElementById("datatable1").innerHTML =
    "\
<table border='1'>\
<tr><th>Vector</th><th>Value (mm/s<sup>2</sup>)</th></tr>\
<tr><td>A<sub>ca</sub></td><td>" +
    (pointdist(ac, aa) * 0.5).toFixed(2) +
    "</td></tr>\
<tr><td>A<sub>cb</sub></td><td>" +
    (pointdist(ab, aa) * 0.5).toFixed(2) +
    "</td></tr>\
<tr><td>A<sub>db</sub></td><td>" +
    (pointdist(ad, aa) * 0.5).toFixed(2) +
    "</td></tr>\
<tr><td>A<sub>ea</sub></td><td>" +
    (pointdist(ae, aa) * 0.5).toFixed(2) +
    "</td></tr>\
<tr><td>A<sub>xp</sub></td><td>" +
    (pointdist(ap, abc) * 0.5).toFixed(2) +
    "</td></tr>\
</table>";
}

function tvel(ctx) {
  document.getElementById("datatable2").innerHTML =
    "\
<table border='1'>\
<tr><th>Vector</th><th>Value (mm/s<sup>2</sup>)</th></tr>\
<tr><td>V<sub>ca</sub></td><td>" +
    (pointdist(vc, va) / 1.5).toFixed(2) +
    "</td></tr>\
<tr><td>V<sub>cb</sub></td><td>" +
    (pointdist(vb, va) / 1.5).toFixed(2) +
    "</td></tr>\
<tr><td>V<sub>db</sub></td><td>" +
    (pointdist(vd, va) / 1.5).toFixed(2) +
    "</td></tr>\
<tr><td>V<sub>ea</sub></td><td>" +
    (pointdist(ve, va) / 1.5).toFixed(2) +
    "</td></tr>\
<tr><td>V<sub>ed</sub></td><td>" +
    (pointdist(ve, vd) / 1.5).toFixed(2) +
    "</td></tr>\
<tr><td>V<sub>ca'</sub></td><td>" +
    (pointdist(vc, vb) / 1.5).toFixed(2) +
    "</td></tr>\
</table>";
}

function scalev1() {
  if (
    vc.xcoord > 550 ||
    vb.xcoord > 550 ||
    vd.xcoord > 550 ||
    ve.xcoord > 550 ||
    vc.ycoord > 350 ||
    vd.ycoord > 350 ||
    vb.ycoord > 350 ||
    ve.ycoord > 350 ||
    vc.xcoord < 0 ||
    vb.xcoord < 0 ||
    vd.xcoord < 0 ||
    ve.xcoord < 0 ||
    vc.ycoord < 0 ||
    vd.ycoord < 0 ||
    vb.ycoord < 0 ||
    ve.ycoord < 0
  ) {
    vb.xcoord = va.xcoord + (vb.xcoord - va.xcoord) / 2;
    vb.ycoord = va.ycoord + (vb.ycoord - va.ycoord) / 2;
    vc.xcoord = va.xcoord + (vc.xcoord - va.xcoord) / 2;
    vc.ycoord = va.ycoord + (vc.ycoord - va.ycoord) / 2;
    vd.xcoord = va.xcoord + (vd.xcoord - va.xcoord) / 2;
    vd.ycoord = va.ycoord + (vd.ycoord - va.ycoord) / 2;
    ve.xcoord = va.xcoord + (ve.xcoord - va.xcoord) / 2;
    ve.ycoord = va.ycoord + (ve.ycoord - va.ycoord) / 2;
    scale = 0.5;
  }
}

function scalev2() {
  if (
    vc.xcoord > 600 ||
    vb.xcoord > 600 ||
    vd.xcoord > 600 ||
    ve.xcoord > 600 ||
    vc.ycoord > 450 ||
    vd.ycoord > 450 ||
    vb.ycoord > 450 ||
    ve.ycoord > 450 ||
    vc.xcoord < 0 ||
    vb.xcoord < 0 ||
    vd.xcoord < 0 ||
    ve.xcoord < 0 ||
    vc.ycoord < 0 ||
    vd.ycoord < 0 ||
    vb.ycoord < 0 ||
    ve.ycoord < 0
  ) {
    vb.xcoord = va.xcoord + (vb.xcoord - va.xcoord) / 3;
    vb.ycoord = va.ycoord + (vb.ycoord - va.ycoord) / 3;
    vc.xcoord = va.xcoord + (vc.xcoord - va.xcoord) / 3;
    vc.ycoord = va.ycoord + (vc.ycoord - va.ycoord) / 3;
    vd.xcoord = va.xcoord + (vd.xcoord - va.xcoord) / 3;
    vd.ycoord = va.ycoord + (vd.ycoord - va.ycoord) / 3;
    ve.xcoord = va.xcoord + (ve.xcoord - va.xcoord) / 3;
    ve.ycoord = va.ycoord + (ve.ycoord - va.ycoord) / 3;
    scale = 0.33;
  }
}

function scalea1() {
  if (
    ab.xcoord > 550 ||
    ac.xcoord > 550 ||
    ad.xcoord > 550 ||
    ae.xcoord > 550 ||
    ax.xcoord > 550 ||
    ay.xcoord > 550 ||
    ap.xcoord > 550 ||
    aq.xcoord > 550 ||
    abc.xcoord > 550 ||
    aed.xcoord > 550 ||
    ab.ycoord > 350 ||
    ac.ycoord > 350 ||
    ad.ycoord > 350 ||
    ae.ycoord > 350 ||
    ax.ycoord > 350 ||
    ay.ycoord > 350 ||
    ap.ycoord > 350 ||
    aq.ycoord > 350 ||
    abc.ycoord > 350 ||
    aed.ycoord > 350 ||
    ab.xcoord < 0 ||
    ac.xcoord < 0 ||
    ad.xcoord < 0 ||
    ae.xcoord < 0 ||
    ax.xcoord < 0 ||
    ay.xcoord < 0 ||
    ap.xcoord < 0 ||
    aq.xcoord < 0 ||
    abc.xcoord < 0 ||
    aed.xcoord < 0 ||
    ab.ycoord < 0 ||
    ac.ycoord < 0 ||
    ad.ycoord < 0 ||
    ae.ycoord < 0 ||
    ax.ycoord < 0 ||
    ay.ycoord < 0 ||
    ap.ycoord < 0 ||
    aq.ycoord < 0 ||
    abc.ycoord < 0 ||
    aed.ycoord < 0
  ) {
    ab.xcoord = aa.xcoord + (ab.xcoord - aa.xcoord) / 2;
    ab.ycoord = aa.ycoord + (ab.ycoord - aa.ycoord) / 2;
    ac.xcoord = aa.xcoord + (ac.xcoord - aa.xcoord) / 2;
    ac.ycoord = aa.ycoord + (ac.ycoord - aa.ycoord) / 2;
    ad.xcoord = aa.xcoord + (ad.xcoord - aa.xcoord) / 2;
    ad.ycoord = aa.ycoord + (ad.ycoord - aa.ycoord) / 2;
    ae.xcoord = aa.xcoord + (ae.xcoord - aa.xcoord) / 2;
    ae.ycoord = aa.ycoord + (ae.ycoord - aa.ycoord) / 2;
    ax.xcoord = aa.xcoord + (ax.xcoord - aa.xcoord) / 2;
    ax.ycoord = aa.ycoord + (ax.ycoord - aa.ycoord) / 2;
    ay.xcoord = aa.xcoord + (ay.xcoord - aa.xcoord) / 2;
    ay.ycoord = aa.ycoord + (ay.ycoord - aa.ycoord) / 2;
    ap.xcoord = aa.xcoord + (ap.xcoord - aa.xcoord) / 2;
    ap.ycoord = aa.ycoord + (ap.ycoord - aa.ycoord) / 2;
    aq.xcoord = aa.xcoord + (aq.xcoord - aa.xcoord) / 2;
    aq.ycoord = aa.ycoord + (aq.ycoord - aa.ycoord) / 2;
    abc.xcoord = aa.xcoord + (abc.xcoord - aa.xcoord) / 2;
    abc.ycoord = aa.ycoord + (abc.ycoord - aa.ycoord) / 2;
    aed.xcoord = aa.xcoord + (aed.xcoord - aa.xcoord) / 2;
    aed.ycoord = aa.ycoord + (aed.ycoord - aa.ycoord) / 2;

    scale = 0.5;
  }
}

function scalea2() {
  if (
    ab.xcoord > 600 ||
    ac.xcoord > 600 ||
    ad.xcoord > 600 ||
    ae.xcoord > 600 ||
    ax.xcoord > 600 ||
    ay.xcoord > 600 ||
    ap.xcoord > 600 ||
    aq.xcoord > 600 ||
    abc.xcoord > 600 ||
    aed.xcoord > 600 ||
    ab.ycoord > 450 ||
    ac.ycoord > 450 ||
    ad.ycoord > 450 ||
    ae.ycoord > 450 ||
    ax.ycoord > 450 ||
    ay.ycoord > 450 ||
    ap.ycoord > 450 ||
    aq.ycoord > 450 ||
    abc.ycoord > 450 ||
    aed.ycoord > 450 ||
    ab.xcoord < 0 ||
    ac.xcoord < 0 ||
    ad.xcoord < 0 ||
    ae.xcoord < 0 ||
    ax.xcoord < 0 ||
    ay.xcoord < 0 ||
    ap.xcoord < 0 ||
    aq.xcoord < 0 ||
    abc.xcoord < 0 ||
    aed.xcoord < 0 ||
    ab.ycoord < 0 ||
    ac.ycoord < 0 ||
    ad.ycoord < 0 ||
    ae.ycoord < 0 ||
    ax.ycoord < 0 ||
    ay.ycoord < 0 ||
    ap.ycoord < 0 ||
    aq.ycoord < 0 ||
    abc.ycoord < 0 ||
    aed.ycoord < 0
  ) {
    ab.xcoord = aa.xcoord + (ab.xcoord - aa.xcoord) / 3;
    ab.ycoord = aa.ycoord + (ab.ycoord - aa.ycoord) / 3;
    ac.xcoord = aa.xcoord + (ac.xcoord - aa.xcoord) / 3;
    ac.ycoord = aa.ycoord + (ac.ycoord - aa.ycoord) / 3;
    ad.xcoord = aa.xcoord + (ad.xcoord - aa.xcoord) / 3;
    ad.ycoord = aa.ycoord + (ad.ycoord - aa.ycoord) / 3;
    ae.xcoord = aa.xcoord + (ae.xcoord - aa.xcoord) / 3;
    ae.ycoord = aa.ycoord + (ae.ycoord - aa.ycoord) / 3;
    ax.xcoord = aa.xcoord + (ax.xcoord - aa.xcoord) / 3;
    ax.ycoord = aa.ycoord + (ax.ycoord - aa.ycoord) / 3;
    ay.xcoord = aa.xcoord + (ay.xcoord - aa.xcoord) / 3;
    ay.ycoord = aa.ycoord + (ay.ycoord - aa.ycoord) / 3;
    ap.xcoord = aa.xcoord + (ap.xcoord - aa.xcoord) / 3;
    ap.ycoord = aa.ycoord + (ap.ycoord - aa.ycoord) / 3;
    aq.xcoord = aa.xcoord + (aq.xcoord - aa.xcoord) / 3;
    aq.ycoord = aa.ycoord + (aq.ycoord - aa.ycoord) / 3;
    abc.xcoord = aa.xcoord + (abc.xcoord - aa.xcoord) / 3;
    abc.ycoord = aa.ycoord + (abc.ycoord - aa.ycoord) / 3;
    aed.xcoord = aa.xcoord + (aed.xcoord - aa.xcoord) / 3;
    aed.ycoord = aa.ycoord + (aed.ycoord - aa.ycoord) / 3;

    scale = 0.33;
  }
}

function scalea3() {
  if (
    ab.xcoord > 650 ||
    ac.xcoord > 650 ||
    ad.xcoord > 650 ||
    ae.xcoord > 650 ||
    ax.xcoord > 650 ||
    ay.xcoord > 650 ||
    ap.xcoord > 650 ||
    aq.xcoord > 650 ||
    abc.xcoord > 650 ||
    aed.xcoord > 650 ||
    ab.ycoord > 500 ||
    ac.ycoord > 500 ||
    ad.ycoord > 500 ||
    ae.ycoord > 500 ||
    ax.ycoord > 500 ||
    ay.ycoord > 500 ||
    ap.ycoord > 500 ||
    aq.ycoord > 500 ||
    abc.ycoord > 500 ||
    aed.ycoord > 500 ||
    ab.xcoord < 0 ||
    ac.xcoord < 0 ||
    ad.xcoord < 0 ||
    ae.xcoord < 0 ||
    ax.xcoord < 0 ||
    ay.xcoord < 0 ||
    ap.xcoord < 0 ||
    aq.xcoord < 0 ||
    abc.xcoord < 0 ||
    aed.xcoord < 0 ||
    ab.ycoord < 0 ||
    ac.ycoord < 0 ||
    ad.ycoord < 0 ||
    ae.ycoord < 0 ||
    ax.ycoord < 0 ||
    ay.ycoord < 0 ||
    ap.ycoord < 0 ||
    aq.ycoord < 0 ||
    abc.ycoord < 0 ||
    aed.ycoord < 0
  ) {
    ab.xcoord = aa.xcoord + (ab.xcoord - aa.xcoord) / 4;
    ab.ycoord = aa.ycoord + (ab.ycoord - aa.ycoord) / 4;
    ac.xcoord = aa.xcoord + (ac.xcoord - aa.xcoord) / 4;
    ac.ycoord = aa.ycoord + (ac.ycoord - aa.ycoord) / 4;
    ad.xcoord = aa.xcoord + (ad.xcoord - aa.xcoord) / 4;
    ad.ycoord = aa.ycoord + (ad.ycoord - aa.ycoord) / 4;
    ae.xcoord = aa.xcoord + (ae.xcoord - aa.xcoord) / 4;
    ae.ycoord = aa.ycoord + (ae.ycoord - aa.ycoord) / 4;
    ax.xcoord = aa.xcoord + (ax.xcoord - aa.xcoord) / 4;
    ax.ycoord = aa.ycoord + (ax.ycoord - aa.ycoord) / 4;
    ay.xcoord = aa.xcoord + (ay.xcoord - aa.xcoord) / 4;
    ay.ycoord = aa.ycoord + (ay.ycoord - aa.ycoord) / 4;
    ap.xcoord = aa.xcoord + (ap.xcoord - aa.xcoord) / 4;
    ap.ycoord = aa.ycoord + (ap.ycoord - aa.ycoord) / 4;
    aq.xcoord = aa.xcoord + (aq.xcoord - aa.xcoord) / 4;
    aq.ycoord = aa.ycoord + (aq.ycoord - aa.ycoord) / 4;
    abc.xcoord = aa.xcoord + (abc.xcoord - aa.xcoord) / 4;
    abc.ycoord = aa.ycoord + (abc.ycoord - aa.ycoord) / 4;
    aed.xcoord = aa.xcoord + (aed.xcoord - aa.xcoord) / 4;
    aed.ycoord = aa.ycoord + (aed.ycoord - aa.ycoord) / 4;

    scale = 0.25;
  }
}

function scalea4() {
  if (
    ab.xcoord > 500 ||
    ac.xcoord > 500 ||
    ad.xcoord > 500 ||
    ae.xcoord > 500 ||
    ax.xcoord > 500 ||
    ay.xcoord > 500 ||
    ap.xcoord > 500 ||
    aq.xcoord > 500 ||
    abc.xcoord > 500 ||
    aed.xcoord > 500 ||
    ab.ycoord > 400 ||
    ac.ycoord > 400 ||
    ad.ycoord > 400 ||
    ae.ycoord > 400 ||
    ax.ycoord > 400 ||
    ay.ycoord > 400 ||
    ap.ycoord > 400 ||
    aq.ycoord > 400 ||
    abc.ycoord > 400 ||
    aed.ycoord > 400 ||
    ab.xcoord < 0 ||
    ac.xcoord < 0 ||
    ad.xcoord < 0 ||
    ae.xcoord < 0 ||
    ax.xcoord < 0 ||
    ay.xcoord < 0 ||
    ap.xcoord < 0 ||
    aq.xcoord < 0 ||
    abc.xcoord < 0 ||
    aed.xcoord < 0 ||
    ab.ycoord < 0 ||
    ac.ycoord < 0 ||
    ad.ycoord < 0 ||
    ae.ycoord < 0 ||
    ax.ycoord < 0 ||
    ay.ycoord < 0 ||
    ap.ycoord < 0 ||
    aq.ycoord < 0 ||
    abc.ycoord < 0 ||
    aed.ycoord < 0
  ) {
    ab.xcoord = aa.xcoord + (ab.xcoord - aa.xcoord) / 5;
    ab.ycoord = aa.ycoord + (ab.ycoord - aa.ycoord) / 5;
    ac.xcoord = aa.xcoord + (ac.xcoord - aa.xcoord) / 5;
    ac.ycoord = aa.ycoord + (ac.ycoord - aa.ycoord) / 5;
    ad.xcoord = aa.xcoord + (ad.xcoord - aa.xcoord) / 5;
    ad.ycoord = aa.ycoord + (ad.ycoord - aa.ycoord) / 5;
    ae.xcoord = aa.xcoord + (ae.xcoord - aa.xcoord) / 5;
    ae.ycoord = aa.ycoord + (ae.ycoord - aa.ycoord) / 5;
    ax.xcoord = aa.xcoord + (ax.xcoord - aa.xcoord) / 5;
    ax.ycoord = aa.ycoord + (ax.ycoord - aa.ycoord) / 5;
    ay.xcoord = aa.xcoord + (ay.xcoord - aa.xcoord) / 5;
    ay.ycoord = aa.ycoord + (ay.ycoord - aa.ycoord) / 5;
    ap.xcoord = aa.xcoord + (ap.xcoord - aa.xcoord) / 5;
    ap.ycoord = aa.ycoord + (ap.ycoord - aa.ycoord) / 5;
    aq.xcoord = aa.xcoord + (aq.xcoord - aa.xcoord) / 5;
    aq.ycoord = aa.ycoord + (aq.ycoord - aa.ycoord) / 5;
    abc.xcoord = aa.xcoord + (abc.xcoord - aa.xcoord) / 5;
    abc.ycoord = aa.ycoord + (abc.ycoord - aa.ycoord) / 5;
    aed.xcoord = aa.xcoord + (aed.xcoord - aa.xcoord) / 5;
    aed.ycoord = aa.ycoord + (aed.ycoord - aa.ycoord) / 5;

    scale = 0.2;
  }
}

function scalea5() {
  if (
    ab.xcoord > 750 ||
    ac.xcoord > 750 ||
    ad.xcoord > 750 ||
    ae.xcoord > 750 ||
    ax.xcoord > 750 ||
    ay.xcoord > 750 ||
    ap.xcoord > 750 ||
    aq.xcoord > 750 ||
    abc.xcoord > 750 ||
    aed.xcoord > 750 ||
    ab.ycoord > 600 ||
    ac.ycoord > 600 ||
    ad.ycoord > 600 ||
    ae.ycoord > 600 ||
    ax.ycoord > 600 ||
    ay.ycoord > 600 ||
    ap.ycoord > 600 ||
    aq.ycoord > 600 ||
    abc.ycoord > 600 ||
    aed.ycoord > 600 ||
    ab.xcoord < 0 ||
    ac.xcoord < 0 ||
    ad.xcoord < 0 ||
    ae.xcoord < 0 ||
    ax.xcoord < 0 ||
    ay.xcoord < 0 ||
    ap.xcoord < 0 ||
    aq.xcoord < 0 ||
    abc.xcoord < 0 ||
    aed.xcoord < 0 ||
    ab.ycoord < 0 ||
    ac.ycoord < 0 ||
    ad.ycoord < 0 ||
    ae.ycoord < 0 ||
    ax.ycoord < 0 ||
    ay.ycoord < 0 ||
    ap.ycoord < 0 ||
    aq.ycoord < 0 ||
    abc.ycoord < 0 ||
    aed.ycoord < 0
  ) {
    ab.xcoord = aa.xcoord + (ab.xcoord - aa.xcoord) / 6;
    ab.ycoord = aa.ycoord + (ab.ycoord - aa.ycoord) / 6;
    ac.xcoord = aa.xcoord + (ac.xcoord - aa.xcoord) / 6;
    ac.ycoord = aa.ycoord + (ac.ycoord - aa.ycoord) / 6;
    ad.xcoord = aa.xcoord + (ad.xcoord - aa.xcoord) / 6;
    ad.ycoord = aa.ycoord + (ad.ycoord - aa.ycoord) / 6;
    ae.xcoord = aa.xcoord + (ae.xcoord - aa.xcoord) / 6;
    ae.ycoord = aa.ycoord + (ae.ycoord - aa.ycoord) / 6;
    ax.xcoord = aa.xcoord + (ax.xcoord - aa.xcoord) / 6;
    ax.ycoord = aa.ycoord + (ax.ycoord - aa.ycoord) / 6;
    ay.xcoord = aa.xcoord + (ay.xcoord - aa.xcoord) / 6;
    ay.ycoord = aa.ycoord + (ay.ycoord - aa.ycoord) / 6;
    ap.xcoord = aa.xcoord + (ap.xcoord - aa.xcoord) / 6;
    ap.ycoord = aa.ycoord + (ap.ycoord - aa.ycoord) / 6;
    aq.xcoord = aa.xcoord + (aq.xcoord - aa.xcoord) / 6;
    aq.ycoord = aa.ycoord + (aq.ycoord - aa.ycoord) / 6;
    abc.xcoord = aa.xcoord + (abc.xcoord - aa.xcoord) / 6;
    abc.ycoord = aa.ycoord + (abc.ycoord - aa.ycoord) / 6;
    aed.xcoord = aa.xcoord + (aed.xcoord - aa.xcoord) / 6;
    aed.ycoord = aa.ycoord + (aed.ycoord - aa.ycoord) / 6;

    scale = 0.167;
  }
}

function draw() {
  //pointdisp(a); to display point
  //pointjoin(a,b); to join to points with a line

  document.getElementById("titleincanvas").innerHTML =
    "<b>Position Analysis</b>";

  $("#datatable2").hide();

  $("#vc").hide();
  $("#vb").hide();
  $("#ve").hide();
  $("#vd").hide();
  $("#vde").hide();
  $("#vbc").hide();

  $("#ac").hide();
  $("#ab").hide();
  $("#ad").hide();
  $("#ae").hide();
  $("#aca").hide();
  $("#acb").hide();
  $("#ap").hide();
  $("#aed").hide();
  $("#abc").hide();
  $("#ax").hide();
  $("#ay").hide();

  $("#scale").hide();

  $("#datatable1").hide();

  // printcomment("Click here to navigate",2);

  canvas = document.getElementById("simscreen");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 550, 400); //clears the complete canvas#simscreen everytime

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#666666";
  ctx.moveTo(10, b.ycoord + 10);
  ctx.lineTo(550, b.ycoord + 10);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.lineWidth = 20;
  ctx.strokeStyle = "#cccccc";
  ctx.moveTo(e.xcoord - 10, e.ycoord);
  ctx.lineTo(e.xcoord + 10, e.ycoord);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#0000ff";
  ctx.moveTo(c.xcoord, c.ycoord);
  ctx.lineTo(c.xcoord, c.ycoord);
  ctx.stroke();
  ctx.closePath();
  ptx.push(e.xcoord);
  pty.push(e.ycoord);
  ctx.beginPath();
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "#cccccc";
  ctx.arc(a.xcoord, a.ycoord, r2, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "#cccccc";
  ctx.arc(b.xcoord, b.ycoord, r6, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();

  //utx.push(c.xcoord);
  //uty.push(c.ycoord);

  pointjoin(a, b, ctx, "black", 10);
  pointjoin(b, c, ctx, "red", 10);
  pointjoin(c, a, ctx, "blue", 10);
  pointjoin(b, d, ctx, "green", 10);
  pointjoin(d, e, ctx, "purple", 10);
  pointjoin(c, f, ctx, "red", 10);

  pointdisp(a, ctx);
  pointdisp(b, ctx);
  pointdisp(c, ctx);
  pointdisp(d, ctx);
  pointdisp(e, ctx);
  pointdisp(f, ctx);
  //pointdisp(va,ctx);
  /*pointdisp(aa,ctx);
  pointdisp(ac,ctx);
  pointdisp(ad,ctx);
  pointdisp(ae,ctx);
  pointdisp(ax,ctx);
  pointdisp(ab,ctx);
  pointdisp(ay,ctx);*/

  //pointdisp(vc,ctx);
  // pointdisp(vb,ctx);

  /*<tr><td>r3</td><td>"+r3+"</td><td>"+roundd(theta3,2)+"</td><td>"+roundd(omega3,2)+"</td><td>"+roundd(r3*omega3,2)+"</td><td>"+roundd(alpha3,2)+"</td><td>"+roundd(accccb,2)+"</td><td>"+roundd(acctcb,2)+"</td><td>"+roundd(acclcb,2)+"</td></tr>\
<tr><td>r4</td><td>"+r4+"</td><td>"+roundd(theta4,2)+"</td><td>"+roundd(omega4,2)+"</td><td>"+roundd(r4*omega4,2)+"</td><td>"+roundd(alpha4,2)+"</td><td>"+roundd(acccc,2)+"</td><td>"+roundd(acctc,2)+"</td><td>"+roundd(acclc,2)+"</td></tr>\
<tr><td>(Units)</td><td>mm</td><td>&deg;</td><td>rad/s</td><td>mm/s</td><td>rad/s<sup>2</sup></td><td>mm/s<sup>2</sup></td><td>mm/s<sup>2</sup></td><td>mm/s<sup>2</sup></td>*/

  //$('#datatable1').show();

  ctx.save();

  ctx.restore();

  if (trace) {
    pointtrace(ptx, pty, ctx, "blue", 2);
    pointdisp(e, ctx, 2, "", "", "", true, 3);
  } else {
    ptx = [];
    pty = [];
  }

  //vtable(ctx);
  /*if(document.getElementById("trace").checked==true)
  {
  pointtrace(utx,uty,ctx,"red",2);
  pointdisp(c,ctx,2,'','','',true,3);
  }*/
}

function drawvel(ctx) {
  canvas = document.getElementById("simscreen");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 550, 400);

  tvel(ctx);

  document.getElementById("titleincanvas").innerHTML =
    "<b>Velocity Analysis</b>";
  document.getElementById("scale").innerHTML = "Scale: " + scale + ":1";
  scale = 1;

  $("#datatable2").show();

  $("#vc").show();
  $("#vb").show();
  $("#ve").show();
  $("#vd").show();
  $("#vde").show();
  $("#vbc").show();

  $("#ac").hide();
  $("#ab").hide();
  $("#ad").hide();
  $("#ae").hide();
  $("#aca").hide();
  $("#acb").hide();
  $("#ap").hide();
  $("#aed").hide();
  $("#abc").hide();
  $("#ax").hide();
  $("#ay").hide();

  $("#scale").show();

  $("#datatable1").hide();

  scalev1();
  scalev2();

  a1.xcoord = 60;
  a1.ycoord = 60;
  //offset = 50;
  b1.xcoord = a1.xcoord;
  b1.ycoord = a1.ycoord + 0.75 * r1;
  c1.xcoord = a1.xcoord + 0.75 * (r2 * Math.cos(rad(ABC)));
  c1.ycoord = a1.ycoord + 0.75 * (r2 * Math.sin(rad(ABC)));
  BAC1 = acttan(c.ycoord - b.ycoord, c.xcoord - b.xcoord);
  d1.xcoord = b1.xcoord - 0.75 * (r5 * Math.sin(rad(180 - BAC)));
  d1.ycoord = b1.ycoord + 0.75 * (r5 * Math.cos(rad(180 - BAC)));
  DEO1 = deg(Math.asin((b.ycoord - d.ycoord) / r4));
  e1.xcoord = d1.xcoord + 0.75 * (r4 * Math.cos(rad(DEO)));
  e1.ycoord = b1.ycoord;

  pointjoin(va, vc, ctx, "blue", 2);
  pointjoin(vc, vb, ctx, "yellow", 2);
  pointjoin(vb, va, ctx, "black", 2);
  pointjoin(vd, va, ctx, "green", 2);
  pointjoin(ve, vd, ctx, "orange", 2);
  pointjoin(ve, va, ctx, "purple", 2);

  pointjoin(a1, b1, ctx, "black", 8);
  pointjoin(b1, c1, ctx, "red", 8);
  pointjoin(c1, a1, ctx, "blue", 8);
  pointjoin(b1, d1, ctx, "green", 8);
  pointjoin(d1, e1, ctx, "purple", 8);

  pointdisp(a1, ctx);
  pointdisp(b1, ctx);
  pointdisp(c1, ctx);
  pointdisp(d1, ctx);
  pointdisp(e1, ctx);
  // Assuming va and vc are objects with xcoord and ycoord properties
  // You may need to adjust the calculation based on your specific requirements

  // var edgeX = (va.xcoord + vc.xcoord) / 2; // Calculate the midpoint along the x-axis
  // var edgeY = (va.ycoord + vc.ycoord) / 2; // Calculate the midpoint along the y-axis

  // You can use the edge coordinates to draw your point
  // pointdisp({ xcoord: edgeX, ycoord: edgeY }, ctx, 2, "blue", "white", "black", "12px", "12px");

  // pointdisp(vc,ctx),2,"blue","white","black",""+(-10+Math.round(60+va.xcoord+vc.xcoord)/2)+"px",""+(-10+Math.round(200+va.ycoord+vc.ycoord)/2)+"px");

  // Assuming va and vc are objects with xcoord and ycoord properties

  // let Vca =document.getElementById("vc");

  (Vca.xcoord = (va.xcoord + vc.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Vca.ycoord = (va.ycoord + vc.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Vca, ctx, 2, "blue", "white", "black", "12px", "12px");

  (Vca1.xcoord = (vc.xcoord + vb.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Vca1.ycoord = (vc.ycoord + vb.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Vca1, ctx, 2, "yellow", "white", "black", "12px", "12px");

  (Vcb.xcoord = (vb.xcoord + va.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Vcb.ycoord = (vb.ycoord + va.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Vcb, ctx, 2, "black", "white", "black", "12px", "12px");

  (Vdb.xcoord = (vd.xcoord + va.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Vdb.ycoord = (vd.ycoord + va.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Vdb, ctx, 2, "green", "white", "black", "12px", "12px");

  (Ved.xcoord = (ve.xcoord + vd.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Ved.ycoord = (ve.ycoord + vd.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Ved, ctx, 2, "orange", "white", "black", "12px", "12px");

  (Vea.xcoord = (ve.xcoord + va.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Vea.ycoord = (ve.ycoord + va.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Vea, ctx, 2, "purple", "white", "black", "12px", "12px");

  ctx.beginPath();

  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "#cccccc";
  ctx.moveTo(10, b1.ycoord);
  ctx.lineTo(200, b1.ycoord);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "#cccccc";
  ctx.arc(a1.xcoord, a1.ycoord, 0.75 * r2, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "#cccccc";
  ctx.moveTo(e1.xcoord - 5, e1.ycoord);
  ctx.lineTo(e1.xcoord + 5, e1.ycoord);
  ctx.stroke();
  ctx.closePath();

  drawArrow(vc.xcoord, vc.ycoord, ctx, ABC - rotstatus * 90, 6, 30, "#FF0000");
  drawArrow(
    vb.xcoord,
    vb.ycoord,
    ctx,
    90 - BAC + signof(omega4) * 90,
    6,
    30,
    "#FF0000"
  );
  drawArrow(
    ve.xcoord,
    ve.ycoord,
    ctx,
    90 + signof(ve.xcoord - va.xcoord) * 90,
    6,
    30,
    "#FF0000"
  );
  drawArrow(
    vd.xcoord,
    vd.ycoord,
    ctx,
    90 - BAC - signof(omega4) * 90,
    6,
    30,
    "#FF0000"
  );
  drawArrow(
    ve.xcoord,
    ve.ycoord,
    ctx,
    90 - acttan(vd.ycoord - ve.ycoord, vd.xcoord - ve.xcoord),
    6,
    30,
    "#FF0000"
  );

  ctx.restore();
}

function drawacc(ctx) {
  canvas = document.getElementById("simscreen");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 550, 400);

  tacc(ctx);

  document.getElementById("titleincanvas").innerHTML =
    "<b>Acceleration Analysis</b>";
  document.getElementById("scale").innerHTML = "Scale: " + scale + ":1";
  scale = 1;
  $("#datatable2").hide();

  $("#vc").hide();
  $("#vb").hide();
  $("#ve").hide();
  $("#vd").hide();
  $("#vde").hide();
  $("#vbc").hide();

  $("#ac").show();
  $("#ab").show();
  $("#ad").show();
  $("#ae").show();
  $("#aca").show();
  $("#acb").show();
  $("#ap").show();
  $("#aed").show();
  $("#abc").show();
  $("#ax").show();
  $("#ay").show();

  $("#scale").show();

  $("#datatable1").show();

  scalea1();
  scalea2();
  scalea3();
  scalea4();
  scalea5();

  a1.xcoord = 60;
  a1.ycoord = 60;
  //offset = 50;
  b1.xcoord = a1.xcoord;
  b1.ycoord = a1.ycoord + 0.75 * r1;
  c1.xcoord = a1.xcoord + 0.75 * (r2 * Math.cos(rad(ABC)));
  c1.ycoord = a1.ycoord + 0.75 * (r2 * Math.sin(rad(ABC)));
  BAC1 = acttan(c.ycoord - b.ycoord, c.xcoord - b.xcoord);
  d1.xcoord = b1.xcoord - 0.75 * (r5 * Math.sin(rad(180 - BAC)));
  d1.ycoord = b1.ycoord + 0.75 * (r5 * Math.cos(rad(180 - BAC)));
  DEO1 = deg(Math.asin((b.ycoord - d.ycoord) / r4));
  e1.xcoord = d1.xcoord + 0.75 * (r4 * Math.cos(rad(DEO)));
  e1.ycoord = b1.ycoord;

  pointjoin(a1, b1, ctx, "black", 8);
  pointjoin(b1, c1, ctx, "red", 8);
  pointjoin(c1, a1, ctx, "blue", 8);
  pointjoin(b1, d1, ctx, "green", 8);
  pointjoin(d1, e1, ctx, "purple", 8);

  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#cccccc";
  ctx.moveTo(e1.xcoord - 5, e1.ycoord);
  ctx.lineTo(e1.xcoord + 5, e1.ycoord);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "#cccccc";
  ctx.arc(a1.xcoord, a1.ycoord, 0.75 * r2, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "#cccccc";
  ctx.moveTo(10, b1.ycoord);
  ctx.lineTo(200, b1.ycoord);
  ctx.stroke();
  ctx.closePath();

  pointjoin(aa, ac, ctx, "blue", 2);
  pointjoin(aa, ab, ctx, "black", 2);
  pointjoin(aa, ad, ctx, "green", 2);
  pointjoin(ab, abc, ctx, "blue", 2);
  pointjoin(ap, abc, ctx, "blue", 2);
  pointjoin(ad, aed, ctx, "red", 2);
  pointjoin(ap, ac, ctx, "black", 2);
  pointjoin(aa, ae, ctx, "purple", 2);
  pointjoin(ae, aed, ctx, "black", 2);
  pointjoin(ad, ae, ctx, "purple", 2);
  pointjoin(ac, abc, ctx, "black", 2);

  pointdisp(a1, ctx);
  pointdisp(b1, ctx);
  pointdisp(c1, ctx);
  pointdisp(d1, ctx);
  pointdisp(e1, ctx);

  (Aca.xcoord = (aa.xcoord + ac.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Aca.ycoord = (aa.ycoord + ac.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Aca, ctx, 2, "blue", "white", "black", "12px", "12px");

  (Acb.xcoord = (aa.xcoord + ab.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Acb.ycoord = (aa.ycoord + ab.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Acb, ctx, 2, "blue", "white", "black", "12px", "12px");

  (Adb.xcoord = (aa.xcoord + ad.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Adb.ycoord = (aa.ycoord + ad.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Adb, ctx, 2, "blue", "white", "black", "12px", "12px");

  (Axb.xcoord = (ab.xcoord + abc.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Axb.ycoord = (ab.ycoord + abc.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Axb, ctx, 2, "blue", "white", "black", "12px", "12px");

  (Axp.xcoord = (ap.xcoord + abc.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Axp.ycoord = (ap.ycoord + abc.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Axp, ctx, 2, "blue", "white", "black", "12px", "12px");

  (Ayd.xcoord = (ad.xcoord + aed.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Ayd.ycoord = (ad.ycoord + aed.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Ayd, ctx, 2, "blue", "white", "black", "12px", "12px");

  (Apc.xcoord = (ap.xcoord + ac.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Apc.ycoord = (ap.ycoord + ac.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Apc, ctx, 2, "blue", "white", "black", "12px", "12px");

  (Aea.xcoord = (aa.xcoord + ae.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Aea.ycoord = (aa.ycoord + ae.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Aea, ctx, 2, "blue", "white", "black", "12px", "12px");

  (Aed.xcoord = (ad.xcoord + ae.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Aed.ycoord = (ad.ycoord + ae.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Aed, ctx, 2, "blue", "white", "black", "12px", "12px");

  (Aey.xcoord = (ae.xcoord + aed.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Aey.ycoord = (ae.ycoord + aed.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Aey, ctx, 2, "blue", "white", "black", "12px", "12px");

  (Axc.xcoord = (ac.xcoord + abc.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Axc.ycoord = (ac.ycoord + abc.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Axc, ctx, 2, "blue", "white", "black", "12px", "12px");

  drawArrow(
    ac.xcoord,
    ac.ycoord,
    ctx,
    90 + ABC - rotstatus * 90,
    6,
    30,
    "#FF0000"
  );
  drawArrow(
    ae.xcoord,
    ae.ycoord,
    ctx,
    90 + signof(ae.xcoord - aa.xcoord) * 90,
    6,
    30,
    "#FF0000"
  );
  drawArrow(ab.xcoord, ab.ycoord, ctx, 90 - BAC - 180, 6, 30, "#FF0000");
  drawArrow(
    ap.xcoord,
    ap.ycoord,
    ctx,
    90 - BAC + signof(omega4) * 90,
    6,
    30,
    "#FF0000"
  );
  drawArrow(
    abc.xcoord,
    abc.ycoord,
    ctx,
    90 - BAC + signof(omega4) * 90,
    6,
    30,
    "#FF0000"
  );
  drawArrow(abc.xcoord, abc.ycoord, ctx, 90 + thetax, 6, 30, "#FF0000");
  drawArrow(ad.xcoord, ad.ycoord, ctx, thetay, 6, 30, "#FF0000");
  drawArrow(
    aed.xcoord,
    aed.ycoord,
    ctx,
    DEO + 90 + signof(aed.xcoord - ad.xcoord) * 90,
    6,
    30,
    "#FF0000"
  );
  drawArrow(
    ae.xcoord,
    ae.ycoord,
    ctx,
    acttan(ad.xcoord - ae.xcoord, ad.ycoord - ae.ycoord),
    6,
    30,
    "#FF0000"
  );
  drawArrow(
    ae.xcoord,
    ae.ycoord,
    ctx,
    acttan(aed.xcoord - ae.xcoord, aed.ycoord - ae.ycoord),
    6,
    30,
    "#FF0000"
  );

  ctx.restore();
}

function tracePlot() {
  trace = !trace;
}

/*function vtable(ctx)
{
  document.getElementById("datatable1").innerHTML="\
<table>\
<tr><th>Vector</th><th>Value</th></tr>\
<tr><td>vca</td><td>"++"</td></tr>\
<tr><td>r3</td><td>"+r3+"</td></tr>\
<tr><td>r4</td><td>"+r4+"</td></tr>\
<tr><td>(Units)</td><td>mm</td></tr>\
</table>";


}*/
// prints comments passed as 'commenttext' in location specified by 'commentloc' in the comments box;
// 0 : Single comment box, 1 : Left comment box, 2 : Right comment box
function printcomment(commenttext, commentloc) {
  if (commentloc == 0) {
    document.getElementById("commentboxright").style.visibility = "hidden";
    document.getElementById("commentboxleft").style.width = "570px";
    document.getElementById("commentboxleft").innerHTML = commenttext;
  } else if (commentloc == 1) {
    document.getElementById("commentboxright").style.visibility = "visible";
    document.getElementById("commentboxleft").style.width = "285px";
    document.getElementById("commentboxleft").innerHTML = commenttext;
  } else if (commentloc == 2) {
    document.getElementById("commentboxright").style.visibility = "visible";
    document.getElementById("commentboxleft").style.width = "285px";
    document.getElementById("commentboxright").innerHTML = commenttext;
  } else {
    document.getElementById("commentboxright").style.visibility = "hidden";
    document.getElementById("commentboxleft").style.width = "570px";
    document.getElementById("commentboxleft").innerHTML =
      "<center>please report this issue to adityaraman@gmail.com</center>";
    // ignore use of deprecated tag <center> . Code is executed only if printcomment function receives inappropriate commentloc value
  }
}
