var value = 0;
var shit = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='+value;

$(document).ready(function(){
  console.log("FUCKERS!");
  var button = $("#search");
  var input = $("#searches");
  var x = $(".x-mark");
  x.hide();
  input.hide();
  	button.on("click", function(){
  		input.fadeIn().animate({width: '100%'});
  		button.fadeOut();
  		x.fadeIn(3000);
  		$(".random").css("margin-left", "0px");
  	});
  	x.on("click", function(){
  		x.hide();
  		input.animate({width: '1%'}).fadeOut();
  		button.fadeIn();
  		$(".random").css("margin-left", "5px");
  	});
});
