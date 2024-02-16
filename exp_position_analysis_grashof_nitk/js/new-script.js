//program variables
//controls section


var simstatus=0; 
var rotstatus=1;
//comments section
var commenttext="Some Text";
var commentloc=0;
//computing section
var trans= new point(100,150);
var cross= new point(375,150);
var a= new point(0,0,"A");
var b= new point(0,0,"B");
var c= new point(0,0,"C");
var d= new point(0,0,"D");
var a2= new point(0,0,"A");
var b2= new point(0,0,"B");
var c2= new point(0,0,"C");
var d2= new point(0,0,"D");

var r1= 40, r2=40, r3=40, r4=40;
var theta2 = 55; // all angles to be defined either in degrees only or radians only throughout the program and convert as and when required
var theta3=0, theta4=0; // All angles in Degrees. (mention the specification in the script like here) 
var omega2=1; // angular velocity in rad/s
var omega3=0, omega4=0;
var gamma=0, gammadash=0, theta3dash=0, theta4dash=0;
var k,ka,kb,kc,det;
var flaggrashof=true, firstrun=true;
//graphics section
var canvas;
var ctx;
//timing section
var simTimeId = setInterval("",'1000');
var pauseTime = setInterval("",'1000');
var time=0;
//point tracing section
var ptx = [];
var pty = [];
//click status of legend and quick reference
var legendCS = false;
var quickrefCS = false;
//temporary or dummy variables
var temp=0;

/*
// for trials during development
function trythis()
{ 		alert();}
*/




//change simulation specific css content. e.g. padding on top of variable to adjust appearance in variables window
function editcss()
{
$('.variable').css('padding-top','20px');
$('#datatable1').css('position','absolute');
$('#datatable2').css('position','absolute');
// $('#datatable1').css('left','120px');
// $('#datatable1').css('top','340px');
// $('#datatable2').css('left','395px');
// $('#datatable2').css('top','340px');

//$('#legend').css("width",document.getElementById('legendimg').width+"px");
//$('#quickref').css("height",document.getElementById('quickrefimg').height+"px");

}

//start of simulation here; starts the timer with increments of 0.1 seconds
function startsim()
{
simTimeId=setInterval("time=time+0.1; varupdate(); ",'100');
}

// switches state of simulation between 0:Playing & 1:Paused
function simstate()
{
  var imgfilename=document.getElementById('playpausebutton').src;
  imgfilename = imgfilename.substring(imgfilename.lastIndexOf('/') + 1, imgfilename.lastIndexOf('.'));
  if (imgfilename=="bluepausedull")
  {
    document.getElementById('playpausebutton').src="images/blueplaydull.svg";
	 clearInterval(simTimeId);
    simstatus=1;
    $('#theta2spinner').spinner("value",theta2);			//to set simulation parameters on pause
    pauseTime=setInterval("varupdate();",'100');
    document.querySelector(".playPause").textContent = "Play";
  }
    if (imgfilename=="blueplaydull")
  {
  	 time=0;			
  	 clearInterval(pauseTime);
    document.getElementById('playpausebutton').src="images/bluepausedull.svg";
    simTimeId=setInterval("time=time+0.1; varupdate(); ",'100');    
    simstatus=0;
    document.querySelector(".playPause").textContent = "Pause";
  } 
}

// switches state of rotation between 1:CounterClockWise & -1:Clockwise
function rotstate()
{
  var imgfilename=document.getElementById('rotationbutton').src;
  imgfilename = imgfilename.substring(imgfilename.lastIndexOf('/') + 1, imgfilename.lastIndexOf('.'));
  if (imgfilename=="clock")
  {
    document.getElementById('rotationbutton').src="images/anti.svg";
    rotstatus=-1;
  }
    if (imgfilename=="anti")
  {
    document.getElementById('rotationbutton').src="images/clock.svg";
    rotstatus=1;
  } 
}




