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
 * randomly replaces values of field array with the values from random colors array
 * @param field
 * @param balls
 * @returns {boolean}
 */
function fieldPutBallsInRandomPlaces(field, balls) {

    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {
            if (field[i][j] == null) {
                field[i][j] = balls.shift();
                if (balls.length == 0) {
                    return true;
                }
            }
        }
    }

    return false;
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

});



