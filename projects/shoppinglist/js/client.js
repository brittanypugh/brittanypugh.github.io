
$(document).ready(function(){
	
	
// Executed when user clicks "Add Item" button
$('#add-item').on('click', function(event) {
	event.preventDefault();
	//get user input
	var listItem = $('#item-input').val();
	if($.trim(listItem).length){ //if field is not empty
		
		// Build list item html with checkbox and clear option
		var itemHtml = "<li class='collection-item'><i class='material-icons item-check'>check_box_outline_blank</i><span class='item-text'>" + listItem + "</span><i class='material-icons item-remove'>clear</i></li>";

		
		var itemCount = $('.shopping-list li').length;
		console.log("item count is: "+itemCount);
		if(itemCount == 0){ //no items in the list
			$('.shopping-list').append(itemHtml); // Add the item to the shopping list
			$('.shopping-list').append("<li class='collection-item active counter'>Total Items<span class='new badge' data-badge-caption='Grocery Item'>1</span></li>"); // Add counter
		}else{
			$('.shopping-list li:last-child').remove(); // Remove counter
			$('.shopping-list').append(itemHtml); // Add the item to the shopping list
			$('.shopping-list').append("<li class='collection-item active counter'>Total Items<span class='new badge' data-badge-caption='Grocery Items'>" + itemCount + "</span></li>"); // Add counter with updated item count
		}
		
		// Clear the text entered by the user
		$('#item-input').val('');
	}else{ //Add warning
		
	}
});
	
//Executed when user clicks the "X" on an added item
$('.shopping-list').on('click', '.item-remove', function(event){
	$(event.currentTarget).parent().remove(); // Remove selected item
	var itemCount = $('.shopping-list li').length - 1;
	$('.shopping-list li:last-child').remove(); // Remove counter
	if(itemCount == 1){
		$('.shopping-list').append("<li class='collection-item active counter'>Total Items<span class='new badge' data-badge-caption='Grocery Item'>1</span></li>"); // Add counter
	}else{
		$('.shopping-list').append("<li class='collection-item active counter'>Total Items<span class='new badge' data-badge-caption='Grocery Items'>" + itemCount + "</span></li>"); // Add counter with updated item count
	}
	
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