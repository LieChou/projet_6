import { GreySquare } from "./greySquare.js";
import { Characters } from "./characters.js";
import { Gun } from "./gun.js";

export class Board {

    constructor(maxHeight, maxWidth, initialPositionX, initialPositionY, greySquareNumber, images) {
        this.maxHeight = maxHeight;
        this.maxWidth = maxWidth;
        this.squareSize = maxWidth / 10;
        this.squareNumberWidth = this.maxWidth / this.squareSize;
        this.squareNumberHeight = this.maxHeight / this.squareSize;
        this.squareNumber = this.squareNumberWidth * this.squareNumberHeight;
        this.column = 0;
        this.line = 0;
        this.initialPositionX = initialPositionX;
        this.initialPositionY = initialPositionY;
        this.greySquareNumber = greySquareNumber;
        this.squareList = [];
        this.characterNumber = 2;
        this.characters = [
            {
                "name": "Valentina",
                "gun": {},
                "image": "../css/images/png/astronaut.png"
            },
            {
                "name": "Alien",
                "gun": {},
                "image": '../css/images/png/alien.png'
            }];
        this.viewedCharacters = [];
        this.greySquares = [];
        this.gunNumber = 3;
        this.guns = [
            {
                "name": "Galaxy Laser2",
                "damage": 20,
                "image": "../css/images/png/galaxyGun2.png"
            },
            {
                "name": "Galaxy Laser3",
                "damage": 30,
                "image": "../css/images/png/galaxyGun3.png"
            },
            {
                "name": "Galaxy Laser4",
                "damage": 40,
                "image": "../css/images/png/galaxyGun4.png"
            }];
        this.viewedGuns = [];
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
        this.newGun = {};
        this.images = images;
        console.log(images);
        this.generateBoard();
        this.generateGreySquare();
        this.generateGuns();
        this.generateCharacters();
    }

    generateBoard() {
        //white background creation
        this.context.fillStyle = "white";
        this.context.fillRect(this.initialPositionX, this.initialPositionY, this.maxWidth, this.maxHeight);
        //individual square creation
        for (let i = 0; i < this.squareNumber; i++) {
            this.context.strokeStyle = "black";
            this.context.strokeRect(this.squareSize * this.column, this.squareSize * this.line, this.squareSize, this.squareSize);
            console.log(this.squareNumber);
            //id designation
            this.squareList[i] = {
                id: i,
                squareIdentification: "emptySquare",
                X: this.squareSize * this.column + 1,
                Y: this.squareSize * this.line + 1,
            };
            this.column++;
            if (this.column === this.squareNumberWidth) {
                this.column = 0;
                this.line++;
            }
        }
    }

    generateGreySquare() {
        //random creation of black squares
        for (let i = 0; i < this.greySquareNumber; i++) {
            let randomGreySquare = Math.floor(Math.random() * (this.squareNumber - 1));
            if (this.squareList[randomGreySquare].squareIdentification !== "emptySquare") {
                i--;
            } else {
                this.squareList[randomGreySquare].squareIdentification = "greySquareHere";
            }
        }
        //add them on the board
        for (let i = 0; i < this.squareNumber; i++) {
            if (this.squareList[i].squareIdentification === "greySquareHere") {
                console.log(this.squareList[i].X + "/" + this.squareList[i].Y);
                let greySquareId = this.squareList[i].id;
                const newGreySquare = new GreySquare(this.squareList[i].X, this.squareList[i].Y, "../css/images/png/blackSquare.png", greySquareId);
                this.greySquares.push(newGreySquare);
                this.context.drawImage(this.images.blackSquareImage, this.squareList[i].X, this.squareList[i].Y);
            }
        }
    }

