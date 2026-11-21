# MemGame (in progress)
Memory game for csc2900. DAEMON LIFE themed. Midway through step 6 of 10.


## where its at
Done:
1. set up
2. static page
3. css: grid, card, flip
4. first click flips a card
5. cards built from a list in main.js
6. (half) track two cards, compare, keep a match or flip a miss back
7. shuffle + New Game button (onclick, like the dev.to tutorial)

Todo:
6. (rest) lock the board during the check, ignore the same card twice, matched cards stop being clickable
8. cards.json + fetch
9. move counter, win message, canvas logo
10. modules, comments, README

## known bugs right now
- click a 3rd card during the one second wait and the turn breaks
- click the same card twice and it counts as a match

## sources
- dev.to tutorial: https://dev.to/javascriptacademy/creating-a-memory-card-game-with-html-css-and-javascript-57g1
- zyBook, CSC 2900 Web Programming II
- Claude (AI assistant by Anthropic, https://claude.ai)
- Card and face art is from the DAEMON LIFE TCG (daemonlife.com) owned by Motz Creations LLC. VT323 font from Google Fonts.
