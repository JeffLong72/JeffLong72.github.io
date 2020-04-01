# JeffLong72.github.io

Introduction: A real-time turn-based multi-player RPG board game thats currently being developed using Javascript/jQuery ( future development will include PHP, Websockets and MySQL database for data storage ).

To test the game in its current state ( which showcases the game engine movement feature ), 

1) Click the "Turn" drop down list and select "Player 1". A highlighted area will appear on the board to show the valid locations the Player 1 icon is permitted to move too. Click on any cell within the hightlighted spaces then click the button "Move Player" to automatically move the player to your desired location.
 - Optional: Repeat above for Player 2
 
2) Click the button "Move Icons", 
 - Each icon will automatically take a turn to move to the location of the closest player within their movement range.
 - Where no player is within the icons movement range, the icon will skip its turn ( no action will be taken ).
 - Optional: Click the "Threat" drop down list and choose a Player, all non-player icons will then automatically move towards that player icon on their turn ( instead of moving towards the closest player icon which is the default action ).

Note: Tree icons are "blocked" locations on the board that all icons will attempt to navigate around.

Click the "Reload" button to generate a new map ( or press F5 on your keyboard ).

Demo: https://jefflong72.github.io
