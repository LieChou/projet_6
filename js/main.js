import { CharacterMove } from "./characterMove.js";
import { Images } from "./images.js";


const images = new Images()

images.loadAll(function () {
    const characterMove = new CharacterMove(images);

    $(document).on('keyup',
        function (e) {
            let key = e.keyCode || e.which;
            characterMove.move(key);
        });
}
);


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