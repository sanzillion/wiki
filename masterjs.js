setLink();

$(document).ready(function(){
  console.log("WELCOME FUCKERS!");
  var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
  
  //initialize DOM calls
  var button = $("#search");
  var input = $("#searches");
  var x = $(".x-mark");

	var col1 = $('#wikis');
	var col2 = $('#wikis2');
  var rbtn = $(".random");

  //set property opacity to 0
  col1.css("opacity", "0");
  col2.css("opacity", "0");

  //button animation
  x.hide();
  input.hide();
  	button.on("click", function(){
  		input.fadeIn().animate({width: '100%'});
  		button.fadeOut();
  		x.fadeIn(3000);
  		rbtn.css("margin-left", "0px");
  	});
  	x.on("click", function(){
  		x.hide();
  		input.animate({width: '1%'}).fadeOut();
  		button.fadeIn();
  		rbtn.css("margin-left", "5px");
      col1.animate({opacity: '0'});
      col2.animate({opacity: '0'});
  	});

    //For auto-suggestions and input value
  input.on("keydown", function(e){
  	var val = $(this).val();
  	if(val != ''){
  		api = url+val;
  		$.ajax({
   			 url:api,
   			 dataType: "jsonp",
           	 method:"GET",
           	 success:function(data){
           	 	$('#suggestions').empty();
                generateList(data[1]);
           	 }
   		})
   		if(e.keyCode == 13) //keyCode for Enter Key is 13
	    {
	        $(this).trigger("enterKey");
	    }
  	}

  });

  //process input value upon enter
  	input.bind("enterKey",function(e){
      col1.animate({opacity: '0', marginTop: '50px'},100);
      col2.animate({opacity: '0', marginTop: '50px'},300);
   		var val = $(this).val();
   		api = url+val;
   		$.ajax({
   			 url:api,
   			 dataType: "jsonp",
         method:"GET",
         success:function(data){
            col1.empty(); //clean columns
            col2.empty(); 
            generateResults(data);
         }
   		})
	});

  //generate List with title array
	function generateList(results){
		var suggestion = $('#suggestions');
		for(var x = 0; x < results.length; x++){
                suggestion.append('<option value="'+results[x]+'">');
            }
	}

  //process return value from opensearch
	function generateResults(results){

    col1.css("margin-top", "50px");
    col2.css("margin-top", "50px");

		var len = results[1].length;
		for(var x = 0; x < len; x++){
			col1.append('<div class="results"><h4>'+results[1][x]+'</h4><p>'+results[2][x]+'</p><div class="text-justify"><a href="'+results[3][x]+'" target="_blank" class="link">Know more <i class="fa fa-arrow-circle-right"></i></a></div></div>');
		  x += 1;
    }
		for(var y = 1; y < len; y++){
			col2.append('<div class="results"><h4>'+results[1][y]+'</h4><p>'+results[2][y]+'</p><div class="text-justify"><a href="'+results[3][y]+'" target="_blank" class="link">Know more <i class="fa fa-arrow-circle-right"></i></a></div></div>');
		  y += 1;
    }

    console.log("Generated");
    //when generated, entrance animation
      col1.animate({
        opacity: '1',
        marginTop: '0px'
      },500);

      col2.animate({
        opacity: '1',
        marginTop: '0px'
      },600);
	}

  rbtn.on("click", setLink);

});

  function setLink(){
    console.log("Linking...");
    //first get one random title from the API
    var random = "https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=1";
    //then use that title to get results from WIKI API
    var searchRandom = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
    $.ajax({
         url:random,
         dataType: "jsonp",
             method:"GET",
             success:function(data){
               //get TITLE
               var title = data.query.random[0].title;
               //combine title to searchRandom URL for opensearch
               var link = searchRandom+title;
               $.ajax({
                url:link,
                dataType: "jsonp",
                method: "GET",
                success: function(result){
                  //USE OPEN SEARCH TO GET RESULTS
                  $('.random').attr("href", result[3][0]);
                }
               });
             }
      });
    console.log("Link successful!");
  }