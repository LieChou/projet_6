export class CharacterManager {

    constructor(characters, board) {
        this.characters = characters;
        this.currentCharacter = this.characters[0];
        this.board = board;
    }

    //function to get current character
    getCharacter() {
        return this.currentCharacter;
    }

    //function to move one after another
    switchCharacter() {
        this.currentCharacter = this.getCompetitor();
        this.currentCharacter.startTurn();
    }

    //function to get current competitor during fight
    getCompetitor() {
        if (this.currentCharacter === this.characters[0]) {
            return this.characters[1];
        } else {
            return this.characters[0];
        }
    }

    //function to fight one after another
    switchPlayer() {
        this.currentCharacter = this.getCompetitor();
        alert('C\'est au tour de ' + this.currentCharacter.name + ' de jouer!');
    }

    //function to initiate a fight
    initFight() {
        for (let i = 0; i < this.characters.length; i++) {
            if (((this.currentCharacter.X - this.board.squareSize === this.characters[i].X) && (this.currentCharacter.Y === this.characters[i].Y)) ||
                ((this.currentCharacter.X + this.board.squareSize === this.characters[i].X) && (this.currentCharacter.Y === this.characters[i].Y)) ||
                ((this.currentCharacter.Y - this.board.squareSize === this.characters[i].Y) && (this.currentCharacter.X === this.characters[i].X)) ||
                ((this.currentCharacter.Y + this.board.squareSize === this.characters[i].Y) && (this.currentCharacter.X === this.characters[i].X))) {
                alert("Le combat peut démarrer, le personnage " + this.currentCharacter.name + " va commencer");
                this.fight();
                return;
            }
        }
    }

    //function to fight
    fight() {
        let gameValue = prompt('Tapez 1 pour attaquer ou 0 pour vous défendre');
        let character = this.currentCharacter;
        let competitor = this.getCompetitor();
        if (gameValue === '1') {
            character.attack(competitor);
        } else if (gameValue === '0') {
            character.defend(competitor);
        }
        if ((character.life > 0) && (competitor.life > 0)) {
            this.switchPlayer();
            let c = this;
            $(function () {
                c.fight();
            }
            );
        } else {
            alert('Tapez sur la touche enter pour rejouer');
            window.location.reload();
        }
    }
}