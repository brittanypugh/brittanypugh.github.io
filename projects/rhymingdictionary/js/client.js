
$('#search-button').on('click', function(event) {
	var word = $('#word-input').val();
	$("#results").empty();
	getData(word);
	
});
					  
//create request and retrieve data
function getData(word){
	//grab first 10 word results that rhyme with the user's word
	//grab pronunciation, definition and frequency of each result
	var url = "https://api.datamuse.com/words?rel_rhy=" + word + "&md=p,d,f&max=10";
	
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
	var word, numSyllables, partOfSpeech, frequency, frequencyNum, wordHtml;
	word = result.word;
	numSyllables = result.numSyllables;
	partOfSpeech = result.tags[0];
	frequency = result.tags[1].split("f:")[1];
	frequencyNum = "used " + Math.ceil(frequency) + " times per million words of English";
	
	wordHtml = "<p>" + word + " - " + numSyllables + " syllable(s)" + " " + partOfSpeech + " " + frequencyNum + "</p>";
	$("#results").append(wordHtml);
	
}