setLink();

$(document).ready(function(){

  var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
  console.log("FUCKERS!");
  var button = $("#search");
  var input = $("#searches");
  var x = $(".x-mark");

	var col1 = $('#wikis');
	var col2 = $('#wikis2');

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
                generateList(data[1]);
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
                col1.empty();
                col2.empty();
                generateResults(data);
           	 }
   		})
	});

	function generateList(results){
		var suggestion = $('#suggestions');
		for(var x = 0; x < results.length; x++){
                suggestion.append('<option value="'+results[x]+'">');
            }
	}

	function generateResults(results){
		console.log(results);

		// col1.hide();
		// col2.hide();
		var len = results[1].length;
		for(var x = 0; x < len; x++){
			col1.append('<div class="results"><h4>'+results[1][x]+'</h4><p>'+results[2][x]+'</p><div class="text-justify"><a href="'+results[3][x]+'" target="_blank" class="link">Know more <i class="fa fa-arrow-circle-right"></i></a></div></div>');
		  x += 1;
    }
		for(var y = 1; y < len; y++){
			col2.append('<div class="results"><h4>'+results[1][y]+'</h4><p>'+results[2][y]+'</p><div class="text-justify"><a href="'+results[3][y]+'" target="_blank" class="link">Know more <i class="fa fa-arrow-circle-right"></i></a></div></div>');
		  y += 1;
    }
	}

  $('.random').on("click", setLink);

});

  function setLink(){
    var random = "https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=1";
    var searchRandom = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
    $.ajax({
         url:random,
         dataType: "jsonp",
             method:"GET",
             success:function(data){
               var title = data.query.random[0].title;
               var link = searchRandom+title;
               $.ajax({
                url:link,
                dataType: "jsonp",
                method: "GET",
                success: function(result){
                  $('.random').attr("href", result[3][0]);
                }
               });
             }
      });
  }