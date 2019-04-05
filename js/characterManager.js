export class CharacterManager {

    constructor(characters, board) {
        this.characters = characters;
        this.currentCharacter = this.characters[0];
        this.board = board;
    }

    //méthode pour récupérer le personnage en cours
    getCharacter() {
        return this.currentCharacter;
    }

    //méthode pour se déplacer à tour de rôle
    switchCharacter() {
        this.currentCharacter = this.getCompetitor();
        this.currentCharacter.startTurn();
    }

    //méthode pour récupérer l'adversaire
    getCompetitor() {
        if (this.currentCharacter === this.characters[0]) {
            return this.characters[1];
        } else {
            return this.characters[0];
        }
    }

    //méthode pour se battre à tour de rôle
    switchPlayer() {
        this.currentCharacter = this.getCompetitor();
        alert('C\'est au tour de ' + this.currentCharacter.name + ' de jouer!');
    }

    //méthode pour initier un combat 
    initFight() {
        for (let i = 0; i < this.characters.length; i++) {
            if (((this.currentCharacter.X - this.board.squareSize === this.characters[i].X) && (this.currentCharacter.Y === this.characters[i].Y)) ||
                ((this.currentCharacter.X + this.board.squareSize === this.characters[i].X) && (this.currentCharacter.Y === this.characters[i].Y)) ||
                ((this.currentCharacter.Y - this.board.squareSize === this.characters[i].Y) && (this.currentCharacter.X === this.characters[i].X)) ||
                ((this.currentCharacter.Y + this.board.squareSize === this.characters[i].Y) && (this.currentCharacter.X === this.characters[i].X))) {
                alert("Le combat peut démarrer, le personnage " + this.currentCharacter.name + " va commencer");
                this.fight();
            }
        }
    }

    //méthode pour se battre 
    fight() {
        let gameValue = prompt('Tapez 1 pour attaquer ou 0 pour vous défendre');
        let character = this.currentCharacter;
        let competitor = this.getCompetitor();
        if (gameValue === '1') {
            character.attack(competitor);
        } else if (gameValue === '0') {
            character.defend(competitor);
        }
        this.switchPlayer();
        this.fight();
    }



}