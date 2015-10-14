$(document).ready(function() {

    $('form').on('submit', function(e) {
        e.preventDefault();
        var name = $('#name').val(),
            scoreHtml = $('#counter').html().split(' '),
            scores = scoreHtml[1],
            data = {
                name: name,
                scores: scores,
                action: "addScore"
            };
        var success = function(result) {
            if(result) {
                $('form').remove();
                for(var i=0; i<result.length; i++) {
                    $('#ratings').append('<li>Name: ' +  result[i].name + ' , Score: ' + result[i].score + '</li>');
                }

            }
        };
        $.post('API.php', data, success, 'json');
    });
});




