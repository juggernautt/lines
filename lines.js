var N = 9;
var COLORS = ['RED', 'YELLOW', 'PURPLE', 'GREEN', 'BLUE'];
var numOfNewBalls = 3;

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
            if(field[i][j] == null) {
                count++;
            }
            if(count == x) {
                field[i][j] = ball;
                return true;
            }
        }
    }
    return field;
}


/**
 * randomly replaces values of field array with the values from random colors array
 * @param field
 * @param balls
 * @returns {boolean}
 */
function fieldPutBallsInRandomPlaces(field, balls) {

    // check that field's empty space sufficient to put all the balls
    if(fieldGetEmptyPlacesCount(field) < balls.length) {
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
function getSelectedFieldCoords()
{
}


function fieldMoveBall(field, fromRow, fromColumn, toRow, toColumn)
{

}


$(document).ready(function () {
    var container = $('#the-field');
    var newColors = $('#new-colors');
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


    });


    container.on("click", "div", function(e) {
        // 1. add class selected to mark selected cell
        // 2. SELECTION: if the cell being clicked has ball in it:
        //                  - deselect previously selected ball (if any) <== $('#the-field div').removeClass('selected')
        //                  - select currently clicked ball
        // 3. MOVING: if the cell being clicked has no ball in it:
        //                  - if something was selected already

    });

});



