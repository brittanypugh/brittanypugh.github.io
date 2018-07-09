
$(document).ready(function(){
	
	
// Executed when user clicks "Add Item" button
$('#add-item').on('click', function(event) {
	event.preventDefault();
	//get user input
	var listItem = $('#item-input').val();
	
	if($.trim(listItem).length){ //if field is not empty
		
		//build list item html with checkbox and clear option
		var itemHtml = "<li class='collection-item'><i class='material-icons item-check'>check_box_outline_blank</i><span class='item-text'>" + listItem + "</span><i class='material-icons item-remove'>clear</i></li>";

		// Add the item to the shopping list
		$('.shopping-list').append(itemHtml);
		
		// Clear the text entered by the user
		$('#item-input').val('');
	}else{ //add warning
		
	}
});
	
//Executed when user clicks the "X" on an added item
$('.shopping-list').on('click', '.item-remove', function(event){
	$(event.currentTarget).parent().remove();
});
	
//Executed when user clicks the checkbox on an added item
//Toggle between unchecked and checked box
$('.shopping-list').on('click', '.item-check', function(event){ 
	var icon = event.currentTarget;
	if (icon.innerHTML === "check_box_outline_blank") {
        icon.innerHTML = "check_box";
    }else{
        icon.innerHTML = "check_box_outline_blank";
    }
});

	
});