export class CharacterManager {

    constructor(characters) {
        this.characters = characters;
        this.currentCharacter = this.characters[0];
    }

    getCharacter() {
        return this.currentCharacter;
    }

    switchCharacter() {
        if (this.currentCharacter === this.characters[0]) {
            this.currentCharacter = this.characters[1];
        } else {
            this.currentCharacter = this.characters[0];
        }
        this.currentCharacter.startTurn();
    }


}