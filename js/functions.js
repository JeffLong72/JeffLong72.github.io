$( document ).ready(function() {
	
	// set size of board
	var max_y = 10; // verticle
	var max_x = 15; // horizontal
	var obstructions = 10; // obstacles
	var icon_movement_range = 4;
	var rand_pos = []; // set randon position array
	
	// icons array
	// ( add iconX to array to create more AI icons )
	var icons = ['icon0','icon1','icon2'];
	
	// create map 
	var content = "<table cellpadding=0 cellspacing=0>";
	for(y = 0; y < max_y; y++){
		content += '<tr>';
		for(x = 0; x < max_x; x++){
			content += '<td class="td"></td>';
		}
		content += '</tr>';
	}
	content += "</table>";
	$('.map').append(content);
	
	// create table 
	var content = "<table cellpadding=0 cellspacing=0>";
	for(y = 0; y < max_y; y++){
		content += '<tr>';
		for(x = 0; x < max_x; x++){
			content += '<td class="td" id="' + y + '-' + x +'"></td>';
		}
		content += '</tr>';
	}
	content += "</table>";
	$('.table').append(content);

	// set position of icon using random empty cell
	function create_random_position () {
		
		var rand_y = Math.floor(Math.random() * (max_y-2)) + 1;
		var rand_x = Math.floor(Math.random() * (max_x-2)) + 1;
		var pos = rand_y + "-" + rand_x;
		
		if(rand_pos.indexOf(pos) === -1) {			
			rand_pos.push(pos);
			return [rand_y, rand_x];
		}
	}	
	
	// set board icons 
	function set_board_icons () {
				
		// add player 1 to board
		$('#1-1').addClass('p1').addClass('blocked').addClass('player');
		window["p1"] = new Move ( max_y, max_x, 1, 1, 'p1');
		rand_pos.push("1-1");
		
		// add player 2 to board
		$('#8-8').addClass('p2').addClass('blocked').addClass('player');
		window["p2"] = new Move ( max_y, max_x, 8, 8, 'p2');
		rand_pos.push("8-8");
		
		// add icons to board
		for(var i = 0; i < icons.length; i++) { // add icons to board
			while (true) {
				var pos = create_random_position ();
				if (pos) {            
					break;
				} 
			}
			$('#' + pos[0] + "-" + pos[1]).addClass(icons[i]).addClass('blocked');
			window["icon"+i] = new Move ( max_y, max_x, pos[0], pos[1], icons[i]);
		}
		
		// add obstructions to board
		for(var i = 0; i < obstructions; i++){ // add obstructions to board
			while (true) {
				var pos = create_random_position ();
				if (pos) {            
					break;
				} 
			}
			if ( ! $('#' + pos[0] + "-" + pos[1]).hasClass( "blocked" ) ) {
				$('#' + pos[0] + "-" + pos[1]).addClass('tree').addClass('blocked');
			}
		}
		
	} set_board_icons ();

	// restart
	$('#restart').click(function(){
		location.reload();
	});	
	
	/* MOVE ICONS */
	
	// move icons (step 1)
	var icon_array_id = 0;	
	$('#move_icons').click(function(){
		icon_array_id = 0;
		move_icons();						
	});	
	
	// move icons (step 2)
	function move_icons() {
		if(window["icon"+icon_array_id]) {
			window["icon"+icon_array_id].icon_movement_range = icon_movement_range;
			var t = setInterval(move_icon, 1000);
			function move_icon() {
				if (window["icon"+icon_array_id].icon_movement_range < 1) {
					icon_array_id++;
					clearInterval(t);
					$('#players').val('');
					$('#target').val('');
					move_icons();
					// clear notice
					$('#notice').html('');
				}
				else {
					window["icon"+icon_array_id].init_icon_move();
				}
			}
		}
	}	
	
	/* MOVE PLAYERS */
	
	// show movement range on player select
	$('#players').on('change', function() {
		var player_id = $('#players').children("option:selected").val();
		if( player_id ) { 
			window[player_id].icon_movement_range = 4;
			window[player_id].show_movement_aoe ();
		}
	});	
	
	// set TD cell clicked
	$('td').click(function(){
		var td_cell = $(this).attr('id');
		if($(this).find('.octagon').length == 0) {
			$('#target').val('');
			return false;
		}
		else {
			$('#target').val(td_cell);
		}
	});

	// move players icons (step 1)
	$('#move_players').click(function(){
		var target = $('#target').val();
		if( target ) {
			move_p_icons();
		}
	});	
	
	// move player icons (step 2)
	function move_p_icons() {
		var player_id = $('#players').children("option:selected").val();
		if(window[player_id]) {
			window[player_id].icon_movement_range = 4;
			var t = setInterval(move_p_icon, 1000);
			function move_p_icon() {
				if (window[player_id].icon_movement_range < 1) {
					clearInterval(t);
					$('#players').val('');
					$('#target').val('');
					// clear notice
					$('#notice').html('');
				}
				else {
					window[player_id].init_icon_move();
				}
			}
		}
	}	

});
