var simstatus = 0;
var rotstatus = 1;

var commenttext = "Some Text";
var commentloc = 0;

var trans = new point(200, 250);
var graph_trans = new point(100, 400);

var o = new point(0, 0, "o");
var a = new point(0, 0, "a");
var b = new point(0, 0, "b");

var theta = 0;
var omega = 1;
var r = 0,
  aa = 0;

var flaggrashof = true;

var canvas;
var ctx;
//timing section
var simTimeId = setInterval("", "1000");
var pauseTime = setInterval("", "1000");
var time = 0;
//point tracing section
var ptx = [];
var pty = [];
var ptxdot = [];
var ptxddot = [];
var ptxdddot = [];
//click status of legend and quick reference
var legendCS = false;
var quickrefCS = false;
var temp = 0;
var offset = 0;

var acc, vel, jerk;
var i = 0,
  j = 20;
var tempPt = new point(0, 0, "");
var truncate = 750;
var forvar = 0;
var graphDraw = false;
function editcss() {
  $(".variable").css("padding-top", "30px");
  $(".usercheck").css("left", "40px");
  $("#legend").css("width", document.getElementById("legendimg").width + "px");
  $("#legend").css("top", 419);
  $("#legend").css("left", 342);
  $("#legendicon").css("top", 471);
}

function startsim() {
  simTimeId = setInterval("time=time+0.1; varupdate(); ", "100");
}

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
    $("#thetaspinner").spinner("value", theta); //to set simulation parameters on pause
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

function showLegend() {
  if (legendCS) {
    $("#legendicon").css("border", "double");
    $("#legend").css("height", "0px");
    $("#legend").css("border", "0px");
    legendCS = false;
  } else {
    $("#legendicon").css("border", "inset red");
    $("#legend").css(
      "height",
      document.getElementById("legendimg").height + "px"
    );
    $("#legend").css("border", "solid 1px");
    legendCS = true;
  }
}

function varinit() {
  varchange();
  //Variable r slider and number input types
  $("#rslider").slider("value", 30);
  $("#rspinner").spinner("value", 30);
  //Variable a slider and number input types
  $("#aslider").slider("value", 30);
  $("#aspinner").spinner("value", 30);
  //Variable theta slider and number input types
  $("#thetaslider").slider("value", 40);
  $("#thetaspinner").spinner("value", 40);
  //Variable omega slider and number input types
  $("#omegaslider").slider("value", 1);
  $("#omegaspinner").spinner("value", 1);
}

