var N = 9;
var COLORS = ['RED', 'YELLOW', 'PURPLE', 'GREEN', 'BLUE'];
var numOfNewBalls = 3;
var numOfMatchingBalls = 5;


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
    if(field[row][column] == null) {
        return 0;
    }
    var count = 1;
    var theBall = field[row][column];
    while(column < field.length-1) {

        if(theBall === field[row][column + 1]) {
            count++;
        } else {
            return count;
        }
        column++;
    }
    return count;
}

function removeHorizontalN (field, row, column, num) {
    var numOfBallsToRemove = 0;
    if(num >= numOfMatchingBalls) {
       for(var i=0; i<num; i++) {
            field[row][column] = null;
            column++;
           numOfBallsToRemove++;
        }
    }
    return numOfBallsToRemove;
}


function fieldCountVertical (field, row, column) {
    if(field[row][column] == null) {
        return 0;
    }
    var count = 1;
    var theBall = field[row][column];
    while(row < field.length-1) {
        if(theBall === field[row + 1][column]) {
            count++;
        } else {
            return count;
        }
        row++;
    }
    return count;
}

function removeVerticalN (field, row, column, num) {
    var numOfBallsToRemove = 0;
    if(num >= numOfMatchingBalls) {
        for(var i=0; i<num; i++) {
            field[row][column] = null;
            row++;
            numOfBallsToRemove++;
        }
    }
    return numOfBallsToRemove;
}

function fieldCountDiagonal (field, row, column) {
    if(field[row][column] == null) {
        return 0;
    }
    var count = 1;
    var theBall = field[row][column];
    while(row < field.length-1 && column < field.length-1) {
        if(theBall === field[row + 1][column + 1]) {
            count++;
        } else {
            return count;
        }
        row++;
        column++;
    }
    return count;
}

function removeDiagonalN (field, row, column, num) {
    var numOfBallsToRemove = 0;
    if(num >= numOfMatchingBalls) {
        for(var i=0; i<num; i++) {
            field[row][column] = null;
            row++;
            column++;
            numOfBallsToRemove++;
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
            count+=removeHorizontalN(field, i, j, numHorizontal);

            var numVertical = fieldCountVertical(field, i, j);
            count+=removeVerticalN(field, i, j, numVertical);

            var numDiagonal = fieldCountDiagonal(field, i,j);
            count+=removeDiagonalN(field, i, j, numDiagonal);

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
    if($('.selected', container).length > 0) {
        var div = $('.selected', container);
        var row = div.attr('row');
        var column =  div.attr('column');
        return {
            row: row,
            column: column
        };
    } else {
      return null;
    }
}



function isMovePossible(field, fromRow, fromColumn, toRow, toColumn) {
    return true;
}

function fieldMoveBall(field, fromRow, fromColumn, toRow, toColumn) {
    field[toRow][toColumn] = field[fromRow][fromColumn];
    field[fromRow][fromColumn] = null;
}

$(document).ready(function () {
    var container = $('#the-field');
    var newColors = $('#new-colors');
    var scores = $('#counter');
    var totalScore = 0;
    container.css({'width': N * 54, 'height': N * 54});
    newColors.css('width', numOfNewBalls * 54);

    var field = fieldInit(N);
    fieldDraw(field, container);
    var randomBalls = getRandomBalls(numOfNewBalls);
    previewColors(randomBalls, newColors);


    $('#next-round').on('click', function () {
        if (!fieldPutBallsInRandomPlaces(field, randomBalls)) {
            alert("game over");
            return false;
        }
        fieldDraw(field, container);
        randomBalls = getRandomBalls(numOfNewBalls);
        previewColors(randomBalls, newColors);
        //fieldRemoveMatchingLines(field);
        //fieldDraw(field, container);



    });


    container.on("click", "div", function () {

        if (!fieldPutBallsInRandomPlaces(field, randomBalls)) {
            alert("game over");
            return false;
        }

        //SELECTION: if the cell being clicked has ball in it:
        if($(this).attr('ball') != undefined) {
            //deselect previously selected ball
            $('#the-field div').removeClass('selected');
            //select currently clicked ball
            $(this).addClass('selected');

        //MOVING: if the cell being clicked has no ball in it:
        } else {
            //if something was selected already
            if(getSelectedFieldCoords(container) != null) {
                var fromRow = getSelectedFieldCoords(container).row;
                var fromColumn = getSelectedFieldCoords(container).column;
                var toRow = $(this).attr('row');
                var toColumn = $(this).attr('column');
                fieldMoveBall(field, fromRow,fromColumn, toRow, toColumn);
                fieldDraw(field, container);

                totalScore+=fieldRemoveMatchingLines(field);
                fieldDraw(field, container);

                scores.html('Scores: ' + totalScore);

                randomBalls = getRandomBalls(numOfNewBalls);
                previewColors(randomBalls, newColors);




            }
        }


    });

});



