var painting;
var lastX;
var lastY;

var merge = document.createElement("canvas");
merge.width = 1024;
merge.height = 1024;
var mergeContext = merge.getContext("2d");



imageChoices = ["cassini", "titan", "titan2", "titan3", "saturn-rings", "saturn-rings2",
	"saturn-rings3", "saturn-rings4", "saturn-rings5"];

$(document).ready(function (e) {
	images = []
	alphas = []
	for (name in imageChoices) {
		var im = new Image;
		im.src = (imageChoices[name] + ".jpg")
		var al = new Image
		al.src = (imageChoices[name] + "-alpha.png")
		images.push(im)
		alphas.push(al)

		clickable = new Image;
		clickable.src = (imageChoices[name] + "-small.jpg")
		$(clickable).data("index", name);
		$("#imageSelector").append(clickable);
		$(clickable).click(function (e) {
			var pad = $("#pad")[0];
			var context = pad.getContext("2d");
			index = $( this ).data("index");
			context.clearRect(0, 0, pad.width, pad.height);
			context.drawImage(images[index], 0, 0);
			var alphaPad = $("#alpha")[0];
			var alphaContext = alphaPad.getContext("2d");
			alphaContext.clearRect(0, 0, alphaPad.width, alphaPad.height);
			alphaContext.drawImage(alphas[index], 0, 0);
			e.preventDefault();
		});
	}
	images[0].onload = function() {
		var pad = $("#pad")[0];
		var context = pad.getContext("2d");
		context.drawImage(images[0], 0, 0);
	};

	alphas[0].onload = function() {
		var alphaPad = $("#alpha")[0];
		var alphaContext = alphaPad.getContext("2d");
		alphaContext.drawImage(alphas[0], 0, 0);
	};

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
		$("#download").attr("download", "coloured.png");
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


