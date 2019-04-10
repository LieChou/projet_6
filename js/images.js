export class Images {
    constructor() {
        this.blackSquareImage = new Image();
        this.blackSquareImage.src = "../css/images/png/blackSquare.png";
        this.characterVal = new Image();
        this.characterVal.src = "../css/images/png/astronaut.png";
        this.characterAl = new Image();
        this.characterAl.src = "../css/images/png/alien.png";
        this.gun1 = new Image();
        this.gun1.src = '../css/images/png/galaxyGun1.png'
        this.gun2 = new Image();
        this.gun2.src = '../css/images/png/galaxyGun2.png';
        this.gun3 = new Image();
        this.gun3.src = '../css/images/png/galaxyGun3.png';
        this.gun4 = new Image();
        this.gun4.src = '../css/images/png/galaxyGun4.png'
    }

    loadAll(callback) {
        this.blackSquareImage.addEventListener('load', function () {
            callback();
        })
    }

    getCharacterImage(characterName) {
        if (characterName === 'Valentina') {
            return this.characterVal;
        } else if (characterName === 'Alien') {
            return this.characterAl;
        }
    }

    getGunImage(gunName) {
        if (gunName === 'Galaxy Laser1') {
            return this.gun1;
        } else if (gunName === 'Galaxy Laser2') {
            return this.gun2;
        } else if (gunName === 'Galaxy Laser3') {
            return this.gun3;
        } else if (gunName === 'Galaxy Laser4') {
            return this.gun4;
        }
    }


}