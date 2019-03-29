import { Board } from "./board.js";
import { GreySquare } from "./greySquare.js";
import { Character } from "./character.js";
import { Gun } from "./gun.js";

//Instanciation de la classe Board et de ses méthodes pour générer le plateau avec les cases grises, les personnages et les armes
const galaxyBoard = new Board (600, 600, 0, 0, 10);
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

let player;
//on fait toujours commencer le character1 (placé de tout de manière en random dans le tableau viewedCharacters)
character1.start();
character1.drawPath();
player = character1; 

//on les fait par la suite jouer à tour de rôle
let originX = character1.X;
let originY = character1.Y;
let originX2 = character2.X;
let originY2 = character2.Y;

document.onkeyup = function(e){
let key = e.keyCode || e.which;
switch(player){
    case character1 : 
            switch(key){         
                case 37 : //gauche
                    if ((character1.X >= galaxyBoard.squareSize)&&(character1.checkGreySquaresLeft() == true)&&(character1.X>originX-180)&&(character1.Y==originY)) {
                        character1.mooveLeft();
                        character1.countCharacterMoove();
                        if(character1.countMoove>=3){ //countMoove accessible uniquement dans le if
                            console.log(character1.countMoove);
                            galaxyBoard.repaint();
                            player == character2; 
                            character2.drawPath()};
                    };
                    break;
                case 39 : //droite
                    if ((character1.X <= galaxyBoard.maxWidth - galaxyBoard.squareSize)&&(character1.checkGreySquaresRight() == true)&&(character1.X<originX+180)&&(character1.Y==originY)){
                        character1.mooveRight();
                        character1.countCharacterMoove();
                    }; 
                    break;
                case 38 : //haut
                    if ((character1.Y >= galaxyBoard.squareSize)&&(character1.checkGreySquaresUp() == true)&&(character1.Y>originY-180)&&(character1.X==originX)){
                        character1.mooveUp();
                        character1.countCharacterMoove();
                    };
                    break;
                case 40 : //bas
                    if ((character1.Y <= galaxyBoard.maxHeight - galaxyBoard.squareSize)&&(character1.checkGreySquaresDown() == true)&&(character1.Y<originY+180)&&(character1.X=originX)){
                        character1.mooveDown();
                        character1.countCharacterMoove();
                    };
                    break;
                default : 
                    alert('Votre personnage est bloqué');
            };
            break;
    case character2 : 
            switch(key){
                case 37 : //gauche
                    if ((character2.X >= galaxyBoard.squareSize)&&(character2.checkGreySquaresLeft() == true)&&(character2.X>originX2-180)&&(character2.Y==originY2)) {
                        character2.mooveLeft();
                        character2.countCharacterMoove();
                    }
                    break;
                case 39 : //droite
                    if ((character2.X <= galaxyBoard.maxWidth - galaxyBoard.squareSize)&&(character2.checkGreySquaresRight() == true)&&(character2.X<originX2+180)&&(character2.Y==originY2)){
                        character2.mooveRight();
                        character2.countCharacterMoove();
                    } 
                    break;
                case 38 : //haut
                    if ((character2.Y >= galaxyBoard.squareSize)&&(character2.checkGreySquaresUp() == true)&&(character2.Y>originY2-180)&&(character2.X==originX2)){
                        character2.mooveUp();
                        character2.countCharacterMoove();
                    }
                    break;
                case 40 : //bas
                    if ((character2.Y <= galaxyBoard.maxHeight - galaxyBoard.squareSize)&&(character2.checkGreySquaresDown() == true)&&(character2.Y<originY2+180)&&(character2.X=originX2)){
                        character2.mooveDown();
                        character2.countCharacterMoove();
                    }
                    break;
                default : 
                    alert('Votre personnage est bloqué');
            }
            break;
        }        
}  

/*
changement des armes
if (this.X == Gun.X){
    changeGun(character.X, character.Y);
}*/
