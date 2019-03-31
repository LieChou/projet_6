import { Board } from "./board.js";
import { GreySquare } from "./greySquare.js";
import { Characters } from "./characters.js";
import { Gun } from "./gun.js";

//Instanciation de la classe Board et de ses méthodes pour générer le plateau avec les cases grises, les personnages et les armes
const galaxyBoard = new Board(600, 600, 0, 0, 10);
galaxyBoard.generateBoard();
galaxyBoard.generateGreySquare();
galaxyBoard.generateGuns();
console.log(galaxyBoard.viewedGuns);


//création des character1 and ch2
galaxyBoard.generateCharacters();
let character1 = galaxyBoard.viewedCharacters[0]
console.log(character1);
let character2 = galaxyBoard.viewedCharacters[1];
console.log(character2);

//let player;
//on fait toujours commencer le character1 (placé de tout de manière en random dans le tableau viewedCharacters)
character1.start();
character1.drawPath();
//player = character1;

//on les fait par la suite jouer à tour de rôle
let originX = character1.X;
let originY = character1.Y;

document.onkeyup = function (e) {
    let key = e.keyCode || e.which;
    const character = this.getCharacter();
    console.log(character.getCountMove());
    switch (key) {
        case 37: //gauche
            if ((character.X >= galaxyBoard.squareSize) && (character.checkGreySquaresLeft()) && (character.X > originX - 180) && (character.Y === originY)) {
                character.moveLeft();
                character.countCharacterMove();
                if (character1.getCountMove() >= 3) {
                    //console.log(character1.countMove);
                    galaxyBoard.repaint();
                    //player === character2;
                    character2.drawPath();
                };
            };
            break;
        case 39: //droite
            if ((character1.X <= galaxyBoard.maxWidth - galaxyBoard.squareSize) && (character1.checkGreySquaresRight()) && (character1.X < originX + 180) && (character1.Y === originY)) {
                character1.moveRight();
                character1.countCharacterMove();
                if (character1.getCountMove() >= 3) {
                    //console.log(character1.countMove);
                    galaxyBoard.repaint();
                    //player === character2;
                    character2.drawPath();
                };
            };
            break;
        case 38: //haut
            if ((character1.Y >= galaxyBoard.squareSize) && (character1.checkGreySquaresUp()) && (character1.Y > originY - 180) && (character1.X === originX)) {
                character1.moveUp();
                character1.countCharacterMove();
                if (character1.getCountMove() >= 3) {
                    //console.log(character1.countMove);
                    galaxyBoard.repaint();
                    //player === character2;
                    character2.drawPath();
                };
            };
            break;
        case 40: //bas
            if ((character1.Y <= galaxyBoard.maxHeight - galaxyBoard.squareSize) && (character1.checkGreySquaresDown()) && (character1.Y < originY + 180) && (character1.X === originX)) {
                character1.moveDown();
                character1.countCharacterMove();
                if (character1.getCountMove() >= 3) {
                    //console.log(character1.countMove);
                    galaxyBoard.repaint();
                    //player === character2;
                    character2.drawPath();
                };
            };
            break;
        default:
            alert('Votre personnage est bloqué');
    }
}

//isNextCharacter()
