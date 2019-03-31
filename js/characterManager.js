import { Board } from "./board.js";

export class CharacterManager {

    constructor(name, gun, image, X, Y, idCharacter, board, character) {
        this.name = name;
        this.life = 100;
        this.gun = gun;
        this.image = image;
        this.X = X;
        this.Y = Y;
        this.idCharacter = idCharacter;
        this.play = false;
        this.countMove = 0;
        this.board = board;
        this.character = character;
        this.currentCharacter;
    }

    start() {
        this.play = true;
    }


    countCharacterMove() {
        this.countMove++;
    }

    getCountMove() {
        return this.countMove;
    }

    getCharacter() {
        if (character1.getCountMove() > 3) {
            return character2;
        } else if (character2.getCountMove() > 3) {
            return character1;
        } else {
            alert("par de personnages séléctionné")
        }
    }

    /*isNextCharacter() {
        this.board.repaint();
        this.character.drawPath();
    }*/

    drawPath() {
        this.firstX = this.X;
        this.firstY = this.Y;
        this.board.context.fillStyle = "grey";
        this.board.context.fillRect(this.firstX - 60, this.firstY, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.firstX - 120, this.firstY, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.firstX - 180, this.firstY, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.firstX + 60, this.firstY, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.firstX + 120, this.firstY, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.firstX + 180, this.firstY, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.firstX, this.firstY - 60, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.firstX, this.firstY - 120, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.firstX, this.firstY - 180, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.firstX, this.firstY + 60, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.firstX, this.firstY + 120, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.firstX, this.firstY + 180, this.board.squareSize, this.board.squareSize);
    }

}