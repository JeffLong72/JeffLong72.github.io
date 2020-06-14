# Turn Based Board Game (Javascript/jQuery)

Introduction: A turn-based board game using Javascript/jQuery. This code is for educational purposes only as future development will include PHP Websockets for multiplayer and MySQL database for data storage.

To test the game basic movement feature, 

1) Click the "Turn" drop down list and select "Player 1". A highlighted area will appear on the board to show the valid locations the Player 1 icon is permitted to move too. Click on any cell within the highlighted spaces then click the button "Move Player" to automatically move the player to your desired location.
 - Optional: Repeat above for Player 2
 
2) Click the button "Move Icons", 
 - Each icon will automatically take its turn and move to the location of the closest player within their movement range.
 - Where no player icon is within the icons movement range, or the icon is not already next to a player icon, the icon will skip its turn ( no action will be taken ).
 - Optional: Click the "Threat" drop down list and select a Player, all non-player icons will then automatically move towards that player icon on their turn ( instead of moving towards the closest player icon which is the default action ).

Note: Tree icons are "blocked" locations on the board that all icons will attempt to navigate around.

Click the "Reload" button to generate a new map ( or press F5 on your keyboard ).

Demo: https://jefflong72.github.io

