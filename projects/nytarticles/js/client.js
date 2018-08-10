var myKey = config.apiKey;
getData();

//create request and retrieve data
function getData(){
	//grab most shared articles in Magazine category from last 30 days
	var url = "https://api.nytimes.com/svc/mostpopular/v2/mostshared/Opinion/30.json";
	url += '?' + $.param({
	  'api-key': myKey
	});
	
	$.ajax({
	  url: url,
	  method: 'GET',
	}).done(function(result) {
	  console.log(result);
	  displayData(result);
	}).fail(function(err) {
	  throw err;
	});
	
}

//loop through results and call function to display results
function displayData(data){
	var results = data.results.length;
	
	if(results == 0){
		appendErrorMessage();
	}else{
		for(var i=0; i<results; i++){
			appendData(data.results[i]);
		}
	}
}

//add error message if no data
function appendErrorMessage(){
	$('#error').empty();
	var errorMessage = "<p>No results found. Please try again.</p>";
	$('#error').append(errorMessage);
}

//organize data with cards and add cards to page
function appendData(result){
	var url, author, title, abstract, publishedDate, rankTotalShares;
	var thumbnail, thumbnailHeight, thumbnailWidth;
	var cardHtml;
	
	url = result.url;
	author = result.byline;
	title = result.title;
	abstract = result.abstract;
	
	publishedDate = result.published_date;
	rankTotalShares = result.total_shares;
	
	thumbnail = result.media[0]["media-metadata"][0].url;
	thumbnailHeight = result.media[0]["media-metadata"][0].height;
	thumbnailWidth = result.media[0]["media-metadata"][0].width;
	
	cardHtml =  "<div class='row'><div class='col s12 m7'><div class='card'><div class='card-image'><img src=" + thumbnail + "><span class='card-title'>" + title + "</span></div><div class='card-content'><p>" + author + "</p><p>" + publishedDate + "</p><p>" + abstract + "</p></div><div class='card-action'><a href=" + url + ">View Article</a></div></div></div></div>";
	
	$("#cards").append(cardHtml);
	
}