//Initialise system parameters here
function varinit()
{
varchange();		
//Variable r1 slider and number input types
$('#r1slider').slider("value", 80);	
$('#r1spinner').spinner("value", 80);
//Variable r2 slider and number input types
$('#r2slider').slider("value", 60);	
$('#r2spinner').spinner("value", 60);
//Variable r3 slider and number input types
$('#r3slider').slider("value", 80);	
$('#r3spinner').spinner("value", 80);
//Variable r4 slider and number input types
$('#r4slider').slider("value", 60);	
$('#r4spinner').spinner("value", 60);
//Variable theta2 slider and number input types
$('#theta2slider').slider("value", 40);	
$('#theta2spinner').spinner("value", 40);
//Variable omega2 slider and number input types
$('#omega2slider').slider("value", 1);	
$('#omega2spinner').spinner("value", 1);
}

// Initialise and Monitor variable containing user inputs of system parameters.
//change #id and repeat block for new variable. Make sure new <div> with appropriate #id is included in the markup
function varchange()
{
//Variable r1 slider and number input types
$('#r1slider').slider({ max : 100, min : 20, step : 2 });		// slider initialisation : jQuery widget
$('#r1spinner').spinner({ max : 100, min : 20, step : 2 });		// number initialisation : jQuery widget			
// monitoring change in value and connecting slider and number
// setting trace point coordinate arrays to empty on change of link length
$( "#r1slider" ).on( "slide", function( e, ui ) { $('#r1spinner').spinner("value",ui.value); ptx=[]; pty=[]; } );
$( "#r1spinner" ).on( "spin", function( e, ui ) { $('#r1slider').slider("value",ui.value); ptx=[]; pty=[]; } );
$( "#r1spinner" ).on( "change", function() {  varchange() } );

//Variable r1 slider and number input types
$('#r2slider').slider({ max : 100, min : 20, step : 2 });		// slider initialisation : jQuery widget
$('#r2spinner').spinner({ max : 100, min : 20, step : 2 });		// number initialisation : jQuery widget			
// monitoring change in value and connecting slider and number
// setting trace point coordinate arrays to empty on change of link length
$( "#r2slider" ).on( "slide", function( e, ui ) { $('#r2spinner').spinner("value",ui.value); ptx=[]; pty=[]; r2changed();} );
$( "#r2spinner" ).on( "spin", function( e, ui ) { $('#r2slider').slider("value",ui.value); ptx=[]; pty=[]; r2changed();} );
$( "#r2spinner" ).on( "change", function() {  varchange() } );

//Variable r1 slider and number input types
$('#r3slider').slider({ max : 100, min : 20, step : 2 });		// slider initialisation : jQuery widget
$('#r3spinner').spinner({ max : 100, min : 20, step : 2 });		// number initialisation : jQuery widget			
// monitoring change in value and connecting slider and number
// setting trace point coordinate arrays to empty on change of link length
$( "#r3slider" ).on( "slide", function( e, ui ) { $('#r3spinner').spinner("value",ui.value); ptx=[]; pty=[]; } );
$( "#r3spinner" ).on( "spin", function( e, ui ) { $('#r3slider').slider("value",ui.value); ptx=[]; pty=[]; } );
$( "#r3spinner" ).on( "change", function() {  varchange() } );

//Variable r1 slider and number input types
$('#r4slider').slider({ max : 100, min : 20, step : 2 });		// slider initialisation : jQuery widget
$('#r4spinner').spinner({ max : 100, min : 20, step : 2 });		// number initialisation : jQuery widget			
// monitoring change in value and connecting slider and number
// setting trace point coordinate arrays to empty on change of link length
$( "#r4slider" ).on( "slide", function( e, ui ) { $('#r4spinner').spinner("value",ui.value); ptx=[]; pty=[]; } );
$( "#r4spinner" ).on( "spin", function( e, ui ) { $('#r4slider').slider("value",ui.value); ptx=[]; pty=[]; } );
$( "#r4spinner" ).on( "change", function() {  varchange() } );

//Variable theta2 slider and number input types
$('#theta2slider').slider({ max : 360, min : 0, step : 2 });		// slider initialisation : jQuery widget
$('#theta2spinner').spinner({ max : 360, min : 0, step : 2 });		// number initialisation : jQuery widget			
// monitoring change in value and connecting slider and number
// setting trace point coordinate arrays to empty on change of link length
$( "#theta2slider" ).on( "slide", function( e, ui ) { $('#theta2spinner').spinner("value",ui.value); ptx=[]; pty=[]; } );
$( "#theta2spinner" ).on( "spin", function( e, ui ) { $('#theta2slider').slider("value",ui.value); ptx=[]; pty=[]; } );
$( "#theta2spinner" ).on( "change", function() {  varchange() } );

//Variable omega2 slider and number input types
$('#omega2slider').slider({ max : 1.8, min : 0.2, step : 0.2 });		// slider initialisation : jQuery widget
$('#omega2spinner').spinner({ max : 1.8, min : 0.2, step : 0.2 });		// number initialisation : jQuery widget			
// monitoring change in value and connecting slider and number
// setting trace point coordinate arrays to empty on change of link length
$( "#omega2slider" ).on( "slide", function( e, ui ) { $('#omega2spinner').spinner("value",ui.value); ptx=[]; pty=[]; } );
$( "#omega2spinner" ).on( "spin", function( e, ui ) { $('#omega2slider').slider("value",ui.value); ptx=[]; pty=[]; } );
$( "#omega2spinner" ).on( "change", function() {  varchange() } );

varupdate();

}

