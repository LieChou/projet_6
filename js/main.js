import { CharacterMove } from "./characterMove.js";

const characterMove = new CharacterMove();


$(function () {
    $('#hideGunInfo').on('click', function () {
        $('#gunInfo').hide(1000);
    });
    $('#showGunInfo').on('click', function () {
        $('#gunInfo').show(1000);
    });
    $('#hideNotice').on('click', function () {
        $('#noticeInfo').hide(1000);
    });
    $('#showNotice').on('click', function () {
        $('#noticeInfo').show(1000);
    });

});



$(document).on('keyup',
    function (e) {
        let key = e.keyCode || e.which;
        characterMove.move(key);
    }
)