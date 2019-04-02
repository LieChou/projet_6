export class Characters {

    constructor(name, gun, image, X, Y, idCharacter, board) {
        this.name = name;
        this.life = 100;
        this.gun = gun;
        this.image = image;
        this.X = X;
        this.Y = Y;
        this.idCharacter = idCharacter;
        this.countMove = 0;
        this.board = board;
        this.maxHeight = this.board.maxHeight;
        this.maxWidth = this.board.maxHeight;
        this.squareSize = this.board.squareSize;
        this.firstX;
        this.firstY;
    }

    startTurn() {
        this.firstX = this.X;
        this.firstY = this.Y;
        this.drawPath();
        this.countMove = 0;
        this.characterRepaint();
    }

    getX() {
        return this.X;
    }

    getY() {
        return this.Y;
    }

    getImage() {
        return this.image;
    }

    characterRepaint() {
        this.board.context.fillStyle = "white";
        this.board.context.fillRect(this.X, this.Y, this.board.squareSize, this.board.squareSize);
        let characterImage = new Image();
        characterImage.src = this.image;
        characterImage.addEventListener('load', () => {
            this.board.context.drawImage(characterImage, this.X, this.Y);
        }, false);
    }

    checkLeftSquare() {
        return (this.X > this.firstX - 180) && (this.Y === this.firstY);
    }

    checkRightSquare() {
        return (this.X < this.firstX + 180) && (this.Y === this.firstY);
    }

    checkUpSquare() {
        return (this.Y > this.firstY - 180) && (this.X === this.firstX);
    }

    checkDownSquare() {
        return (this.Y < this.firstY + 180) && (this.X === this.firstX);
    }

    checkGreySquaresRight() {
        return this.board.greySquares.filter(square => square.X === this.X + this.board.squareSize && square.Y === this.Y).length === 0;
    }

    checkGreySquaresLeft() {
        return this.board.greySquares.filter(square => square.X === this.X - this.board.squareSize && square.Y === this.Y).length === 0;
    }

    checkGreySquaresUp() {
        return this.board.greySquares.filter(square => square.Y === this.Y - this.board.squareSize && square.X === this.X).length === 0;
    }

    checkGreySquaresDown() {
        return this.board.greySquares.filter(square => square.Y === this.Y + this.board.squareSize && square.X === this.X).length === 0;
    }

    moveLeft() {
        //on commence par effacer la case actuelle 
        this.board.context.clearRect(this.X, this.Y, this.squareSize, this.squareSize);
        //on remet le fond blanc et les cases grises
        let coordX = this.X;
        this.board.context.fillStyle = "white";
        this.board.context.fillRect(coordX - 1, this.Y - 1, this.squareSize, this.squareSize);
        this.board.context.strokeStyle = "black";
        this.board.context.strokeRect(coordX - 1, this.Y - 1, this.squareSize, this.squareSize);
        //on enregistre les nouvelles coordonnées pour le déplacement
        this.X = coordX - this.squareSize;
        //on créé l'image du personnage sur la nouvelle case
        let characterImage = new Image();
        characterImage.src = this.image;
        characterImage.addEventListener('load', () => {
            this.board.context.drawImage(characterImage, this.X, this.Y);
        }, false);
    }

    moveRight() {
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

    moveUp() {
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

    moveDown() {
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

    drawPath() {
        this.X = this.X;
        this.Y = this.Y;
        this.board.context.fillStyle = "grey";
        this.board.context.fillRect(this.X - 60, this.Y, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.X - 120, this.Y, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.X - 180, this.Y, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.X + 60, this.Y, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.X + 120, this.Y, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.X + 180, this.Y, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.X, this.Y - 60, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.X, this.Y - 120, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.X, this.Y - 180, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.X, this.Y + 60, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.X, this.Y + 120, this.board.squareSize, this.board.squareSize);
        this.board.context.fillRect(this.X, this.Y + 180, this.board.squareSize, this.board.squareSize);
    }

    countCharacterMove() {
        this.countMove++;
    }

    getCountMove() {
        return this.countMove;
    }

    //méthode pour se défendre 

    // méthode pour attaquer

}

