export class Character {

    constructor(name, gun, image, X, Y, idCharacter, board) {
        this.name = name;
        this.life = 100;
        this.gun = gun;
        this.image = image;
        this.X = X;
        this.Y = Y;
        this.idCharacter = idCharacter;
        this.play = false;
        this.countMoove = 0;
        this.board = board;
        this.maxHeight = this.board.maxHeight;
        this.maxWidth = this.board.maxHeight;
        this.squareSize = this.board.squareSize;
        this.firstX;
        this.firstY;
    }

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

    countCharacterMoove() {
        this.countMoove++;
    }

    start() {
        this.play = true;
    }

    /*this.board.greySquares.forEach(greySquare => {
        for (X in greySquare){
            if (greySquare.X === this.X + this.board.squareSize){
                return false;
            } else {
            return true;
            }
        }
    });*/

    checkGreySquaresRight() {
        if ((this.board.greySquares[0].X === this.X + this.board.squareSize) && (this.board.greySquares[0].Y === this.Y)) {
            return false;
        } else if ((this.board.greySquares[1].X === this.X + this.board.squareSize) && (this.board.greySquares[1].Y === this.Y)) {
            return false;
        } else if ((this.board.greySquares[2].X === this.X + this.board.squareSize) && (this.board.greySquares[2].Y === this.Y)) {
            return false;
        } else if ((this.board.greySquares[3].X === this.X + this.board.squareSize) && (this.board.greySquares[3].Y === this.Y)) {
            return false;
        } else if ((this.board.greySquares[4].X === this.X + this.board.squareSize) && (this.board.greySquares[4].Y === this.Y)) {
            return false;
        } else if ((this.board.greySquares[5].X === this.X + this.board.squareSize) && (this.board.greySquares[5].Y === this.Y)) {
            return false;
        } else if ((this.board.greySquares[6].X === this.X + this.board.squareSize) && (this.board.greySquares[6].Y === this.Y)) {
            return false;
        } else if ((this.board.greySquares[7].X === this.X + this.board.squareSize) && (this.board.greySquares[7].Y === this.Y)) {
            return false;
        } else if ((this.board.greySquares[8].X === this.X + this.board.squareSize) && (this.board.greySquares[8].Y === this.Y)) {
            return false;
        } else if ((this.board.greySquares[9].X === this.X + this.board.squareSize) && (this.board.greySquares[9].Y === this.Y)) {
            return false
        } else {
            return true;
        }
    }

    checkGreySquaresLeft() {
        if ((this.board.greySquares[0].X === this.X - this.board.squareSize) && (this.board.greySquares[0].Y === this.Y)) {
            return false;
        } else if ((this.board.greySquares[1].X === this.X - this.board.squareSize) && (this.board.greySquares[1].Y === this.Y)) {
            return false;
        } else if ((this.board.greySquares[2].X === this.X - this.board.squareSize) && (this.board.greySquares[2].Y === this.Y)) {
            return false;
        } else if ((this.board.greySquares[3].X === this.X - this.board.squareSize) && (this.board.greySquares[3].Y === this.Y)) {
            return false;
        } else if ((this.board.greySquares[4].X === this.X - this.board.squareSize) && (this.board.greySquares[4].Y === this.Y)) {
            return false;
        } else if ((this.board.greySquares[5].X === this.X - this.board.squareSize) && (this.board.greySquares[5].Y === this.Y)) {
            return false;
        } else if ((this.board.greySquares[6].X === this.X - this.board.squareSize) && (this.board.greySquares[6].Y === this.Y)) {
            return false;
        } else if ((this.board.greySquares[7].X === this.X - this.board.squareSize) && (this.board.greySquares[7].Y === this.Y)) {
            return false;
        } else if ((this.board.greySquares[8].X === this.X - this.board.squareSize) && (this.board.greySquares[8].Y === this.Y)) {
            return false;
        } else if ((this.board.greySquares[9].X === this.X - this.board.squareSize) && (this.board.greySquares[9].Y === this.Y)) {
            return false
        } else {
            return true;
        }
    }

    checkGreySquaresUp() {
        if ((this.board.greySquares[0].X === this.X) && (this.board.greySquares[0].Y === this.Y - this.board.squareSize)) {
            return false;
        } else if ((this.board.greySquares[1].X === this.X) && (this.board.greySquares[1].Y === this.Y - this.board.squareSize)) {
            return false;
        } else if ((this.board.greySquares[2].X === this.X) && (this.board.greySquares[2].Y === this.Y - this.board.squareSize)) {
            return false;
        } else if ((this.board.greySquares[3].X === this.X) && (this.board.greySquares[3].Y === this.Y - this.board.squareSize)) {
            return false;
        } else if ((this.board.greySquares[4].X === this.X) && (this.board.greySquares[4].Y === this.Y - this.board.squareSize)) {
            return false;
        } else if ((this.board.greySquares[5].X === this.X) && (this.board.greySquares[5].Y === this.Y - this.board.squareSize)) {
            return false;
        } else if ((this.board.greySquares[6].X === this.X) && (this.board.greySquares[6].Y === this.Y - this.board.squareSize)) {
            return false;
        } else if ((this.board.greySquares[7].X === this.X) && (this.board.greySquares[7].Y === this.Y - this.board.squareSize)) {
            return false;
        } else if ((this.board.greySquares[8].X === this.X) && (this.board.greySquares[8].Y === this.Y - this.board.squareSize)) {
            return false;
        } else if ((this.board.greySquares[9].X === this.X) && (this.board.greySquares[9].Y === this.Y - this.board.squareSize)) {
            return false
        } else {
            return true;
        }
    }

