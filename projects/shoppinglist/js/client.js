
$(document).ready(function(){
	
	
// Executed when "Add Item" button is clicked
$("#add-item").on('click', function(event) {
	event.preventDefault();
	//get user input
	var listItem = $("#item-input").val();
	
	//check for empty field
	if($.trim(listItem).length){ //valid item
		
		//build list item html with checkbox and clear option
		var itemHtml = "<li class='collection-item'><i class='material-icons'>check_box_outline_blank</i><span class='item-text'>" + listItem + "</span><i class='material-icons'>clear</i></li>";
		

		// Add the item to the shopping list
		$('.shopping-list').append(itemHtml);
		// Clear the text entered by the user
		$(".item-input").val('');
	}else{ //add warning
		
	}
});
	
});