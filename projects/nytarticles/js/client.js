var myKey = config.apiKey;
getData();

//create request and retrieve data
function getData(){
	//grab most shared articles in Magazine category from last 30 days
	var url = "https://api.nytimes.com/svc/mostpopular/v2/mostshared/Technology/30.json";
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
	var thumbnail, thumbnailHeight, thumbnailWidth, thumbnailCaption;
	var cardHtml;
	
	url = result.url;
	author = result.byline;
	title = result.title;
	abstract = result.abstract;
	
	publishedDate = result.published_date;
	rankTotalShares = result.total_shares;
	
	thumbnail = result.media[0]["media-metadata"][1].url;
	thumbnailHeight = result.media[0]["media-metadata"][1].height;
	thumbnailWidth = result.media[0]["media-metadata"][1].width;
	thumbnailCaption = result.media[0]["caption"];
	
	cardHtml = "<div class='row'><div class='col s12 m5 offset-m1'><div class='card'><div class='card-image waves-effect waves-block waves-light'><img class='activator' src=" + thumbnail + " alt=" + thumbnailCaption + "></div><div class='card-content'><span class='card-title activator grey-text text-darken-4'>" + title + "<i class='material-icons right'>more_vert</i></span><p><a href=" + url + ">View Article</a></p></div><div class='card-reveal'><span class='card-title grey-text text-darken-4'>" + title + "<i class='material-icons right'>close</i></span><p>" + abstract + "</p></div></div></div></div>";
	
	$("#cards").append(cardHtml);
	
}