var TeamPicker = TeamPicker || {};

TeamPicker.LoadPlayers = function()
{	
	var players = $('.initial-players');
	var selectionArray = [];
	var playersPicked = $('.players-picked');

	var pickBtn = $('.pick-the-team');

	function init()
	{
		loadPlayersFromJSON();
		pickBtn.click(pickIt);
	}

	function loadPlayersFromJSON()
	{
		$.ajax(
		{
			url:"squad.json",
			dataType:"json",
			success:function(data) {
				var i;
				for(i = 0; i < data['players'].length; i++) {
					$(".initial-players__selection").append('<li data-name="' + data['players'][i].name + '" data-rating="' + data['players'][i].rating + '">' + data['players'][i].name + '</li>');
				}
			}
		});

		$(document).on('click', '.initial-players__selection li', function(){

			var PlayerName = $(this).data('name');
			var PlayerRating = $(this).data('rating');

			console.log('Rating is ' + PlayerRating + '. Name  is ' + PlayerName);

			selectionArray.push([PlayerName, PlayerRating]);

			$(this).clone().appendTo('.selected-players__selection');

			$(this).hide();

			if($('.selected-players__selection').find('li').length > 1) {

				$('.pick-the-team').show();

			}

			playersPicked.html('Players picked ' + $('.selected-players__selection').find('li').length)

		});

	}

	function pickIt()
	{
		$('.initial-players').hide();
		$('.picked-team').show();

		var selectionArraySorted = selectionArray.sort(function(a,b){ return a[1] - b[1];});
		var selectionArraySorted = selectionArraySorted.reverse();

		var even = function (num) {
			return num % 2 === 0;
		};

		var selectionArraySortedEven = selectionArraySorted.filter(even);

		console.log(selectionArraySortedEven);

		for (var i = 0; i < selectionArraySorted.length; i++) {

			if(i % 2 === 0) { // index is even

		        $(".picked-team__one").append('<li>' + selectionArraySorted[i][0] + '</li>');

		    }

		    else {

		    	$(".picked-team__two").append('<li>' + selectionArraySorted[i][0] + '</li>');

		    }
		}

		$('.pick-the-team').hide();

	}

	init();
};

	

// ON DOC READY
$(function()
{	
	new TeamPicker.LoadPlayers();

});

