var simstatus = 0;
var rotstatus = 1;

var commenttext = "Some Text";
var commentloc = 0;

var trans = new point(170, 330);
var trans1 = new point(370, 330);
var transo = new point(170, 200);
var transo1 = new point(370, 200);
//var graph_trans = new point(100,400);

var o = new point(0, 0, "");
var a = new point(0, 0, "a");
var b = new point(0, 0, "b");
var a1 = new point(0, 0, "a1");
var b1 = new point(0, 0, "b1");
var s = new point(0, 0, "s");
var pp = new point(0, 0, "");

var u = new point(0, 0, "u");
var v = new point(0, 0, "v");
var u1 = new point(0, 0, "u1");
var v1 = new point(0, 0, "v1");

var theta = 0,
  theta2 = 0;
var omega = 0,
  omega2 = 0;
//var a=0,b=0;

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
var r = 25;
var pos, acc, vel, jerk;
var i = 0,
  j = 20;
var tempPt = new point(0, 0, "");
var truncate = 750;
var forvar = 0;
var m1 = 0,
  m2 = 0,
  x = 0,
  y = 0;
var p = 0,
  q = 0,
  jj = 1,
  flag = 1;
//var v1=0 ,v2=0 ,v3=0;
//var v11=0 ,v22=0 ,v33=0;