//Four Bar Specific : resetting lower limit of r1 r3 r4 on change of r2
function r2changed()
{

$('#r1slider').slider({min: $('#r2spinner').spinner('value')});
$('#r3slider').slider({min: $('#r2spinner').spinner('value')});
$('#r4slider').slider({min: $('#r2spinner').spinner('value')});
$('#r1spinner').spinner({min: $('#r2spinner').spinner('value')});
$('#r3spinner').spinner({min: $('#r2spinner').spinner('value')});
$('#r4spinner').spinner({min: $('#r2spinner').spinner('value')});
}

//Computing of various system parameters
function varupdate()
{

$('#r1slider').slider("value", $('#r1spinner').spinner('value'));  //updating slider location with change in spinner(debug)
$('#r2slider').slider("value", $('#r2spinner').spinner('value'));
$('#r3slider').slider("value", $('#r3spinner').spinner('value'));
$('#r4slider').slider("value", $('#r4spinner').spinner('value'));
$('#theta2slider').slider("value", $('#theta2spinner').spinner('value')); 
$('#omega2slider').slider("value", $('#omega2spinner').spinner('value')); 

r1=$('#r1spinner').spinner("value");
r2=$('#r2spinner').spinner("value");
r3=$('#r3spinner').spinner("value");
r4=$('#r4spinner').spinner("value");


if(!simstatus)
{
$('#omega2set').show();
$('#theta2set').hide();

$('#r1spinner').spinner("disable");
$('#r2spinner').spinner("disable");
$('#r3spinner').spinner("disable");
$('#r4spinner').spinner("disable");
$('#r1slider').slider("disable");
$('#r2slider').slider("disable");
$('#r3slider').slider("disable");
$('#r4slider').slider("disable");

omega2=$('#omega2spinner').spinner("value");
//printcomment(omega2,2);
theta2=theta2+(rotstatus*0.1*deg(omega2));
theta2=theta2%360;

}
if(simstatus)
{
if(firstrun){r2changed(); firstrun=false;}
$('#r1spinner').spinner("enable");
$('#r2spinner').spinner("enable");
$('#r3spinner').spinner("enable");
$('#r4spinner').spinner("enable");
$('#r1slider').slider("enable");
$('#r2slider').slider("enable");
$('#r3slider').slider("enable");
$('#r4slider').slider("enable");

$('#omega2set').hide();
$('#theta2set').show();
theta2=$('#theta2spinner').spinner("value");
}
checkGrashof();

if(flaggrashof){
k=(r2*r2-r3*r3+r4*r4+r1*r1)/2;
ka=k-r2*(r1-r4)*Math.cos(rad(theta2))-r4*r1;
kb=-2*r2*r4*Math.sin(rad(theta2));
kc=k-r2*(r1+r4)*Math.cos(rad(theta2))+r4*r1;
det=kb*kb-4*ka*kc;
a.xcoord=0;
a.ycoord=0;
a2.xcoord=0;
a2.ycoord=0;

   b.xcoord=a.xcoord+(r2*Math.cos(rad(theta2)));
	b.ycoord=a.ycoord+(r2*Math.sin(rad(theta2)));
	d.xcoord=a.xcoord+(r1);
	d.ycoord=a.ycoord;
	b2.xcoord=a2.xcoord+(r2*Math.cos(rad(theta2)));
	b2.ycoord=a2.ycoord+(r2*Math.sin(rad(theta2)));
	d2.xcoord=a2.xcoord+(r1);
	d2.ycoord=a2.ycoord;
	if(r1==r3 && r2==r4)
	{
		theta4=theta2;
		if(theta2<180)
		theta4dash=deg(2*Math.atan((-kb+Math.sqrt(det))/(2*ka)));
		else
		theta4dash=deg(2*Math.atan((-kb-Math.sqrt(det))/(2*ka)));
	}
	else
	{
	theta4=deg(2*Math.atan((-kb-Math.sqrt(det))/(2*ka)));
	theta4dash=deg(2*Math.atan((-kb+Math.sqrt(det))/(2*ka)));
	
	}
	theta3=deg(Math.asin((r4*Math.sin(rad(theta4))-r2*Math.sin(rad(theta2)))/r3));
	theta3dash=deg(Math.asin((r4*Math.sin(rad(theta4dash))-r2*Math.sin(rad(theta2)))/r3));
	
	c.xcoord=d.xcoord+r4*Math.cos(rad(theta4));
	c.ycoord=d.ycoord+r4*Math.sin(rad(theta4));
	c2.xcoord=d2.xcoord+r4*Math.cos(rad(theta4dash));
	c2.ycoord=d2.ycoord+r4*Math.sin(rad(theta4dash));
	gamma=theta4-theta3;
	gammadash=theta4dash-theta3dash;
	if(theta3<0)
		theta3+=360;
	if(theta4<0)
		theta4+=360;
	if(theta3dash<0)
		theta3dash+=360;
	if(theta4dash<0)
		theta4dash+=360;
	if(theta3dash==360)
		theta3dash=0;
		dispTables();

}
draw();

}

