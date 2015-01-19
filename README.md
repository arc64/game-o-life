
# Code Kata: Game of Life

1) a cell can come to life
2) a cell can die
3) a dead cell with 2 neighbours comes to life (birth)
4) a living cell with 1 or fewer neighbours dies from loneliness
5) a living cell with 4 or more neighbours dies from overcrowding
6) make the world wrap * not done

Run: node game
Test: mocha

Considerations:

Currently all inputs are hardcoded, there is no user interface, states are logged on the console.

This could be done more functionally, or with a 1D array, or with event listeners, or with error checking, or in the browser.