function editcss() {
  $(".variable").css("padding-top", "30px"); // vriables beta theta and rad/s
  $(".usercheck").css("left", "40px"); //show graph check box
  //$('#legend').css("width",document.getElementById('legendimg').width+"px");
  //$('#legend').css("top",419);
  //$('#legend').css("left",342);
  $("#legendicon").css("top", 671);
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

/*function showLegend()
{
	if(legendCS)
	{
		$('#legendicon').css('border', 'double');
		$('#legend').css('height', '0px');
		$('#legend').css('border', '0px');
		legendCS=false;	
	}
	else
	{
		$('#legendicon').css('border', 'inset red');
		$('#legend').css("height", document.getElementById('legendimg').height+"px");
		$('#legend').css('border', 'solid 1px');
		legendCS=true;	
	}
}
*/

function checkGraph() {
  if (document.getElementById("graphPlot").checked == false) {
    document.getElementById("graphPlot").checked = true;
    draw();
  } else {
    document.getElementById("graphPlot").checked = false;
  }
}

function varinit() {
  varchange();
  //Variable r slider and number input types
  $("#betaslider").slider("value", 40);
  $("#betaspinner").spinner("value", 40);
  //Variable theta slider and number input types
  $("#thetaslider").slider("value", 0);
  $("#thetaspinner").spinner("value", 0);
  //Variable omega slider and number input types
  $("#omegaslider").slider("value", 0.4);
  $("#omegaspinner").spinner("value", 0.4);
}

function varchange() {
  //Variable r slider and number input types
  $("#betaslider").slider({ max: 60, min: 0, step: 1 }); // slider initialisation : jQuery widget
  $("#betaspinner").spinner({ max: 60, min: 0, step: 1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#betaslider").on("slide", function (e, ui) {
    $("#betaspinner").spinner("value", ui.value);
    jj = 1;
    theta = 0;
    ptx = [];
    pty = [];
    ptxdot = [];
    ptxddot = [];
    ptxdddot = [];
    j = 20;
    ptx.push(30);
    ptxdot.push(270);
    ptxddot.push(270 - ptx);
    pty.push(300);
    omega2 =
      (omega * Math.cos(rad(beta))) /
      (1 -
        Math.pow(Math.sin(rad(beta)), 2) * Math.pow(Math.cos(rad(theta)), 2));
    ptxdddot.push(150 - 50 * (omega2 - omega));
  });
  $("#betaspinner").on("spin", function (e, ui) {
    $("#betaslider").slider("value", ui.value);
    jj = 1;
    ptx = [];
    theta = 0;
    pty = [];
    ptxdot = [];
    ptxddot = [];
    ptxdddot = [];
    j = 20;
    ptx.push(30);
    ptxdot.push(270);
    ptxddot.push(270 - ptx);
    pty.push(300);
    omega2 =
      (omega * Math.cos(rad(beta))) /
      (1 -
        Math.pow(Math.sin(rad(beta)), 2) * Math.pow(Math.cos(rad(theta)), 2));
    ptxdddot.push(150 - 50 * (omega2 - omega));
  });
  $("#betaspinner").on("change", function () {
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
    ptxdddot = [];
    j = 20;
    ptx.push(30);
    ptxdot.push(270);
    ptxddot.push(270 - ptx);
    pty.push(300);
    omega2 =
      (omega * Math.cos(rad(beta))) /
      (1 -
        Math.pow(Math.sin(rad(beta)), 2) * Math.pow(Math.cos(rad(theta)), 2));
    ptxdddot.push(150 - 50 * (omega2 - omega));
  });
  $("#thetaspinner").on("spin", function (e, ui) {
    $("#thetaslider").slider("value", ui.value);
    ptx = [];
    pty = [];
    ptxdot = [];
    ptxddot = [];
    ptxdddot = [];
    j = 20;
    ptx.push(30);
    ptxdot.push(270);
    ptxddot.push(270 - ptx);
    pty.push(300);
    omega2 =
      (omega * Math.cos(rad(beta))) /
      (1 -
        Math.pow(Math.sin(rad(beta)), 2) * Math.pow(Math.cos(rad(theta)), 2));
    ptxdddot.push(150 - 50 * (omega2 - omega));
  });
  $("#thetaspinner").on("change", function () {
    varchange();
  });

  //Variable omega2 slider and number input types
  $("#omegaslider").slider({ max: 2, min: 0.1, step: 0.1 }); // slider initialisation : jQuery widget
  $("#omegaspinner").spinner({ max: 2, min: 0.1, step: 0.1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#omegaslider").on("slide", function (e, ui) {
    $("#omegaspinner").spinner("value", ui.value);
    jj = 1;
    theta = 0;
    ptx = [];
    pty = [];
    ptxdot = [];
    ptxddot = [];
    ptxdddot = [];
    j = 20;
    ptx.push(30);
    ptxdot.push(270);
    ptxddot.push(270 - ptx);
    pty.push(300);
    omega2 =
      (omega * Math.cos(rad(beta))) /
      (1 -
        Math.pow(Math.sin(rad(beta)), 2) * Math.pow(Math.cos(rad(theta)), 2));
    ptxdddot.push(150 - 50 * (omega2 - omega));
  });
  $("#omegaspinner").on("spin", function (e, ui) {
    $("#omegaslider").slider("value", ui.value);
    jj = 1;
    theta = 0;
    ptx = [];
    pty = [];
    ptxdot = [];
    ptxddot = [];
    ptxdddot = [];
    j = 20;
    ptx.push(30);
    ptxdot.push(270);
    ptxddot.push(270 - ptx);
    pty.push(300);
    omega2 =
      (omega * Math.cos(rad(beta))) /
      (1 -
        Math.pow(Math.sin(rad(beta)), 2) * Math.pow(Math.cos(rad(theta)), 2));
    ptxdddot.push(150 - 50 * (omega2 - omega));
  });
  $("#omegaspinner").on("change", function () {
    varchange();
  });

  //pty=[]; ptxdot=[]; ptxddot=[]; ptxdddot=[]; j=20;	ptx.push(s.ycoord-50); pty.push(o.xcoord+j);
  varupdate();
}

function varupdate() {
  $("#betaslider").slider("value", $("#betaspinner").spinner("value")); //updating slider location with change in spinner(debug)
  $("#thetaslider").slider("value", $("#thetaspinner").spinner("value"));

  beta = $("#betaspinner").spinner("value");

  if (!simstatus) {
    if (flag == 0) {
      jj = 1;
      theta = 0;
      ptx = [];
      pty = [];
      ptxdot = [];
      ptxddot = [];
      ptxdddot = [];
      j = 20;
      ptx.push(30);
      ptxdot.push(270);
      ptxddot.push(270 - ptx);
      pty.push(300);
      omega2 =
        (omega * Math.cos(rad(beta))) /
        (1 -
          Math.pow(Math.sin(rad(beta)), 2) * Math.pow(Math.cos(rad(theta)), 2));
      ptxdddot.push(150 - 50 * (omega2 - omega));
    }
    flag = 1;
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
    //if(flag==1){jj=1;theta=0;ptx=[]; pty=[]; ptxdot=[]; ptxddot=[]; ptxdddot=[]; j=20; ptx.push(30); ptxdot.push(270);ptxddot.push(270-ptx);};
    flag = 0;
    $("#thetaslider").slider("enable");
    $("#thetaspinner").spinner("enable");
    $("#omegaslider").slider("disable");
    $("#omegaspinner").spinner("disable");
    theta = $("#thetaspinner").spinner("value");
    //jj=1;ptx=[]; pty=[]; ptxdot=[]; ptxddot=[]; ptxdddot=[]; j=20; ptx.push(30); ptxdot.push(270);ptxddot.push(270-ptx);
  }

  printcomment(
    "Input Shaft at " +
      roundd(theta, 2) +
      "&deg; <br> Output Shaft at " +
      roundd(theta2 - 90, 2) +
      "&deg;",
    1
  );
  printcomment(
    "Input Angular Velocity = " +
      roundd(omega, 2) +
      "rad/s <br>Output Angular Velocity = " +
      roundd(omega2, 3) +
      "rad/s",
    2
  );

  theta2 = deg(Math.atan(Math.tan(rad(theta)) / Math.cos(rad(beta))));
  if (90 < theta && theta < 180) theta2 = 180 + theta2;
  if (theta > 180 && theta < 270) theta2 = 180 + theta2;
  if (theta > 270) theta2 = 360 + theta2;
  theta2 += 90;

  omega2 =
    (omega * Math.cos(rad(beta))) /
    (1 - Math.pow(Math.sin(rad(beta)), 2) * Math.pow(Math.cos(rad(theta)), 2));
  ox = o.xcoord = 0;
  oy = o.ycoord = 0;
  ax = a.xcoord = 0;
  ay = a.ycoord = r * Math.cos(rad(theta));
  bx = b.xcoord = r * Math.cos(rad(theta2)) * Math.sin(rad(beta));
  by = b.ycoord = r * Math.cos(rad(theta2)) * Math.cos(rad(beta));

  a1x = a1.xcoord = -a.xcoord;
  a1y = a1.ycoord = -a.ycoord;
  b1x = b1.xcoord = -b.xcoord;
  b1y = b1.ycoord = -b.ycoord;

  u.xcoord = r * Math.cos(rad(theta + 90));
  u.ycoord = r * Math.sin(rad(theta + 90));
  u1.xcoord = -u.xcoord;
  u1.ycoord = -u.ycoord;
  vx = v.xcoord = r * Math.cos(rad(beta)) * Math.cos(rad(theta2 + 90));
  vy = v.ycoord = r * Math.cos(rad(beta)) * Math.sin(rad(theta2 + 90));
  v1x = v1.xcoord = -v.xcoord;
  v1y = v1.ycoord = -v.ycoord;

  draw();
}

function draw() {
  canvas = document.getElementById("simscreen");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 550, 400); //clears the complete canvas#simscreen everytime

  if (document.getElementById("graphPlot").checked == false) {
    pointtrans(o, transo);
    pointtrans(a, transo);
    pointtrans(b, transo);
    pointtrans(a1, transo);
    pointtrans(b1, transo);
  }

  if (document.getElementById("graphPlot").checked == true) {
    pointtrans(o, trans);
    pointtrans(a, trans);
    pointtrans(b, trans);
    pointtrans(a1, trans);
    pointtrans(b1, trans);
  }
  if (theta < 90) {
    pointjoin(a1, o, ctx, "#500000", 5);
    pointjoin(b1, o, ctx, "#FF8C00", 5);
    pointjoin(a, o, ctx, "#500000", 5);
    ellipse1(50, a1y, ctx);
    pointjoin(b, o, ctx, "#FF8C00", 5);
    ellipse2(50, b1y, ctx);
  }
  if (theta >= 90 && theta < 180) {
    pointjoin(b, o, ctx, "#FF8C00", 5); //yellow
    pointjoin(a1, o, ctx, "#500000", 5); //brown
    pointjoin(b1, o, ctx, "#FF8C00", 5);
    ellipse2(50, b1y, ctx);
    pointjoin(a, o, ctx, "#500000", 5);
    ellipse1(50, a1y, ctx);
  }
  if (theta >= 180 && theta < 270) {
    pointjoin(a, o, ctx, "#500000", 5);
    pointjoin(b, o, ctx, "#FF8C00", 5);
    pointjoin(a1, o, ctx, "#500000", 5);
    ellipse1(50, a1y, ctx);
    pointjoin(b1, o, ctx, "#FF8C00", 5);
    ellipse2(50, b1y, ctx);
  }
  if (theta >= 270 && theta < 360) {
    pointjoin(b1, o, ctx, "#FF8C00", 5);
    pointjoin(a, o, ctx, "#500000", 5);
    pointjoin(b, o, ctx, "#FF8C00", 5);
    ellipse2(50, b1y, ctx);
    pointjoin(a1, o, ctx, "#500000", 5);
    ellipse1(50, a1y, ctx);
  }
  if (document.getElementById("graphPlot").checked == true) {
    s.xcoord = -60;
    s.ycoord = 0;
    pointtrans(s, trans);
    drawrect(s, 22, 7, 0, ctx, "#000080", "#000080", 1);

    ctx.beginPath();
    ctx.strokeStyle = "#008000";
    ctx.lineWidth = 7;
    s.xcoord = 52 * Math.cos(rad(beta));
    s.ycoord = -52 * Math.sin(rad(beta));
    pointtrans(s, trans);
    ctx.moveTo(s.xcoord, s.ycoord);
    s.xcoord = 75 * Math.cos(rad(beta));
    s.ycoord = -75 * Math.sin(rad(beta));
    pointtrans(s, trans);
    ctx.lineTo(s.xcoord, s.ycoord);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
  if (document.getElementById("graphPlot").checked == false) {
    s.xcoord = -60;
    s.ycoord = 130;
    pointtrans(s, trans);
    drawrect(s, 22, 7, 0, ctx, "#000080", "#000080", 1);

    ctx.beginPath();
    ctx.strokeStyle = "#008000"; //green
    ctx.lineWidth = 7;
    s.xcoord = 52 * Math.cos(rad(beta));
    s.ycoord = -52 * Math.sin(rad(beta));
    pointtrans(s, transo);
    ctx.moveTo(s.xcoord, s.ycoord);
    s.xcoord = 75 * Math.cos(rad(beta));
    s.ycoord = -75 * Math.sin(rad(beta));
    pointtrans(s, transo);
    ctx.lineTo(s.xcoord, s.ycoord);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  graph(ctx);
  velgraph(ctx);
  sideview();
}

function ellipse1(p, q, context) {
  context.save();
  context.beginPath();
  context.strokeStyle = "#000080"; //blue
  context.lineWidth = 8;
  if (a1y < 0) context.moveTo(a.xcoord, a.ycoord);
  else context.moveTo(a1.xcoord, a1.ycoord);
  i = -90;

  while (i <= 90) {
    m2 = Math.tan(rad(i));
    pos = p * q * Math.pow((1 + m2 * m2) / (q * q + p * p * m2 * m2), 0.5);
    x = pos * Math.cos(rad(i));
    y = pos * Math.sin(rad(i));
    if (a1y < 0) context.lineTo(o.xcoord + x, o.ycoord - y);
    else context.lineTo(o.xcoord - x, o.ycoord + y);
    i++;
  }
  context.stroke();
  context.closePath();
  context.restore();
}

function ellipse2(p, q, context) {
  context.save();
  context.beginPath();
  context.strokeStyle = "#008000"; //green
  context.lineWidth = 8; //changed
  q = b1y = b1y / Math.cos(rad(beta));
  if (b1y > 0) context.moveTo(b.xcoord, b.ycoord);
  else context.moveTo(b1.xcoord, b1.ycoord);
  i = 90;

  while (i <= 270) {
    m2 = Math.tan(rad(i));
    pos = p * q * Math.pow((1 + m2 * m2) / (q * q + p * p * m2 * m2), 0.5);
    x = pos * Math.cos(rad(-beta + i));
    y = pos * Math.sin(rad(-beta + i));
    if (b1y < 0) context.lineTo(o.xcoord + x, o.ycoord - y);
    else context.lineTo(o.xcoord - x, o.ycoord + y);
    i++;
  }
  context.stroke();
  context.closePath();
  context.restore();
}

function sideview() {
  if (document.getElementById("graphPlot").checked == true) {
    pointtrans(u, trans1);
    pointtrans(u1, trans1);
    pointtrans(v, trans1);
    pointtrans(v1, trans1);
  }
  if (document.getElementById("graphPlot").checked == false) {
    pointtrans(u, transo1);
    pointtrans(u1, transo1);
    pointtrans(v, transo1);
    pointtrans(v1, transo1);
  }

  /*ctx.beginPath();
ctx.strokeStyle="#000080";
ctx.lineWidth=8;
ctx.moveTo(u.xcoord, u.ycoord);
ctx.lineTo(u1.xcoord, u1.ycoord);
ctx.stroke();
ctx.closePath();
ctx.restore();*/

  ctx.beginPath();
  ctx.strokeStyle = "#500000";
  ctx.lineWidth = 6; //changed
  ctx.moveTo(u.xcoord, u.ycoord);
  ctx.lineTo(u1.xcoord, u1.ycoord);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();

  ctx.beginPath();
  ctx.strokeStyle = "#FF8C00";
  ctx.lineWidth = 6; //changed
  ctx.moveTo(v.xcoord, v.ycoord);
  ctx.lineTo(v1.xcoord, v1.ycoord);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();

  v1x = 50 * Math.sin(rad(beta));
  //ellipse3(v1x,v1y,ctx);
  s.xcoord = o.xcoord + 200;
  s.ycoord = o.ycoord + v1x + (23 / 2) * Math.sin(rad(beta));
  //drawrect(s,7,28*Math.sin(rad(beta)),0,ctx,"#008000","#008000",1);
}

function ellipse3(p, q, context) {
  context.save();
  context.beginPath();
  context.strokeStyle = "#008000";
  context.lineWidth = 8;
  q = 50 * Math.sin(rad(beta));
  if (q * q >= vy * vy) p = (vx * q) / Math.pow(q * q - vy * vy, 0.5);
  else p = (vx * q) / Math.pow(vy * vy - q * q, 0.5);
  printcomment(p + " " + q, 1);
  if (p < 0) context.moveTo(v.xcoord, v.ycoord);
  else context.moveTo(v1.xcoord, v1.ycoord);
  i = theta2 - 90;

  while (i <= theta2 + 90) {
    m2 = Math.tan(rad(i));
    pos = p * q * Math.pow((1 + m2 * m2) / (q * q + p * p * m2 * m2), 0.5);
    x = pos * Math.cos(rad(i));
    y = pos * Math.sin(rad(i));
    context.lineTo(o.xcoord + 200 + x, o.ycoord - y);
    //else context.lineTo(o.xcoord+200-x, o.ycoord+y);
    i++;
  }
  context.stroke();
  context.closePath();
  context.restore();
}

function graph(context) {
  if (document.getElementById("graphPlot").checked == true) {
    p = 30 + (theta * 2) / 3;
    q = 270 - ((theta2 - 90) * 2) / 3;
    if (!simstatus) {
      ptx.push(p);
      ptxdot.push(q);
      //ptxddot.push(270-theta*2/3);
      //ptxdddot.push(omega2);
      //pty.push();
    }
    /*else {
	ptxdot.push(30);
	ptx.push(270);
	ptxddot.push(270-ptx);
	}*/

    context.lineWidth = 0.5;
    context.strokeStyle = "#FF8C00";
    context.moveTo(40, 280);
    context.lineTo(280, 40);
    context.stroke();
    //context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = "#000000";

    {
      context.moveTo(30, 270);
      context.lineTo(270, 270);
      context.moveTo(30, 270);
      context.lineTo(30, 30);
      context.moveTo(300, 270);
      context.lineTo(540, 270);
      context.moveTo(300, 270);
      context.lineTo(300, 30);
      context.moveTo(300, 150);
      context.lineTo(540, 150);
      context.moveTo(270, 270);
      context.lineTo(270, 30);
      context.moveTo(540, 270);
      context.lineTo(540, 30);

      context.moveTo(90, 268);
      context.lineTo(90, 272);
      context.moveTo(150, 268);
      context.lineTo(150, 272);
      context.moveTo(210, 268);
      context.lineTo(210, 272);
      context.moveTo(270, 268);
      context.lineTo(270, 272);
      context.moveTo(360, 268);
      context.lineTo(360, 272);
      context.moveTo(420, 268);
      context.lineTo(420, 272);
      context.moveTo(480, 268);
      context.lineTo(480, 272);
      context.moveTo(540, 268);
      context.lineTo(540, 272);

      context.moveTo(28, 30);
      context.lineTo(32, 30);
      context.moveTo(28, 90);
      context.lineTo(32, 90);
      context.moveTo(28, 150);
      context.lineTo(32, 150);
      context.moveTo(28, 210);
      context.lineTo(32, 210);
      //context.moveTo(298,30);
      //context.lineTo(302,30);
      context.moveTo(298, 100);
      context.lineTo(302, 100);
      context.moveTo(298, 150);
      context.lineTo(302, 150);
      context.moveTo(298, 200);
      context.lineTo(302, 200);

      context.strokeStyle = "#000000";
      context.font = "10px 'Comic Sans MS'";
      context.textAlign = "center";
      context.fillText("0", 24, 276);
      context.fillText("90", 90, 282);
      context.fillText("180", 150, 282);
      context.fillText("270", 210, 282);
      context.fillText("360", 270, 282);

      context.fillText("0", 300, 282);
      context.fillText("90", 360, 282);
      context.fillText("180", 420, 282);
      context.fillText("270", 480, 282);
      context.fillText("360", 540, 282);

      context.fillText("90", 18, 215);
      context.fillText("180", 18, 155);
      context.fillText("270", 18, 95);
      context.fillText("360", 18, 35);

      context.fillText("Input Shaft Angle (deg)", 150, 295);
      context.fillText("Input Shaft Angle (deg)", 420, 295);

      context.fillText("Output Shaft", 50, 15);
      context.fillText("Angle (deg)", 50, 25);
      context.fillText("Onput Shaft", 320, 15);
      context.fillText("Velocity (rad/s)", 320, 25);
    }

    context.stroke();
    //pp.xcoord=ptx[ptx.length];
    //pp.ycoord=ptxdot[ptxdot.length];
    //pointdisp(pp,context,5,"#000000","#003366",'','','');
    plot_graph(ptx, ptxdot, context);
    //pointdisp(ptxdot[ptxdot.length-1],context,3,"#000000","#336699");
    ptxddot.push(270 - ptx);
    //plot_graph(ptx,ptxddot,context,truncate,"#336699");
  } else {
    // ptx = [];
    // ptxdot = [];
    // ptxddot = [];
    // pty = [];
    j = 20;
    //ptx.push(30);
    //pty.push(270);
  }
}

function plot_graph(pt, pty, context, truncate, gcolor, lwidth) {
  context.save();
  if (!lwidth) lwidth = 1;
  if (!gcolor) gcolor = "#FF0000";
  if (!truncate) truncate = 1000;
  context.beginPath();
  context.lineWidth = lwidth;
  context.strokeStyle = gcolor;
  context.moveTo(pt[0], pty[0]);
  i = 0;
  jj = 0;
  while (i < pty.length) {
    if (pty[i] > 200 && jj > 0) {
      context.lineTo(270, 30);
      break;
    } else context.lineTo(pt[i], pty[i]);
    i++;
    if (pty[i] < 100) jj++;
    /*if (i>=truncate)
	{
		pty.splice(0,1);
		i=i-1;
	}*/
  }
  context.stroke();
  context.closePath();
  context.restore();
}

function velgraph(context) {
  if (document.getElementById("graphPlot").checked == true) {
    if (!simstatus) {
      ptxdddot.push(150 - 50 * (omega2 - omega));
      pty.push(300 + (theta * 2) / 3);
    }
    plott(pty, ptxdddot, context);

    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    context.font = "10px 'Comic Sans MS'";
    context.textAlign = "center";
    context.fillText(roundd(omega + 1, 3), 288, 105);
    context.fillText(roundd(omega, 3), 288, 155);
    context.fillText(roundd(omega - 1, 3), 288, 205);
    context.stroke();
    context.closePath();
    context.restore();
  }
}

function plott(pt, pty, context, truncate, gcolor, lwidth) {
  context.save();
  if (!lwidth) lwidth = 1;
  if (!gcolor) gcolor = "#006400";
  if (!truncate) truncate = 1000;
  context.beginPath();
  context.lineWidth = lwidth;
  context.strokeStyle = gcolor;
  context.moveTo(pt[0], pty[0]);
  i = 0;
  jj = 0;
  //context.lineTo(300,pty[i]);
  while (i < pty.length) {
    if (pt[i] < 400 && jj > 0) {
      context.lineTo(540, pty[i]);
      break;
    } else context.lineTo(pt[i], pty[i]);
    i++;
    if (pt[i] > 500) jj++;
    /*if (i>=truncate)
	{
		pty.splice(0,1);
		i=i-1;
	}*/
  }
  context.stroke();
  context.closePath();
  context.restore();
}

function printcomment(commenttext, commentloc) {
  if (commentloc == 0) {
    document.getElementById("commentboxright").style.visibility = "hidden";
    // document.getElementById("commentboxleft").style.width = "570px";
    document.getElementById("commentboxleft").innerHTML = commenttext;
  } else if (commentloc == 1) {
    document.getElementById("commentboxright").style.visibility = "visible";
    // document.getElementById("commentboxleft").style.width = "550px";
    document.getElementById("commentboxleft").innerHTML = commenttext;
  } else if (commentloc == 2) {
    document.getElementById("commentboxright").style.visibility = "visible";
    // document.getElementById("commentboxleft").style.width = "550px";
    document.getElementById("commentboxright").innerHTML = commenttext;
  } else {
    document.getElementById("commentboxright").style.visibility = "hidden";
    // document.getElementById("commentboxleft").style.width = "570px";
    document.getElementById("commentboxleft").innerHTML =
      "<center>please report this issue to adityaraman@gmail.com</center>";
    // ignore use of deprecated tag <center> . Code is executed only if printcomment function receives inappropriate commentloc value
  }
}