    checkGreySquaresDown() {
        if ((this.board.greySquares[0].X === this.X) && (this.board.greySquares[0].Y === this.Y + this.board.squareSize)) {
            return false;
        } else if ((this.board.greySquares[1].X === this.X) && (this.board.greySquares[1].Y === this.Y + this.board.squareSize)) {
            return false;
        } else if ((this.board.greySquares[2].X === this.X) && (this.board.greySquares[2].Y === this.Y + this.board.squareSize)) {
            return false;
        } else if ((this.board.greySquares[3].X === this.X) && (this.board.greySquares[3].Y === this.Y + this.board.squareSize)) {
            return false;
        } else if ((this.board.greySquares[4].X === this.X) && (this.board.greySquares[4].Y === this.Y + this.board.squareSize)) {
            return false;
        } else if ((this.board.greySquares[5].X === this.X) && (this.board.greySquares[5].Y === this.Y + this.board.squareSize)) {
            return false;
        } else if ((this.board.greySquares[6].X === this.X) && (this.board.greySquares[6].Y === this.Y + this.board.squareSize)) {
            return false;
        } else if ((this.board.greySquares[7].X === this.X) && (this.board.greySquares[7].Y === this.Y + this.board.squareSize)) {
            return false;
        } else if ((this.board.greySquares[8].X === this.X) && (this.board.greySquares[8].Y === this.Y + this.board.squareSize)) {
            return false;
        } else if ((this.board.greySquares[9].X === this.X) && (this.board.greySquares[9].Y === this.Y + this.board.squareSize)) {
            return false
        } else {
            return true;
        }
    }

    mooveLeft() {
        //on commence par effacer la case actuelle 
        this.board.context.clearRect(this.X, this.Y, this.squareSize, this.squareSize);
        //on remet le fond blanc et les cases grises
        let coordX = this.X;
        this.board.context.fillStyle = "white";
        this.board.context.fillRect(coordX - 1, this.Y - 1, this.squareSize, this.squareSize);
        this.board.context.strokeStyle = "black";
        this.board.context.strokeRect(coordX - 1, this.Y - 1, this.squareSize, this.squareSize);
        //this.board.context.save();
        //on enregistre les nouvelles coordonnées pour le déplacement
        this.X = coordX - this.squareSize;
        //on créé l'image du personnage sur la nouvelle case
        let characterImage = new Image();
        characterImage.src = this.image;
        characterImage.addEventListener('load', () => {
            this.board.context.drawImage(characterImage, this.X, this.Y);
        }, false);
    }

    mooveRight() {
        this.board.context.clearRect(this.X, this.Y, this.squareSize, this.squareSize);
        let coordX = this.X;
        this.board.context.fillStyle = "white";
        this.board.context.fillRect(coordX - 1, this.Y - 1, this.squareSize, this.squareSize);
        this.board.context.strokeStyle = "black";
        this.board.context.strokeRect(coordX - 1, this.Y - 1, this.squareSize, this.squareSize);
        //this.board.context.save();
        this.X = coordX + this.squareSize;
        let characterImage = new Image();
        characterImage.src = this.image;
        characterImage.addEventListener('load', () => {
            this.board.context.drawImage(characterImage, this.X, this.Y);
        }, false);
    }

    mooveUp() {
        this.board.context.clearRect(this.X, this.Y, this.squareSize, this.squareSize);
        let coordY = this.Y;
        this.board.context.fillStyle = "white";
        this.board.context.fillRect(this.X - 1, coordY - 1, this.squareSize, this.squareSize);
        this.board.context.strokeStyle = "black";
        this.board.context.strokeRect(this.X - 1, coordY - 1, this.squareSize, this.squareSize);
        //this.board.context.save();
        this.Y = coordY - this.squareSize;
        let characterImage = new Image();
        characterImage.src = this.image;
        characterImage.addEventListener('load', () => {
            this.board.context.drawImage(characterImage, this.X, this.Y);
        }, false);
    }

    mooveDown() {
        this.board.context.clearRect(this.X, this.Y, this.board.squareSize, this.board.squareSize);
        let coordY = this.Y;
        this.board.context.fillStyle = "white";
        this.board.context.fillRect(this.X - 1, coordY - 1, this.board.squareSize, this.board.squareSize);
        this.board.context.strokeStyle = "black";
        this.board.context.strokeRect(this.X - 1, coordY - 1, this.board.squareSize, this.board.squareSize);
        //this.board.context.save();
        this.Y = coordY + this.squareSize;
        let characterImage = new Image();
        characterImage.src = this.image;
        characterImage.addEventListener('load', () => {
            this.board.context.drawImage(characterImage, this.X, this.Y);
        }, false);
    }

    //méthode pour changer d'arme

    //méthode pour se défendre 

    // méthode pour attaquer



}