    generateCharacters() {
        //random creation of characters
        for (let i = 0; i < this.characterNumber; i++) {
            let randomCharacterNumber = Math.floor(Math.random() * (this.squareNumber - 1));
            if (this.squareList[randomCharacterNumber].squareIdentification !== "emptySquare") {
                i--;
            } else if ((this.viewedCharacters.length > 0) && (
                ((this.squareList[randomCharacterNumber].X - this.squareSize === this.viewedCharacters[0].X) && (this.squareList[randomCharacterNumber].Y === this.viewedCharacters[0].Y)) ||
                ((this.squareList[randomCharacterNumber].X + this.squareSize === this.viewedCharacters[0].X) && (this.squareList[randomCharacterNumber].Y === this.viewedCharacters[0].Y)) ||
                ((this.squareList[randomCharacterNumber].Y + this.squareSize === this.viewedCharacters[0].Y) && (this.squareList[randomCharacterNumber].X === this.viewedCharacters[0].X)) ||
                ((this.squareList[randomCharacterNumber].Y - this.squareSize === this.viewedCharacters[0].Y) && (this.squareList[randomCharacterNumber].X === this.viewedCharacters[0].X))
            )) {
                i--; //retry if characters are side by side
            } else {
                this.squareList[randomCharacterNumber].squareIdentification = "characterHere";
                let idCharacter = this.squareList[i].id;//idsquare added to the character instance
                //character creation without repetition
                let randomCharacterOfTWo = Math.floor(Math.random() * this.characters.length);
                let splicedCharacter = this.characters.splice(randomCharacterOfTWo, 1)[0];
                let newGun = new Gun('Galaxy Laser1', 10, this.images.gun1, this.squareList[randomCharacterNumber].X, this.squareList[randomCharacterNumber].Y);
                const newCharacter = new Characters(splicedCharacter.name, newGun, this.images.getCharacterImage(splicedCharacter.name), this.squareList[randomCharacterNumber].X, this.squareList[randomCharacterNumber].Y, idCharacter, this);
                this.viewedCharacters.push(newCharacter);
                this.context.drawImage(newCharacter.image, this.squareList[randomCharacterNumber].X, this.squareList[randomCharacterNumber].Y);
            }
        }

        // delete of character identification to simplify repaint function
        for (let i = 0; i < this.squareNumber; i++) {
            if (this.squareList[i].squareIdentification === "characterHere") {
                this.squareList[i].squareIdentification = "emptySquare"
            }
        }
    }

    generateGuns() {
        //random gun creation
        for (let i = 0; i < this.gunNumber; i++) {
            let randomGunNumber = Math.floor(Math.random() * (this.squareNumber - 1));
            if (this.squareList[randomGunNumber].squareIdentification !== "emptySquare") {
                i--;
            } else {
                this.squareList[randomGunNumber].squareIdentification = "gunHere";
            }
        }
        //add gun on the board without repetition
        for (let i = 0; i < this.squareNumber; i++) {
            if (this.squareList[i].squareIdentification === "gunHere") {
                console.log(this.squareList[i].X + "/" + this.squareList[i].Y);
                let splicedGun = this.guns.splice(0, 1)[0];
                const newGun = new Gun(splicedGun.name, splicedGun.damage, this.images.getGunImage(splicedGun.name), this.squareList[i].X, this.squareList[i].Y);
                this.viewedGuns.push(newGun);
                console.log(newGun.image);
                this.context.drawImage(newGun.image, this.squareList[i].X, this.squareList[i].Y);

            }
        }
    }

    repaint() {
        for (let i = 0; i < this.squareNumber; i++) {
            if (this.squareList[i].squareIdentification === "greySquareHere") {
                this.context.drawImage(this.images.blackSquareImage, this.squareList[i].X, this.squareList[i].Y);
                this.context.strokeStyle = "black";
                this.context.strokeRect(this.squareList[i].X, this.squareList[i].Y, this.squareSize, this.squareSize);
            } else if (this.squareList[i].squareIdentification === "emptySquare") {
                this.context.fillStyle = "white";
                this.context.fillRect(this.squareList[i].X, this.squareList[i].Y, this.squareSize, this.squareSize);
                this.context.strokeStyle = "black";
                this.context.strokeRect(this.squareList[i].X, this.squareList[i].Y, this.squareSize, this.squareSize);
            } else if (this.squareList[i].squareIdentification === "gunHere") {
                for (let j = 0; j < this.viewedGuns.length; j++) {
                    if ((this.viewedGuns[j].X === this.squareList[i].X) && (this.viewedGuns[j].Y === this.squareList[i].Y)) {
                        this.context.fillStyle = "white";
                        this.context.fillRect(this.squareList[i].X, this.squareList[i].Y, this.squareSize, this.squareSize);
                        this.context.drawImage(this.viewedGuns[j].image, this.squareList[i].X, this.squareList[i].Y);
                        this.context.strokeStyle = "black";
                        this.context.strokeRect(this.squareList[i].X, this.squareList[i].Y, this.squareSize, this.squareSize);
                    }
                }
            }
        }
    }
} 