var value = 0;
var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';

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

  input.on("keydown", function(e){
  	var val = $(this).val();
  	if(val != ''){
  		api = url+val;
  		console.log(val);
  		$.ajax({
   			 url:api,
   			 dataType: "jsonp",
           	 method:"GET",
           	 success:function(data){
           	 	console.log(data[1]);
           	 	$('#suggestions').empty();
                for(var x = 0; x < data[1].length; x++){
                	$('#suggestions').append('<option value="'+data[1][x]+'">');
                }
                
           	 }
   		})
   		if(e.keyCode == 13)
	    {
	        $(this).trigger("enterKey");
	    }
  	}

  });

  	input.bind("enterKey",function(e){
   		var val = $(this).val();
   		api = url+val;
   		$.ajax({
   			 url:api,
   			 dataType: "jsonp",
           	 method:"GET",
           	 success:function(data){
           	 	console.log(data);
                $('#wikis').empty();
                for(var x = 0; x < data[1].length; x++){
                	// console.log(data[1][x] + " " + data[2][x] + " " +data[3][x]);
                	$('#wikis').append('<a href="'+data[3][x]+'" target="_blank" class="btn btn-default btn-block"><b>'+data[1][x]+'</b>:<div><p>'+data[2][x]+'</p></div></a>');
                }
           	 }
   		})
	});

});