function varchange() {
  //Variable r slider and number input types
  $("#rslider").slider({ max: 30, min: 20, step: 1 }); // slider initialisation : jQuery widget
  $("#rspinner").spinner({ max: 30, min: 20, step: 1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#rslider").on("slide", function (e, ui) {
    $("#rspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
    ptxdot = [];
    ptxddot = [];
    ptxdddot = [];
    j = 20;
    ptx.push(b.ycoord - 50);
    pty.push(o.xcoord + j);
  });
  $("#rspinner").on("spin", function (e, ui) {
    $("#rslider").slider("value", ui.value);
    ptx = [];
    pty = [];
    ptxdot = [];
    ptxddot = [];
    ptxdddot = [];
    j = 20;
    ptx.push(b.ycoord - 50);
    pty.push(o.xcoord + j);
  });
  $("#rspinner").on("change", function () {
    varchange();
  });

  //Variable a slider and number input types
  $("#aslider").slider({ max: 40, min: 10, step: 1 }); // slider initialisation : jQuery widget
  $("#aspinner").spinner({ max: 40, min: 10, step: 1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#aslider").on("slide", function (e, ui) {
    $("#aspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
    ptxdot = [];
    ptxddot = [];
    ptxdddot = [];
    j = 20;
    ptx.push(b.ycoord - 50);
    pty.push(o.xcoord + j);
  });
  $("#aspinner").on("spin", function (e, ui) {
    $("#aslider").slider("value", ui.value);
    ptx = [];
    pty = [];
    ptxdot = [];
    ptxddot = [];
    ptxdddot = [];
    j = 20;
    ptx.push(b.ycoord - 50);
    pty.push(o.xcoord + j);
  });
  $("#aspinner").on("change", function () {
    varchange();
  });

  //Variable theta slider and number input types
  $("#thetaslider").slider({ max: 360, min: 0, step: 1 }); // slider initialisation : jQuery widget
  $("#thetaspinner").spinner({ max: 360, min: 0, step: 1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#thetaslider").on("slide", function (e, ui) {
    $("#thetaspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
    ptxdot = [];
    ptxddot = [];
    j = 20;
    ptx.push(b.ycoord - 50);
    pty.push(o.xcoord + j);
  });
  $("#thetaspinner").on("spin", function (e, ui) {
    $("#thetaslider").slider("value", ui.value);
    ptx = [];
    pty = [];
    ptxdot = [];
    ptxddot = [];
    j = 20;
    ptx.push(b.ycoord - 50);
    pty.push(o.xcoord + j);
  });
  $("#thetaspinner").on("change", function () {
    varchange();
  });

  //Variable omega2 slider and number input types
  $("#omegaslider").slider({ max: 1.5, min: 1, step: 0.1 }); // slider initialisation : jQuery widget
  $("#omegaspinner").spinner({ max: 1.5, min: 1, step: 0.1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#omegaslider").on("slide", function (e, ui) {
    $("#omegaspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
    ptxdot = [];
    ptxddot = [];
    ptxdddot = [];
    j = 20;
    ptx.push(b.ycoord - 50);
    pty.push(o.xcoord + j);
  });
  $("#omegaspinner").on("spin", function (e, ui) {
    $("#omegaslider").slider("value", ui.value);
    ptx = [];
    pty = [];
    ptxdot = [];
    ptxddot = [];
    ptxdddot = [];
    j = 20;
    ptx.push(b.ycoord - 50);
    pty.push(o.xcoord + j);
  });
  $("#omegaspinner").on("change", function () {
    varchange();
  });

  varupdate();
}

function varupdate() {
  $("#rslider").slider("value", $("#rspinner").spinner("value")); //updating slider location with change in spinner(debug)
  $("#aslider").slider("value", $("#aspinner").spinner("value"));
  $("#thetaslider").slider("value", $("#thetaspinner").spinner("value"));

  r = $("#rspinner").spinner("value");
  aa = $("#aspinner").spinner("value");
  //$('#omegaset').hide();
  $("#aslider").slider({ max: $("#rslider").slider("value") - 10 });
  $("#aslider").slider({ min: 0 });
  $("#aspinner").spinner({ max: $("#rslider").slider("value") - 10 });
  $("#aspinner").spinner({ min: 0 });

  if (!simstatus) {
    $("#omegaslider").slider("enable");
    $("#omegaspinner").spinner("enable");
    $("#thetaslider").slider("disable");
    $("#thetaspinner").spinner("disable");
    omega = $("#omegaspinner").spinner("value");
    printcomment("", 2);
    theta = theta + rotstatus * 0.1 * deg(omega);
    theta = theta % 360;
    if (theta < 0) theta += 360;
  }

  if (simstatus) {
    $("#thetaslider").slider("enable");
    $("#thetaspinner").spinner("enable");
    $("#omegaslider").slider("disable");
    $("#omegaspinner").spinner("disable");
    theta = $("#thetaspinner").spinner("value");
    printcomment(
      "Centre at " +
        theta +
        "&deg;  Position = " +
        roundd(-b.ycoord + o.ycoord - r, 2) +
        "cm<br>Vel = " +
        roundd(-vel, 2) +
        "cm/s  Acc = " +
        roundd(-acc, 2) +
        "cm/s^2<br>Jerk = " +
        roundd(-jerk, 2) +
        "cm/s^3",
      2
    );
  }

  phi = deg(Math.asin((aa * Math.cos(rad(theta))) / r));
  o.xcoord = 0;
  o.ycoord = 0;
  a.xcoord = aa * Math.cos(rad(theta));
  a.ycoord = aa * Math.sin(rad(theta));
  b.xcoord = 0;
  b.ycoord = aa * Math.sin(rad(theta)) + r * Math.cos(rad(phi));

  printcomment(
    "Limits of a for the set r : " +
      $("#aspinner").spinner("option", "min") +
      " and\n " +
      $("#aspinner").spinner("option", "max") +
      " ",
    1
  );

  draw();
}

function draw() {
  if (graphDraw) {
    canvas = document.getElementById("simscreen");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 550, 450); //clears the complete canvas#simscreen everytime

    pointtrans(o, graph_trans);
    pointtrans(a, graph_trans);
    pointtrans(b, graph_trans);

    var o1 = new point(0, 0, "o");
    var b1 = new point(0, 0, "a");
    o1.xcoord = o.xcoord;
    o1.ycoord = o.ycoord + 7.5;
    b1.xcoord = b.xcoord;
    b1.ycoord = b.ycoord - 25;

    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.arc(a.xcoord, a.ycoord, r, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.fillStyle = "#CC7777";
    ctx.fill();
    ctx.closePath();

    drawrect(o1, 10, 15, 0, ctx, "#CC9933", "#CC9933", 1);
    drawrect(b1, 10, 50, 5, ctx, "#CC9933", "#CC9933", 1);

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#666666";
    ctx.moveTo(30, o.ycoord + 15);
    ctx.lineTo(530, o.ycoord + 15);
    ctx.stroke();
    ctx.closePath();

    //Pivot and centre
    pointjoin(o, a, ctx, "#CCCC00", 5);

    pointdisp(o, ctx, 5, "#000000", "#003366", "", "", "");
    pointdisp(a, ctx, 5, "#000000", "#003366", "", "", "");
    pointdisp(b, ctx, 5, "#000000", "#003366", "", "", "");
  }

  if (!graphDraw) {
    canvas = document.getElementById("simscreen");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 550, 450); //clears the complete canvas#simscreen everytime

    pointtrans(o, trans);
    pointtrans(a, trans);
    pointtrans(b, trans);

    var o1 = new point(0, 0, "o");
    var b1 = new point(0, 0, "a");
    o1.xcoord = o.xcoord;
    o1.ycoord = o.ycoord + 7.5;
    b1.xcoord = b.xcoord;
    b1.ycoord = b.ycoord - 25;

    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.arc(a.xcoord, a.ycoord, r, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.fillStyle = "#CC7777";
    ctx.fill();
    ctx.closePath();

    drawrect(o1, 10, 15, 0, ctx, "#CC9933", "#CC9933", 1);
    drawrect(b1, 10, 50, 5, ctx, "#CC9933", "#CC9933", 1);

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#666666";
    ctx.moveTo(30, o.ycoord + 15);
    ctx.lineTo(530, o.ycoord + 15);
    ctx.stroke();
    ctx.closePath();

    //Pivot and centre
    pointjoin(o, a, ctx, "#CCCC00", 5);

    pointdisp(o, ctx, 5, "#000000", "#003366", "", "", "");
    pointdisp(a, ctx, 5, "#000000", "#003366", "", "", "");
    pointdisp(b, ctx, 5, "#000000", "#003366", "", "", "");
  }

  //drawrem(ctx);
  graph(ctx);
}

function graph(context) {
  phi = deg(Math.asin((aa * Math.cos(rad(theta))) / r));
  vel =
    aa *
    omega *
    (Math.cos(rad(theta)) + Math.sin(rad(theta)) * Math.tan(rad(phi)));
  acc =
    aa *
    Math.pow(omega, 2) *
    (-Math.sin(rad(theta)) +
      Math.cos(rad(theta)) * Math.tan(rad(phi)) -
      (aa / r) * Math.pow(Math.sin(rad(theta)) / Math.cos(rad(phi)), 2));
  jerk =
    aa *
    Math.pow(omega, 3) *
    (-Math.cos(rad(theta)) -
      Math.sin(rad(theta)) * Math.tan(rad(phi)) -
      ((aa / (2 * r)) * Math.sin(2 * rad(theta))) /
        Math.pow(Math.cos(rad(phi)), 3) -
      ((aa / r) * Math.sin(2 * rad(theta))) / Math.pow(Math.cos(rad(phi)), 2) +
      (2 *
        Math.pow(aa / r, 2) *
        Math.pow(Math.sin(rad(theta)), 3) *
        Math.sin(rad(phi))) /
        Math.pow(Math.cos(rad(phi)), 4));

  if (graphDraw) {
    if (!simstatus) {
      ptx.push(b.ycoord - 50);
      ptxdot.push(o.ycoord - 125 - r + vel / 1.5);
      ptxddot.push(o.ycoord - 200 - r + acc / 2);
      ptxdddot.push(o.ycoord - 275 - r + jerk / 2.5);
      pty.push(o.xcoord + j);
      j = j + 0.5;
    }

    tempPt.ycoord = b.ycoord - 50;
    tempPt.xcoord = o.xcoord;
    pointdisp(tempPt, context, 3, "#000000", "#336699");
    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    context.moveTo(o.xcoord, b.ycoord - 50);

    if (pty.length < truncate) {
      context.lineTo(pty[pty.length - 1], b.ycoord - 50);
      context.moveTo(pty[pty.length - 1], o.ycoord - 400);
      context.lineTo(pty[pty.length - 1], o.ycoord + 300);
    } else {
      context.lineTo(pty[truncate], b.ycoord - 50);
      context.moveTo(pty[truncate], o.ycoord - 400);
      context.lineTo(pty[truncate], o.ycoord + 300);
    }
    context.stroke();
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    context.font = "12px 'Comic Sans MS'";

    context.moveTo(o.xcoord + 18, o.ycoord - r - 50);
    context.lineTo(o.xcoord + 500, o.ycoord - r - 50);
    context.moveTo(o.xcoord + 18, o.ycoord - r - 125);
    context.lineTo(o.xcoord + 500, o.ycoord - r - 125);
    context.moveTo(o.xcoord + 18, o.ycoord - r - 200);
    context.lineTo(o.xcoord + 500, o.ycoord - r - 200);
    context.moveTo(o.xcoord + 18, o.ycoord - r - 275);
    context.lineTo(o.xcoord + 500, o.ycoord - r - 275);

    context.fillText("Time", o.xcoord + 400, o.ycoord - r - 50 + 13);
    context.fillText("Time", o.xcoord + 400, o.ycoord - r - 125 + 13);
    context.fillText("Time", o.xcoord + 400, o.ycoord - r - 200 + 13);
    context.fillText("Time", o.xcoord + 400, o.ycoord - r - 275 + 13);

    context.moveTo(o.xcoord + 20, o.ycoord - 500);
    context.lineTo(o.xcoord + 20, o.ycoord + 300);
    context.fillText("Amplitude", o.xcoord - 45, o.ycoord - r - 160);

    context.fillText("Position (s)", o.xcoord - 47, o.ycoord - r - 50);
    context.fillText("Velocity (v)", o.xcoord - 50, o.ycoord - r - 125);
    context.fillText("Acceleration (a)", o.xcoord - 75, o.ycoord - r - 200);
    context.fillText("Jerk (j)", o.xcoord - 30, o.ycoord - r - 275);

    context.save();
    context.textAlign = "center";
    context.fillText("+20", o.xcoord + 38, o.ycoord - r - 50 - 20);
    context.fillText("-20", o.xcoord + 38, o.ycoord - r - 50 + 20);
    context.fillText("+30", o.xcoord + 38, o.ycoord - r - 125 - 20);
    context.fillText("-30", o.xcoord + 38, o.ycoord - r - 125 + 20);
    context.fillText("+40", o.xcoord + 38, o.ycoord - r - 200 - 20);
    context.fillText("-40", o.xcoord + 38, o.ycoord - r - 200 + 20);
    context.fillText("+50", o.xcoord + 38, o.ycoord - r - 275 - 20);
    context.fillText("-50", o.xcoord + 38, o.ycoord - r - 275 + 20);
    context.restore();

    for (
      forvar = 50;
      forvar <= 275;
      forvar += 75 //amplitude axis marking
    ) {
      context.moveTo(o.xcoord + 18, o.ycoord - r - forvar + 20);
      context.lineTo(o.xcoord + 22, o.ycoord - r - forvar + 20);
      context.moveTo(o.xcoord + 18, o.ycoord - r - forvar - 20);
      context.lineTo(o.xcoord + 22, o.ycoord - r - forvar - 20);
    }
    context.stroke();
    context.closePath();

    plot_graph(pty, ptx, context, truncate);
    plot_graph(pty, ptxdot, context, truncate, "#00FF00");
    plot_graph(pty, ptxddot, context, truncate, "#FF0000");
    plot_graph(pty, ptxdddot, context, truncate, "#505050");
  } else {
    ptx = [];
    ptxdot = [];
    ptxddot = [];
    pty = [];
    j = 20;
    ptx.push(b.ycoord - 50);
    pty.push(o.xcoord + j);
  }
}

function plot_graph(pt, pty, context, truncate, gcolor, lwidth) {
  context.save();
  if (!lwidth) lwidth = 1;
  if (!gcolor) gcolor = "#0000FF";
  if (!truncate) truncate = 1000;
  context.beginPath();
  context.lineWidth = lwidth;
  context.strokeStyle = gcolor;
  context.moveTo(pt[1], pty[1]);
  i = 1;

  while (i < pty.length) {
    context.lineTo(pt[i], pty[i]);
    i++;
    if (i >= truncate) {
      pty.splice(0, 1);
      i = i - 1;
    }
  }
  context.stroke();
  context.closePath();
  context.restore();
}

function enableGraphDraw() {
  graphDraw = !graphDraw;
}

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