//Simulation graphics
function draw()
{
  canvas = document.getElementById("simscreen");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,550,400);  //clears the complete canvas#simscreen everytime
  if (flaggrashof)
  { 
  
$('#titleincanvas').show();
$('#datatable1').show();
$('#datatable2').show(); 
  a=pointtrans(a,trans);
  b=pointtrans(b,trans);
  c=pointtrans(c,trans);
  d=pointtrans(d,trans);
  a2=pointtrans(a2,cross);
  b2=pointtrans(b2,cross);
  c2=pointtrans(c2,cross);
  d2=pointtrans(d2,cross);
document.getElementById('titleincanvas').innerHTML="Grashof Mechanism";
  pointjoin(a,b,ctx,"#0066FF");
  pointjoin(b,c,ctx,"#D00000");
  pointjoin(c,d,ctx,"#005500");
  pointjoin(d,a,ctx,"#993300");
  pointjoin(a2,b2,ctx,"#0066FF");
  pointjoin(b2,c2,ctx,"#D00000");
  pointjoin(c2,d2,ctx,"#005500");
  pointjoin(d2,a2,ctx,"#993300");
  pointdisp(a,ctx);
  pointdisp(b,ctx);
  pointdisp(c,ctx);
  pointdisp(d,ctx);
  pointdisp(a2,ctx);
  pointdisp(b2,ctx);
  pointdisp(c2,ctx);
  pointdisp(d2,ctx);
  }
  else
  {
  
$('#titleincanvas').hide();
$('#datatable1').hide();
$('#datatable2').hide();
  ctx.strokeStyle="#000000";
  ctx.font = "16px Georgia";
  ctx.save();
  ctx.strokeText("Combination does not satisfy Grashof rule ",100,200);
  ctx.restore();
  printcomment("<center>Please go to non-Grashof simulation<br>if you wish to work with the given link combination</center>",0)
  }
 
}
//function to check whether links satisfy grashof condition
function checkGrashof()
{
	var links= new Array(4);
	links[0]=r1;
	links[1]=r2;
	links[2]=r3;
	links[3]=r4;
	links.sort(function(p, q){return p-q});
	var s=links[0];
	var p=links[1];
	var q=links[2];
	var l=links[3];
	if (s+l>p+q)
	{ 
		flaggrashof=false;
		
	}
	else 
	{
		flaggrashof=true;

	}
}

