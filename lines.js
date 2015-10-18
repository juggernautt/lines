var N = 5;
var COLORS = ['RED', 'YELLOW', 'PURPLE', 'GREEN', 'BLUE'];
var numOfNewBalls = 3;
var numOfMatchingBalls = 3;


/**
 * creates multidimensional array (n*n field) filled up with nulls
 * @param n
 * @returns {Array}
 */
function fieldInit(n) {
    var result = [];

    for (var i = 0; i < n; i++) {
        result[i] = [];
        for (var j = 0; j < n; j++) {
            result[i][j] = null;
        }
    }
    return result;
}

/**
 * creates the field with the divs. for each div there might be three custom properties:
 * - ball (optional) - string meaning which ball is in the field
 * - raw (required) - integer which raw the field is
 * - column (required) - integer which column the field is
 * @param field
 * @param container
 * @returns {boolean}
 */
function fieldDraw(field, container) {
    container.empty();
    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {

            var div = $('<div></div>');
            div.attr('row', i);
            div.attr('column', j);
            if (field[i][j] !== null) {
                div.attr('ball', field[i][j]);

            }
            container.append(div);
        }
    }
    return true;
}

/**
 * return the array of three random colors
 * @param n
 * @returns {Array}
 */
function getRandomBalls(n) {
    var newColors = [];
    while (n > 0) {
        var idx = _.random(0, COLORS.length - 1);
        newColors.push(COLORS[idx]);
        n--;
    }
    return newColors;
}

/**
 * appends divs with ball property to preview colors container
 * @param colors
 * @param container
 * @returns {boolean}
 */
function previewColors(colors, container) {
    container.empty();
    for (var i = 0; i < colors.length; i++) {
        var div = $('<div></div>');
        div.attr('ball', colors[i]);
        container.append(div);
    }
    return true;
}

/**
 * counts how many divs left without any ball property
 * @param field
 * @returns {number}
 */
function fieldGetEmptyPlacesCount(field) {
    var count = 0;
    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {
            if (field[i][j] == null) {
                count++;
            }
        }
    }
    return count;
}


/**
 * traverse the field and count empty cells. Once you arrive to Xth empty cell - put the ball
 * @param field
 * @param x
 * @param ball
 * @returns {*}
 */
function fieldPutBallInEmptyCellNumberX(field, x, ball) {
    var count = 0;
    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {
            if (field[i][j] == null) {
                count++;
            }
            if (count == x) {
                field[i][j] = ball;
                return true;
            }
        }
    }
}


function fieldCountHorizontal(field, row, column) {
    if (field[row][column] == null) {
        return 0;
    }
    var count = 1;
    var theBall = field[row][column];
    while (column < field.length - 1) {

        if (theBall === field[row][column + 1]) {
            count++;
        } else {
            return count;
        }
        column++;
    }
    return count;
}

function removeHorizontalN(field, row, column, num) {
    var numOfBallsToRemove = 0;
    if (num >= numOfMatchingBalls) {
        for (var i = 0; i < num; i++) {
            field[row][column] = null;
            column++;
            numOfBallsToRemove++;
        }
    }
    return numOfBallsToRemove;
}


function fieldCountVertical(field, row, column) {
    if (field[row][column] == null) {
        return 0;
    }
    var count = 1;
    var theBall = field[row][column];
    while (row < field.length - 1) {
        if (theBall === field[row + 1][column]) {
            count++;
        } else {
            return count;
        }
        row++;
    }
    return count;
}

function removeVerticalN(field, row, column, num) {
    var numOfBallsToRemove = 0;
    if (num >= numOfMatchingBalls) {
        for (var i = 0; i < num; i++) {
            field[row][column] = null;
            row++;
            numOfBallsToRemove++;
        }
    }
    return numOfBallsToRemove;
}

function fieldCountDiagonalLeftRight(field, row, column) {
    if (field[row][column] == null) {
        return 0;
    }
    var count = 1;
    var theBall = field[row][column];

    while (row < field.length - 1 && column < field.length - 1) {
        if (theBall === field[row + 1][column + 1] || theBall === field[row + 1][column - 1]) {
            count++;
        } else {
            return count;
        }
        row++;
        column++;

    }
    return count;
}


function fieldCountDiagonalRightLeft(field, row, column) {
    if (field[row][column] == null) {
        return 0;
    }
    var count = 1;
    var theBall = field[row][column];
    while (row < field.length - 1 && column > 0) {
        if(theBall === field[row + 1][column - 1]) {
            count++;
        } else {
            return count;
        }
        row++;
        column--;
    }
    return count;
}


function removeDiagonalN(field, row, column, num, isLeftRightDirection) {
    var numOfBallsToRemove = 0;
    if (num >= numOfMatchingBalls) {
        for (var i = 0; i < num; i++) {
            field[row][column] = null;
            if (isLeftRightDirection) {
                row++;
                column++;
                numOfBallsToRemove++;
            } else {
                row++;
                column--;
                numOfBallsToRemove++;
            }

        }
    }
    return numOfBallsToRemove;
}


/**
 * Remove all balls that forms five-same-colors horizontal, vertical or diagonal
 * Function updates field parameter (put `nulls` in place of removed balls)
 *
 * @param field
 * @return integer amount of removed balls
 */
