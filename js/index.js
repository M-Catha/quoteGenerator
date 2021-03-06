var getQuote = function() {

	$(".quote").remove();
	$(".author").remove();
	$("#twitterButton").remove();
	
	// Using CORS anywhere plug-in
	jQuery.ajaxPrefilter(function(options) {
    		if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    		}
  	});

	$.ajax({
		method: "GET",
		url: "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?",
		dataType: 'jsonp',
		success: function(json) {
			if (json) {

				var quoteText = json.quoteText;
				var quoteAuthor = json.quoteAuthor;

				$(".textContainer").append("<blockquote class='quote'>\"" + quoteText + "\"</blockquote>" + 
										"<footer class='author'>- " + quoteAuthor + "</footer>");

				$(".buttonContainer").append("<a target='_blank' href='https://twitter.com/intent/tweet?text=" + quoteText + 
											"- " + quoteAuthor + "'><button id='twitterButton' class='btn'>" + 
											"<i class='fa fa-twitter'></i> Tweet Quote</button></a>");

				var generatedColor = generateBackground();
	
				changeAllColors("body", ".textContainer", ".quote", ".btn", generatedColor, 250);

			} else {
				$(".errorMessage").css("display", "block");
			}
		}
	})

}

$("#quoteButton").click(getQuote);


function generateBackground() {
	
	var red = getRandomNumber();
	var blue = getRandomNumber();
	var green = getRandomNumber();

	var bgColor = "rgb(" + red + "," + blue + "," + green +")";

	return bgColor;
}

function getRandomNumber() {
	var minRGBValue = 0;
	var maxRGBValue = 100;
	return Math.floor(Math.random() * (maxRGBValue - minRGBValue)) + minRGBValue;
}

function changeAllColors(body, text, quote, button, color, time) {
	$(body).animate({backgroundColor: color}, time);
	$(text).animate({color: color}, time);
	$(quote).animate({"border-left-color" : color}, time);
	$(quote).css({
		"border-left-width": "15px",
		"border-left-style": "solid"
	});			
	$(button).animate({backgroundColor: color}, time);
}
