
$(document).ready(function(){
	
	
// Executed when user clicks "Add Item" button
$('#add-item').on('click', function(event) {
	
	event.preventDefault();
	var listItem = $('#item-input').val(); //Get user input
	var itemCount = $('.shopping-list li').length; //Get number of items
	var itemHtml, counterHtml;
	
	if($.trim(listItem).length){ //If field is not empty
		
		itemHtml = "<li class='collection-item'><i class='material-icons item-check'>check_box_outline_blank</i><span class='item-text'>" + listItem + "</span><i class='material-icons item-remove'>clear</i></li>"; // Build list item html with checkbox and clear option
		
		if(itemCount == 0){ //No items in the list
			$('.shopping-list').append(itemHtml); // Add the item to the shopping list
			counterHtml = "<li class='collection-item active counter'>Total Items<span class='badge'>1</span></li>";
			$('.shopping-list').append(counterHtml); // Add counter
			
		}else{ //At least one item in list
			$('.shopping-list li:last-child').remove(); // Remove counter
			$('.shopping-list').append(itemHtml); // Add the item to the shopping list
			counterHtml = "<li class='collection-item active counter'>Total Items<span class='badge'>" + itemCount + "</span></li>";
			$('.shopping-list').append(counterHtml); // Add counter with updated item count
		}
		
		$('#item-input').val(''); // Clear the text entered by the user
	}else{ //Add warning
		
	}
});
	
//Executed when user clicks the "X" on an added item
$('.shopping-list').on('click', '.item-remove', function(event){
	$(event.currentTarget).parent().remove(); // Remove selected item
	$('.shopping-list li:last-child').remove(); // Remove counter
	var itemCount = $('.shopping-list li').length; //Get number of items
	
	if(itemCount == 1){
		$('.shopping-list').append("<li class='collection-item active counter'>Total Items<span class='badge'>1</span></li>"); // Add counter
	}else{
		$('.shopping-list').append("<li class='collection-item active counter'>Total Items<span class='badge'>" + itemCount + "</span></li>"); // Add counter with updated item count
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