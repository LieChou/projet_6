import { BlackSquare } from "./blackSquare.js";
import { Characters } from "./characters.js";
import { Gun } from "./gun.js";

export class Board {

    constructor(maxHeight, maxWidth, initialPositionX, initialPositionY, blackSquareNumber) {
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
        this.blackSquareNumber = blackSquareNumber;
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
        this.blackSquares = [];
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
        this.generateBoard();
        this.generateBlackSquare();
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

    generateBlackSquare() {
        //random creation of black squares
        for (let i = 0; i < this.blackSquareNumber; i++) {
            let randomBlackSquare = Math.floor(Math.random() * (this.squareNumber - 1));
            if (this.squareList[randomBlackSquare].squareIdentification !== "emptySquare") {
                i--;
            } else {
                this.squareList[randomBlackSquare].squareIdentification = "blackSquareHere";
            }
        }
        //add them on the board
        for (let i = 0; i < this.squareNumber; i++) {
            if (this.squareList[i].squareIdentification === "blackSquareHere") {
                console.log(this.squareList[i].X + "/" + this.squareList[i].Y);
                let blackSquareId = this.squareList[i].id;
                const newBlackSquare = new BlackSquare(this.squareList[i].X, this.squareList[i].Y, "../css/images/png/blackSquare.png", blackSquareId);
                this.blackSquares.push(newBlackSquare);
                let blackSquareImage = new Image();
                blackSquareImage.src = newBlackSquare.image;
                blackSquareImage.addEventListener('load', () => {
                    this.context.drawImage(blackSquareImage, this.squareList[i].X, this.squareList[i].Y);
                }, false);
            }
        }
    }

    generateCharacters() {
        //random creation of characters
        for (let i = 0; i < this.characterNumber; i++) {
            let randomCharacterNumber = Math.floor(Math.random() * (this.squareNumber - 1));
            if (this.squareList[randomCharacterNumber].squareIdentification !== "emptySquare") {
                i--;
            } else if ((this.viewedCharacters.length > 0) && ( //retry if characters are side by side
                ((this.squareList[randomCharacterNumber].X - this.squareSize === this.viewedCharacters[0].X) && (this.squareList[randomCharacterNumber].Y === this.viewedCharacters[0].Y)) ||
                ((this.squareList[randomCharacterNumber].X + this.squareSize === this.viewedCharacters[0].X) && (this.squareList[randomCharacterNumber].Y === this.viewedCharacters[0].Y)) ||
                ((this.squareList[randomCharacterNumber].Y + this.squareSize === this.viewedCharacters[0].Y) && (this.squareList[randomCharacterNumber].X === this.viewedCharacters[0].X)) ||
                ((this.squareList[randomCharacterNumber].Y - this.squareSize === this.viewedCharacters[0].Y) && (this.squareList[randomCharacterNumber].X === this.viewedCharacters[0].X))
            )) {
                i--;
            } else {
                this.squareList[randomCharacterNumber].squareIdentification = "characterHere";
                let idCharacter = this.squareList[i].id;//idsquare added to the character instance
                //character creation without repetition
                let randomCharacterOfTWo = Math.floor(Math.random() * this.characters.length);
                let splicedCharacter = this.characters.splice(randomCharacterOfTWo, 1)[0];
                let newGun = new Gun('Galaxy Laser1', 10, '../css/images/png/galaxyGun1.png', this.squareList[randomCharacterNumber].X, this.squareList[randomCharacterNumber].Y);
                const newCharacter = new Characters(splicedCharacter.name, newGun, splicedCharacter.image, this.squareList[randomCharacterNumber].X, this.squareList[randomCharacterNumber].Y, idCharacter, this);
                console.log(newCharacter.X + "/" + newCharacter.Y);
                this.viewedCharacters.push(newCharacter);
                let characterImage = new Image();
                characterImage.src = newCharacter.image;
                characterImage.addEventListener('load', () => {
                    this.context.drawImage(characterImage, this.squareList[randomCharacterNumber].X, this.squareList[randomCharacterNumber].Y);
                }, false);
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
                const newGun = new Gun(splicedGun.name, splicedGun.damage, splicedGun.image, this.squareList[i].X, this.squareList[i].Y);
                this.viewedGuns.push(newGun);
                let gunImage = new Image();
                gunImage.src = newGun.image;
                gunImage.addEventListener('load', () => {
                    this.context.drawImage(gunImage, this.squareList[i].X, this.squareList[i].Y);
                }, false);
            }
        }
    }

    repaint() {
        for (let i = 0; i < this.squareNumber; i++) {
            if (this.squareList[i].squareIdentification === "blackSquareHere") {
                let blackSquareImage = new Image();
                blackSquareImage.src = "../css/images/png/blackSquare.png";
                blackSquareImage.addEventListener('load', () => {
                    this.context.drawImage(blackSquareImage, this.squareList[i].X, this.squareList[i].Y);
                }, false);
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
                        let gunImage = new Image();
                        gunImage.src = this.viewedGuns[j].image;
                        gunImage.addEventListener('load', () => {
                            this.context.drawImage(gunImage, this.squareList[i].X, this.squareList[i].Y);
                        }, false);
                        this.context.strokeStyle = "black";
                        this.context.strokeRect(this.squareList[i].X, this.squareList[i].Y, this.squareSize, this.squareSize);
                    }
                }
            }
        }
    }
} 