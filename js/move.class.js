class Move {
	constructor( max_y, max_x, y, x, icon) {
		this.max_y = max_y;
		this.max_x = max_x;		
		this.y = y;
		this.x = x;
		this.icon = icon;
		this.icon_movement_range = 0;		
		this.movement = false;
		this.target_y = 0;
		this.target_x = 0;
	}
	
	init_icon_move () {
		// show movement area aoe
		this.show_movement_aoe ();
		
		// show notice
		$('#notice').html( this.icon + " move" );

		// if icon is next to player icon stop moving
		if(this.next_to_player_icon()) {
			this.icon_movement_range = 0;
			this.show_movement_aoe ();
		}
		
		// if no movement available stop here
		if(this.icon_movement_range < 1) {
			return;
		}

		// if current location is target location stop here
		var target_id = $('#target').val();	
		var current_id = this.y + "-" + this.x;
		if( target_id == current_id ) {
			this.icon_movement_range = 0;
			this.show_movement_aoe ();
			return;
		}		
		
		// get target location ( based on player td cell clicked )
		var target_id = $('#target').val();						
		if( ! target_id ) {
			// get target location ( based on highest threat rating )
			var player_id = $('#threat').children("option:selected").val();
				player_id = ( player_id ) ? player_id : $('#players').children("option:selected").val();
			if( player_id ) {	
				var target_id = $('.'+player_id).attr('id');
			}
		}
		
		if( ! target_id ) {
			this.icon_movement_range = 0;
			this.show_movement_aoe ();
			return;
		}
		
		var target_location = target_id.split("-");
		this.target_y = target_location[0];
		this.target_x = target_location[1];	
		
		// move up
		if (this.target_y < this.y && (this.target_x == this.x)){
			var result = this.move_up ();
			if(!result) {
				result = this.move_up_left ();
				if(!result) {
					result = this.move_up_right ();
				}
			}
			return;
		}
		// move up right
		if (this.target_y < this.y && (this.target_x > this.x)){
			var result = this.move_up_right ();
			if(!result) {
				result = this.move_up ();
				if(!result) {
					result = this.move_right ();
				}
				if(!result) {
					result = this.move_down_right ();
				}
			}
			return;
		}		
		// move right
		if ((this.target_x > this.x) && (this.target_y == this.y)){
			var result = this.move_right ();
			if(!result) {
				result = this.move_up_right ();
				if(!result) {
					result = this.move_down_right ();
				}
				if(!result) {
					result = this.move_up ();
				}
			}
			return;			
		}
		// move down right
		if ((this.target_y > this.y) && (this.target_x > this.x)){
			var result = this.move_down_right ();
			if(!result) {
				result = this.move_down ();
				if(!result) {
					result = this.move_right ();
				}
				if(!result) {
					result = this.move_up_right ();
				}
			}
			return;				
		}		
		// move down
		if ((this.target_y > this.y) && (this.target_x == this.x)){
			var result = this.move_down ();
			if(!result) {
				result = this.move_down_left ();
				if(!result) {
					result = this.move_down_right ();
				}
			}
			return;				
		}
		// move down left
		if ((this.target_y > this.y) && (this.target_x < this.x)){
			var result = this.move_down_left ();
			if(!result) {
				result = this.move_down ();
				if(!result) {
					result = this.move_left ();
				}
				if(!result) {
					result = this.move_up_left ();
				}
			}
			return;				
		}		
		// move left
		if ((this.target_x < this.x) && (this.target_y == this.y)){
			var result = this.move_left ();
			if(!result) {
				result = this.move_up_left ();
				if(!result) {
					result = this.move_down_left ();
				}
				if(!result) {
					result = this.move_up ();
				}
			}
			return;			
		}
		// move up left
		if ((this.target_y < this.y) && (this.target_x < this.x)){
			var result = this.move_up_left ();
			if(!result) {
				result = this.move_left ();
				if(!result) {
					result = this.move_up ();
				}
				if(!result) {
					result = this.move_down_left ();
				}
			}
			return;				
		}
	}
	
	move_up () {
		if(this.is_movement_allowed('up')) {
			this.clear_current_position();
			this.y = this.y - 1;
			this.show_new_position();
			return true;			
		}
	}
	
	move_up_right () {
		if(this.is_movement_allowed('up_right')) {
			this.clear_current_position();
			this.x = this.x + 1;			
			this.y = this.y - 1;
			this.show_new_position();
			return true;			
		}
	}

	move_right () {
		if(this.is_movement_allowed('right')) {
			this.clear_current_position();
			this.x = this.x + 1;
			this.show_new_position();
			return true;
		}
	}

	move_down_right () {
		if(this.is_movement_allowed('down_right')) {
			this.clear_current_position();
			this.x = this.x + 1;			
			this.y = this.y + 1;
			this.show_new_position();
			return true;			
		}
	}
		
	move_down () {
		if(this.is_movement_allowed('down')) {
			this.clear_current_position();
			this.y = this.y + 1;
			this.show_new_position();
			return true;			
		}
	}

	move_down_left () {
		if(this.is_movement_allowed('down_left')) {
			this.clear_current_position();
			this.x = this.x - 1;			
			this.y = this.y + 1;
			this.show_new_position();
			return true;			
		}
	}

	move_left () {
		if(this.is_movement_allowed('left')) {
			this.clear_current_position();
			this.x = this.x - 1;
			this.show_new_position();
			return true;			
		}
	}	

	move_up_left () {
		if(this.is_movement_allowed('up_left')) {
			this.clear_current_position();
			this.x = this.x - 1;			
			this.y = this.y - 1;
			this.show_new_position();
			return true;			
		}
	}	

	is_movement_allowed (direction) {
		switch(direction){
			case "up":
				if( $('#' + (this.y - 1) + "-" + this.x).hasClass("blocked") || $('#' + (this.y - 1) + "-" + this.x).length == 0 ) {
					return false;
				}
				break;
			case "up_left":		
				if( $('#' + (this.y - 1) + "-" + (this.x - 1)).hasClass("blocked") || $('#' + (this.y - 1) + "-" + (this.x - 1)).length == 0 ) {
					return false;
				}
				break;	
			case "left":		
				if( $('#' + this.y + "-" + (this.x - 1)).hasClass("blocked") || $('#' + this.y + "-" + (this.x - 1)).length == 0 ) {
					return false;
				}				
				break;					
			case "down_left":			
				if( $('#' + (this.y + 1) + "-" + (this.x - 1)).hasClass("blocked") || $('#' + (this.y + 1) + "-" + (this.x - 1)).length == 0 ) {
					return false;
				}				
				break;
			case "down":			
				if( $('#' + (this.y + 1) + "-" + this.x).hasClass("blocked") || $('#' + (this.y + 1) + "-" + this.x).length == 0 ) {
					return false;
				}			
				break;
			case "down_right":			
				if( $('#' + (this.y + 1) + "-" + (this.x + 1)).hasClass("blocked") || $('#' + (this.y + 1) + "-" + (this.x + 1)).length == 0 ) {
					return false;
				}				
				break;				
			case "right":				
				if( $('#' + this.y + "-" + (this.x + 1)).hasClass("blocked") || $('#' + this.y + "-" + (this.x + 1)).length == 0 ) {
					return false;
				}				
				break;
			case "up_right":				
				if( $('#' + (this.y - 1) + "-" + (this.x + 1)).hasClass("blocked") || $('#' + (this.y - 1) + "-" + (this.x + 1)).length == 0 ) {
					return false;
				}			
				break;				
			default:
				return false;
		}
		return true;
	}

	clear_current_position () {
		// is this a player moving their icon?
		var is_player_icon_move = $('#players').children("option:selected").val();	
		// remove current position so we can show new position
		if(is_player_icon_move) {
			$('#' + this.y + "-" + this.x).removeClass(this.icon).removeClass('player').removeClass('blocked');
		}
		else {
			$('#' + this.y + "-" + this.x).removeClass(this.icon).removeClass('blocked');
		}	
	}	
	
	show_new_position () {
		// update icon movement range
		this.icon_movement_range--;
		// is this a player moving their icon?
		var is_player_icon_move = $('#players').children("option:selected").val();
		// show icon new position
		if(is_player_icon_move) {
			$('#' + this.y + "-" + this.x).addClass(this.icon).addClass('player').addClass('blocked');
		}	
		else
		{
			$('#' + this.y + "-" + this.x).addClass(this.icon).addClass('blocked');
		}
		// show movement area aoe
		this.show_movement_aoe ();		
	}
	
	show_movement_aoe () {
		// reset aoe movement area
		$('td').html('');
		// get icon location & range
		var icon_id = $('.'+this.icon).attr('id');
		var icon_location = icon_id.split("-");
		var y = ( icon_location[0] - this.icon_movement_range );
		var x = ( icon_location[1] - this.icon_movement_range );			
		var z = ( this.icon_movement_range * 2 ) + 1;
		// is this a player moving their icon?
		var is_player_icon_move = $('#players').children("option:selected").val();	
		// is player with highest threat set?
		var player_threat = $('#threat').children("option:selected").val();		
		// show aoe movement area
		for(var i = y; i < ( z + y ); i++) {
			if( $('#' + i + "-" + x).length && ! $('#' + i + "-" + x).hasClass('blocked')) {
				$('#' + i + "-" + x).html('<div class="octagon"><div class="inner"></div></div>');
			}
			if($('#' + i + "-" + x).hasClass('player') && ! is_player_icon_move && ! player_threat ) {
				$('#target').val($('#' + i + "-" + x).attr('id'));
			}	
			for(var j = x; j < ( z + x ); j++) {	
				if( $('#' + i + "-" + j).length && ! $('#' + i + "-" + j).hasClass('blocked')) {
					$('#' + i + "-" + j).html('<div class="octagon"><div class="inner"></div></div>');
				}
				if($('#' + i + "-" + j).hasClass('player') && ! is_player_icon_move && ! player_threat ) {
					$('#target').val($('#' + i + "-" + j).attr('id'));
				}
			}
		}
	}

	next_to_player_icon () {
		// get icon location & range
		var icon_id = $('.'+this.icon).attr('id');
		var icon_location = icon_id.split("-");
		var y = ( icon_location[0] - 1 );
		var x = ( icon_location[1] - 1 );			
		var z = ( 1 * 2 ) + 1;	
		// get player with highest threat
		var player_id = $('#threat').children("option:selected").val();
		// is this a player moving their icon?
		var is_player_icon_move = $('#players').children("option:selected").val();
		// show aoe movement area
		for(var i = y; i < ( z + y ); i++) {
			if( player_id && $('#' + i + "-" + x).hasClass(player_id) && ! is_player_icon_move ) {
				return true;
			}	
			if( ! player_id && $('#' + i + "-" + x).hasClass('player') && ! is_player_icon_move ) {
				return true;
			}
			for(var j = x; j < ( z + x ); j++) {
				if( player_id && $('#' + i + "-" + j).hasClass(player_id) && ! is_player_icon_move ) {
					return true;
				}				
				if( ! player_id && $('#' + i + "-" + j).hasClass('player') && ! is_player_icon_move ) {
					return true;
				}
			}
		}
		
		return false;
	}
}	