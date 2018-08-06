
$('#search-button').on('click', function(event) {
	var word = $('#word-input').val(); //grab input
	$('#word-input').val(' '); //clear input
	$("#wordResults tr").remove();
	addCaption(word);
	getData(word);
	
});

//add table caption with user's word
function addCaption(word){
	$('#tableCaption').append("Dictionary results for <span id='userWord'>" + word + "</span>");
}
					  
//create request and retrieve data
function getData(word){
	//grab first 10 word results that rhyme with the user's word
	//grab pronunciation, definition and frequency of each result
	var url = "https://api.datamuse.com/words?rel_rhy=" + word + "&md=p,d,f&max=30";
	
	$.ajax({
		method: "GET",
		url: url,
		headers: {"Accept": "application/json"},
		async: true,
		dataType: "json",
		success: function(json){
			displayData(json);
		},
		error: function(xhr){
			console.log("An error occured: "+xhr.status + " " + xhr.statusText);
		}
	});
}

//show word results
function displayData(data){
	var results = data.length;
	
	if(results == 0){
		appendErrorMessage();
	}else{
		for(var i=0; i<data.length; i++){
			appendData(data[i]);
		}
	}
}

function appendErrorMessage(){
	var errorMessage = "<p>No results found. Please try another word.</p>"
	$("#results").append(errorMessage);
}

function appendData(result){
	var word, numSyllables, partOfSpeech, frequencyIndex, frequency, wordHtml, tableRowHtml;
	
	word = result.word;
	numSyllables = result.numSyllables;
	if (result.tags[0].indexOf("f:") > -1){
		partOfSpeech = "n/a";
	}else{
		partOfSpeech = result.tags[0];
	}
	
	frequencyIndex = result.tags.length - 1;
	frequency = Math.ceil(result.tags[frequencyIndex].split("f:")[1]); //grab number
	
	tableRowHtml = "<tr><td>" + word + "</td>" + "<td>" + partOfSpeech + "</td>"  + "<td>" + numSyllables + "</td>" + "<td>" + frequency + "</td></tr>";
	$("#wordResults").append(tableRowHtml);
	
}