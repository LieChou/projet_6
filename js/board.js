import { GreySquare } from "./greySquare.js";
import { Characters } from "./characters.js";
import { Gun } from "./gun.js";

export class Board {

    constructor(maxHeight, maxWidth, initialPositionX, initialPositionY, greySquareNumber, gun) {
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
        this.gun = gun;
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
    }

    generateBoard() {
        //création de la grande grille
        this.context.fillStyle = "white";
        this.context.fillRect(this.initialPositionX, this.initialPositionY, this.maxWidth, this.maxHeight);
        //création des cases individuelles
        for (let i = 0; i < this.squareNumber; i++) {
            this.context.strokeStyle = "black";
            this.context.strokeRect(this.squareSize * this.column, this.squareSize * this.line, this.squareSize, this.squareSize);
            console.log(this.squareNumber);
            //attribution des id
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
        //création random des cases grisées
        for (let i = 0; i < this.greySquareNumber; i++) {
            let randomGreySquare = Math.floor(Math.random() * (this.squareNumber - 1));
            if (this.squareList[randomGreySquare].squareIdentification !== "emptySquare") {
                i--;
            } else {
                this.squareList[randomGreySquare].squareIdentification = "greySquareHere";
            }
        }
        //affichage des cases grisées
        for (let i = 0; i < this.squareNumber; i++) {
            if (this.squareList[i].squareIdentification === "greySquareHere") {
                console.log(this.squareList[i].X + "/" + this.squareList[i].Y);
                let greySquareId = this.squareList[i].id;
                const newGreySquare = new GreySquare(this.squareList[i].X, this.squareList[i].Y, "../css/images/png/blackSquare.png", greySquareId);
                this.greySquares.push(newGreySquare);
                let greySquareImage = new Image();
                greySquareImage.src = newGreySquare.image;
                greySquareImage.addEventListener('load', () => {
                    this.context.drawImage(greySquareImage, this.squareList[i].X, this.squareList[i].Y);
                }, false);
            }
        }
    }

    generateCharacters() {
        //creation random des personnages
        for (let i = 0; i < this.characterNumber; i++) {
            let randomCharacterNumber = Math.floor(Math.random() * (this.squareNumber - 1));
            if (this.squareList[randomCharacterNumber].squareIdentification !== "emptySquare") {
                i--;
            } else if ((this.squareList[randomCharacterNumber].squareIdentification === "emptySquare") && ((this.squareList[randomCharacterNumber - 1].squareIdentification === "characterHere") || (this.squareList[randomCharacterNumber + 1].squareIdentification === "characterHere"))) {
                i--; //on relance si le perso créé est à côté d'un autre perso
            } else {
                this.squareList[randomCharacterNumber].squareIdentification = "characterHere";
            }
        }
        //création des objets personnages sans répétition de ce dernier : une case = un personnage
        for (let i = 0; i < this.squareNumber; i++) {
            if (this.squareList[i].squareIdentification === "characterHere") {
                let idCharacter = this.squareList[i].id;//récupérer l'id de la case sur laquelle on va générer le perso et passage au constructeur de la classe character sous forme idCharacter;
                console.log(this.squareList[i].X + "/" + this.squareList[i].Y);
                let randomCharacterOfTWo = Math.floor(Math.random() * this.characters.length);
                let splicedCharacter = this.characters.splice(randomCharacterOfTWo, 1)[0];
                let newGun = new Gun('Galaxy Laser1', 10, '../css/images/png/galaxyGun1.png', this.squareList[i].X, this.squareList[i].Y);
                const newCharacter = new Characters(splicedCharacter.name, newGun, splicedCharacter.image, this.squareList[i].X, this.squareList[i].Y, idCharacter, this);
                this.viewedCharacters.push(newCharacter);
                let characterImage = new Image();
                characterImage.src = newCharacter.image;
                characterImage.addEventListener('load', () => {
                    this.context.drawImage(characterImage, this.squareList[i].X, this.squareList[i].Y);
                }, false);
            }
        }
    }

    generateGuns() {
        //création random des armes
        for (let i = 0; i < this.gunNumber; i++) {
            let randomGunNumber = Math.floor(Math.random() * (this.squareNumber - 1));
            if (this.squareList[randomGunNumber].squareIdentification !== "emptySquare") {
                i--;
            } else {
                this.squareList[randomGunNumber].squareIdentification = "gunHere";
            }
        }
        //affichage des cases armées sans répétition de l'arme
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
            if (this.squareList[i].squareIdentification === "greySquareHere") {
                let greySquareImage = new Image();
                greySquareImage.src = "../css/images/png/blackSquare.png";
                greySquareImage.addEventListener('load', () => {
                    this.context.drawImage(greySquareImage, this.squareList[i].X, this.squareList[i].Y);
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