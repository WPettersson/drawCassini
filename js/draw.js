var painting;
var lastX;
var lastY;

var cassini = new Image;
cassini.src = "cassini.jpg";
var cassiniAlpha = new Image;
cassiniAlpha.src = "cassiniAlpha.png";

cassini.onload = function() {
	var pad = $("#pad")[0];
	var context = pad.getContext("2d");
	context.drawImage(cassini, 0, 0);
};

cassiniAlpha.onload = function() {
	var alphaPad = $("#alpha")[0];
	var alphaContext = alphaPad.getContext("2d");
	alphaContext.drawImage(cassiniAlpha, 0, 0);
};

var merge = document.createElement("canvas");
merge.width = 1024;
merge.height = 1024;
var mergeContext = merge.getContext("2d");

$(document).ready(function (e) {

	$("#alpha").mousedown(function (e) {
		var parentOffset = $("#images").offset();
		var x = e.pageX - this.offsetLeft - parentOffset.left;
		var y = e.pageY - this.offsetTop - parentOffset.top;
		painting = true;
		lastX = x;
		lastY = y;
		drawLine(x,y);
		e.preventDefault();
	});

	$("#alpha").mousemove(function (e) {
		if (!painting) {
			return;
		}
		var parentOffset = $("#images").offset();
		var x = e.pageX - this.offsetLeft - parentOffset.left;
		var y = e.pageY - this.offsetTop - parentOffset.top;
		drawLine(x,y);
		e.preventDefault();
	});

	$("#alpha").mouseup(function (e) {
		painting = false;
		e.preventDefault();
	});

	$("#alpha").mouseleave(function (e) {
		painting = false;
		e.preventDefault();
	});


	$("#download").click(function (e) {
		mergeContext.drawImage($("#pad")[0], 0, 0);
		mergeContext.drawImage($("#alpha")[0], 0, 0);
		$("#download").attr("href", merge.toDataURL());
		$("#download").attr("download", "cassini-coloured.png");
	});
});


function drawLine(x, y) {
	var canvas = $("#pad")[0];
	var context = canvas.getContext("2d");
	var color = $("#wcp").wheelColorPicker("getValue", "css");
	context.strokeStyle = color;
	context.lineJoin = "round";
	context.lineWidth = $("#brushsize").val();
	context.beginPath();
	context.moveTo(lastX, lastY);
	context.lineTo(x, y);
	context.closePath();
	context.stroke();
	lastX = x;
	lastY = y;
}


