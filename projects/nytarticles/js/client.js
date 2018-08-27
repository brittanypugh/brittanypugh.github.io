var myKey = config.apiKey;
getData();

//create request and retrieve data
function getData(){
	//grab most shared articles in Magazine category from last 30 days
	var url = "https://api.nytimes.com/svc/mostpopular/v2/mostshared/Technology/1.json";
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
	var dataLength = data.results.length;
	var evenRowHtml, oddRowHtml, rowId, colId;
	var rowHtml, colHtml;
	
	if(dataLength == 0){
		appendErrorMessage();
	}else{
		for(var i=0; i<dataLength; i++){ 
			rowId = "row" + Math.floor((i/3) + 1); //ex: row1, row2,...
			colId = "col" + (i+1); //ex: col1, col2,...
			
			if((i%3) == 0){ //first card of the row
				rowHtml = "<div class='row' id='" + rowId +"'></div>";
				colHtml = "<div class='col s12 l4' id='"+ colId + "'></div>";
				$('#mainDiv').append(rowHtml);
				$('#'+rowId).append(colHtml);
				
				appendData(data.results[i], colId);
				
			}else{ //rest of cards in the row
				colHtml = "<div class='col s12 l4' id='"+ colId + "'></div>";
				$('#'+rowId).append(colHtml);
				
				appendData(data.results[i], colId)
			}
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
function appendData(result, colId){
	var url, author, title, abstract, publishedDate, rankTotalShares;
	var thumbnail, thumbnailHeight, thumbnailWidth, thumbnailCaption;
	var cardHtml;
	
	url = result.url;
	author = result.byline;
	title = result.title;
	abstract = result.abstract;
	
	publishedDate = result.published_date;
	rankTotalShares = result.total_shares;
	
	thumbnail = result.media[0]["media-metadata"][2].url;
	thumbnailHeight = result.media[0]["media-metadata"][2].height;
	thumbnailWidth = result.media[0]["media-metadata"][2].width;
	thumbnailCaption = result.media[0]["caption"];
	
	cardHtml = "<div class='card medium'><div class='card-image waves-effect waves-block waves-light'><img class='activator' src=" + thumbnail + " alt=" + thumbnailCaption + "></div><div class='card-content'><span class='card-title activator grey-text text-darken-4'>" + title + "<i class='material-icons right'>more_vert</i></span><p><a href=" + url + ">View Article</a></p></div><div class='card-reveal'><span class='card-title grey-text text-darken-4'>" + title + "<i class='material-icons right'>close</i></span><p>" + abstract + "</p></div></div>";
	
	$("#" + colId).append(cardHtml);
	
}