function dispTables()
{
document.getElementById("datatable1").innerHTML="<p>Open Configuration</p>\
<table>\
<tr><th>Angle</th><th>Value</th></tr>\
<tr><td>&theta;<sub>2</sub></td><td>"+roundd(theta2,2)+"&deg;</td></tr>\
<tr><td>&theta;<sub>3</sub></td><td>"+roundd(theta3,2)+"&deg;</td></tr>\
<tr><td>&theta;<sub>4</sub></td><td>"+roundd(theta4,2)+"&deg;</td></tr>\
<tr><td>&gamma;</td><td>"+roundd(gamma,2)+"&deg;</td></tr>\
</table>";

document.getElementById("datatable2").innerHTML="<p>Crossed Configuration</p>\
<table>\
<tr><th>Angle</th><th>Value</th></tr>\
<tr><td>&theta;<sub>2</sub></td><td>"+roundd(theta2,2)+"&deg;</td></tr>\
<tr><td>&theta;<sub>3</sub></td><td>"+roundd(theta3dash,2)+"&deg;</td></tr>\
<tr><td>&theta;<sub>4</sub></td><td>"+roundd(theta4dash,2)+"&deg;</td></tr>\
<tr><td>&gamma;</td><td>"+roundd(gamma,2)+"&deg;</td></tr>\
</table>"; // confirm why only gamma was being displayed in the flash simulation.
}
// prints comments passed as 'commenttext' in location specified by 'commentloc' in the comments box;
// 0 : Single comment box, 1 : Left comment box, 2 : Right comment box
function printcomment(commenttext,commentloc)
{
  if(commentloc==0)
  {
  document.getElementById('commentboxright').style.visibility='hidden';
  document.getElementById('commentboxleft').style.width='570px';
  document.getElementById('commentboxleft').innerHTML = commenttext;
  }
  else if(commentloc==1)
  {
  document.getElementById('commentboxright').style.visibility='visible';
  document.getElementById('commentboxleft').style.width='285px';
  document.getElementById('commentboxleft').innerHTML = commenttext;
  }
  else if(commentloc==2)
  {
  document.getElementById('commentboxright').style.visibility='visible';
  document.getElementById('commentboxleft').style.width='285px';
  document.getElementById('commentboxright').innerHTML = commenttext;
  }
  else
  {
  document.getElementById('commentboxright').style.visibility='hidden';
  document.getElementById('commentboxleft').style.width='570px';
  document.getElementById('commentboxleft').innerHTML = "<center>please report this issue to adityaraman@gmail.com</center>"; 
  // ignore use of deprecated tag <center> . Code is executed only if printcomment function receives inappropriate commentloc value
  }
}