function fieldRemoveMatchingLines(field) {
    var count = 0;
    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {

            var numHorizontal = fieldCountHorizontal(field, i, j);
            count += removeHorizontalN(field, i, j, numHorizontal);

            var numVertical = fieldCountVertical(field, i, j);
            count += removeVerticalN(field, i, j, numVertical);

            var numDiagonalLeftRight = fieldCountDiagonalLeftRight(field, i, j);
            count += removeDiagonalN(field, i, j, numDiagonalLeftRight, true);

            var numDiagonalRightLeft = fieldCountDiagonalRightLeft(field, i, j);
            count += removeDiagonalN(field, i, j, numDiagonalRightLeft, false);

        }
    }
    return count;
}


/**
 * randomly replaces values of field array with the values from random colors array
 * @param field
 * @param balls
 * @returns {boolean}
 */
function fieldPutBallsInRandomPlaces(field, balls) {

    // check that field's empty space sufficient to put all the balls
    if (fieldGetEmptyPlacesCount(field) < balls.length) {
        return false;
    }

    while (balls.length > 0) {
        var theBall = balls.shift();
        var randomNum = _.random(1, fieldGetEmptyPlacesCount(field));
        fieldPutBallInEmptyCellNumberX(field, randomNum, theBall);
    }
    return true;
}


/**
 * return "null" if nothing is selected
 * return object {row: 5, column: 3} if that cell is selected
 */
function getSelectedFieldCoords(container) {
    if ($('.selected', container).length > 0) {
        var div = $('.selected', container);
        var row = div.attr('row');
        var column = div.attr('column');
        return {
            row: row,
            column: column
        };
    } else {
        return null;
    }
}

function isMoveProper(field, row, column) {
    //check if the cell is inside the field and empty
    if((row >= 0 && row < field.length && column >= 0 && column < field.length) && field[row][column] == null) {
        return true;
    }

}

function isMovePossible(field, fromRow, fromColumn, toRow, toColumn) {

    console.log('calculating path from ' + fromRow, fromColumn + ' to ' + toRow, toColumn);


    var res1 = false, res2 = false, res3 = false, res4 = false;
    if(field[fromRow][fromColumn] == null) {
        field[fromRow][fromColumn] = 'VISITED';
    }

    //console.log(field);

    if (fromRow == toRow && fromColumn == toColumn) {
        return true;
    }

    if (isMoveProper(field, fromRow - 1, fromColumn)) { //move up
        res1 = isMovePossible(field, fromRow - 1, fromColumn, toRow, toColumn);
    }

    if (isMoveProper(field, fromRow, fromColumn + 1)) { //move right
        res2 = isMovePossible(field, fromRow, fromColumn + 1, toRow, toColumn);
    }

    if (isMoveProper(field, fromRow + 1, fromColumn)) { //move down
        res3 = isMovePossible(field, fromRow + 1, fromColumn, toRow, toColumn);
    }

    if (isMoveProper(field, fromRow, fromColumn - 1)) { //move left
        res4 = isMovePossible(field, fromRow, fromColumn - 1, toRow, toColumn);
    }

    var result = res1 || res2 || res3 || res4;
    return result;

}

function cleanTheField(field) {
    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {
            if (field[i][j] == 'VISITED') {
                field[i][j] = null;
            }
        }
    }
    console.log(field);
}


var ff =
    [
        [null, null, null, null],
        [null, "XX", "XX", "XX"],
        [null, null, null, null],
        [null, "XX", null, null]];


//console.log(isMovePossible(ff, 3, 0, 2, 0));
//cleanTheField(ff);



function fieldMoveBall(field, fromRow, fromColumn, toRow, toColumn) {
    field[toRow][toColumn] = field[fromRow][fromColumn];
    field[fromRow][fromColumn] = null;
}

$(document).ready(function () {
    var container = $('#the-field');
    var newColors = $('#new-colors');
    var scores = $('#counter');
    var gameOver = $('#game-over');
    var totalScore = 0;
    container.css({'width': N * 54, 'height': N * 54});
    newColors.css('width', numOfNewBalls * 54);

    var field = fieldInit(N);
    fieldDraw(field, container);
    var randomBalls = getRandomBalls(numOfNewBalls);
    previewColors(randomBalls, newColors);


    $('#next-round').on('click', function () {
        fieldPutBallsInRandomPlaces(field, randomBalls);
        fieldDraw(field, container);
    });


    container.on("click", "div", function () {

        if (!fieldPutBallsInRandomPlaces(field, randomBalls)) {
            gameOver.show();
            return false;
        }

        //SELECTION: if the cell being clicked has ball in it:
        if ($(this).attr('ball') != undefined) {
            //deselect previously selected ball
            $('#the-field div').removeClass('selected');
            //select currently clicked ball
            $(this).addClass('selected');

            //MOVING: if the cell being clicked has no ball in it:
        } else {
            //if something was selected already
            if (getSelectedFieldCoords(container) != null) {
                var fromRow = Number(getSelectedFieldCoords(container).row);

                var fromColumn = Number(getSelectedFieldCoords(container).column);

                var toRow = Number($(this).attr('row'));
                var toColumn = Number($(this).attr('column'));
                fieldMoveBall(field, fromRow, fromColumn, toRow, toColumn);
                fieldDraw(field, container);
                totalScore += fieldRemoveMatchingLines(field);
                fieldDraw(field, container);
                scores.html('Scores: ' + totalScore);
                console.log(field);
                randomBalls = getRandomBalls(numOfNewBalls);
                previewColors(randomBalls, newColors);


                /*if(isMovePossible(field, fromRow, fromColumn, toRow, toColumn)) {
                    cleanTheField(field);

                }*/
                //cleanTheField(field);
            }

        }


    });

});



