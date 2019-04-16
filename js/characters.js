export class Characters {

    constructor(name, gun, image, X, Y, board) {
        this.name = name;
        this.life = 100;
        this.gun = gun;
        this.image = image;
        this.X = X;
        this.Y = Y;
        this.countMove = 0;
        this.board = board;
        this.maxHeight = this.board.maxHeight;
        this.maxWidth = this.board.maxHeight;
        this.squareSize = this.board.squareSize;
        this.firstX;
        this.firstY;
        this.defend = false;
    }

    updateInfo() {
        if (this.name === "Valentina") {
            $('#squareCount1').html(this.countMove);
            $('#ch1Life').html(this.life);
            $('#ch1Gun').html(this.gun.name);
            $('#ch1GunDamage').html(this.gun.damage);
            $('#ch1GunImage').attr('src', this.gun.image);
        } else if (this.name === "Alien") {
            $('#squareCount2').html(this.countMove);
            $('#ch2Life').html(this.life);
            $('#ch2Gun').html(this.gun.name);
            $('#ch2GunDamage').html(this.gun.damage);
            $('#ch2GunImage').attr('src', this.gun.image);
        }
    }

    updateCompetitorInfo(competitor) {
        if (competitor.name === "Valentina") {
            $('#squareCount1').html(competitor.countMove);
            $('#ch1Life').html(competitor.life);
            $('#ch1Gun').html(competitor.gun.name);
            $('#ch1GunDamage').html(competitor.gun.damage);
            $('#ch1GunImage').attr('src', competitor.gun.image.src);
        } else if (competitor.name === "Alien") {
            $('#squareCount2').html(competitor.countMove);
            $('#ch2Life').html(competitor.life);
            $('#ch2Gun').html(competitor.gun.name);
            $('#ch2GunDamage').html(competitor.gun.damage);
            $('#ch2GunImage').attr('src', competitor.gun.image.src);
        }
    }

    emphasize() {
        if (this.name === "Valentina") {
            if (this.countMove <= 2) {
                $('#ch1').css('color', 'red');
                $('#ch2').css('color', 'white');
            } else if (this.countMove > 2) {
                $('#ch2').css('color', 'red');
                $('#ch1').css('color', 'white');
            }
        } else if (this.name === "Alien") {
            if (this.countMove <= 2) {
                $('#ch2').css('color', 'red');
                $('#ch1').css('color', 'white');

            } else if (this.countMove > 2) {
                $('#ch1').css('color', 'red');
                $('#ch2').css('color', 'white');
            }
        }
    }

    updatePlayer() {
        if (this.name === "Valentina") {
            $('#ch1').css('color', 'red');
            $('#ch2').css('color', 'white');
        } else if (this.name === "Alien") {
            $('#ch2').css('color', 'red');
            $('#ch1').css('color', 'white');
        }
    }

    attack(competitor) {
        this.defend = false;
        if (this.life > 0 && competitor.life > 0) {
            if (!competitor.defend) {
                competitor.life = competitor.life - this.gun.damage;
                this.updateCompetitorInfo(competitor);
                alert(this.name + ' a attaqué ' + competitor.name + ' et lui a retiré ' + this.gun.damage + ' points de vie!');
            } else {
                competitor.life = competitor.life - this.gun.damage / 2;
                this.updateCompetitorInfo(competitor);
                alert(this.name + ' a attaqué ' + competitor.name + ' et lui a retiré ' + this.gun.damage / 2 + ' points de vie!');
            }
        }

        if (competitor.life <= 0) {
            alert(' ***Game Over*** Bravo ' + this.name + ' vous avez gagné ! ' + competitor.name + ' est mort.e, la partie est terminée !');
            $('#ambiance').trigger('pause');
            $('#winnerSong').trigger('play');
        }
    }

    defendCharacter() {
        this.defend = true;
        alert(this.name + ' se défendra au prochain tour!');
    }

    startTurn() {
        this.firstX = this.X;
        this.firstY = this.Y;
        this.countMove = 0;
        this.characterRepaint();
    }

    countCharacterMove() {
        this.countMove++;
    }

    getCountMove() {
        return this.countMove;
    }

    loadCharacterImage() {
        let characterImage = new Image();
        characterImage.src = this.image;
        characterImage.addEventListener('load', () => {
            this.board.context.drawImage(characterImage, this.X, this.Y);
        }, false);
    }

    characterRepaint() {
        this.board.context.fillStyle = "white";
        this.board.context.fillRect(this.X, this.Y, this.board.squareSize, this.board.squareSize);
        this.board.context.strokeStyle = "black";
        this.board.context.strokeRect(this.X, this.Y, this.board.squareSize, this.board.squareSize);
        this.loadCharacterImage();
    }

    checkBlackSquaresRight() {
        return this.board.viewedBlackSquares.filter(square => square.X === this.X + this.board.squareSize && square.Y === this.Y).length === 0;
    }

    checkBlackSquaresLeft() {
        return this.board.viewedBlackSquares.filter(square => square.X === this.X - this.board.squareSize && square.Y === this.Y).length === 0;
    }

    checkBlackSquaresUp() {
        return this.board.viewedBlackSquares.filter(square => square.Y === this.Y - this.board.squareSize && square.X === this.X).length === 0;
    }

    checkBlackSquaresDown() {
        return this.board.viewedBlackSquares.filter(square => square.Y === this.Y + this.board.squareSize && square.X === this.X).length === 0;
    }

    moveLeft() {
        //clear current square and redraw it
        this.board.context.clearRect(this.X, this.Y, this.squareSize, this.squareSize);
        let coordX = this.X;
        this.board.context.fillStyle = "white";
        this.board.context.fillRect(coordX - 1, this.Y - 1, this.squareSize, this.squareSize);
        this.board.context.strokeStyle = "black";
        this.board.context.strokeRect(coordX - 1, this.Y - 1, this.squareSize, this.squareSize);
        //registering new coordinates to move character
        this.X = coordX - this.squareSize;
        //image creation on the new coordinates
        this.board.repaint();
        this.loadCharacterImage();
    }

    moveRight() {
        this.board.context.clearRect(this.X, this.Y, this.squareSize, this.squareSize);
        let coordX = this.X;
        this.board.context.fillStyle = "white";
        this.board.context.fillRect(coordX - 1, this.Y - 1, this.squareSize, this.squareSize);
        this.board.context.strokeStyle = "black";
        this.board.context.strokeRect(coordX - 1, this.Y - 1, this.squareSize, this.squareSize);
        this.X = coordX + this.squareSize;
        this.board.repaint();
        this.loadCharacterImage();
    }

    moveUp() {
        this.board.context.clearRect(this.X, this.Y, this.squareSize, this.squareSize);
        let coordY = this.Y;
        this.board.context.fillStyle = "white";
        this.board.context.fillRect(this.X - 1, coordY - 1, this.squareSize, this.squareSize);
        this.board.context.strokeStyle = "black";
        this.board.context.strokeRect(this.X - 1, coordY - 1, this.squareSize, this.squareSize);
        this.Y = coordY - this.squareSize;
        this.board.repaint();
        this.loadCharacterImage();
    }

    moveDown() {
        this.board.context.clearRect(this.X, this.Y, this.board.squareSize, this.board.squareSize);
        let coordY = this.Y;
        this.board.context.fillStyle = "white";
        this.board.context.fillRect(this.X - 1, coordY - 1, this.board.squareSize, this.board.squareSize);
        this.board.context.strokeStyle = "black";
        this.board.context.strokeRect(this.X - 1, coordY - 1, this.board.squareSize, this.board.squareSize);
        this.Y = coordY + this.squareSize;
        this.board.repaint();
        this.loadCharacterImage();
    }

    changeGun() {
        for (let i = 0; i < this.board.viewedGuns.length; i++) {
            if ((this.board.viewedGuns[i].X === this.X) && (this.board.viewedGuns[i].Y === this.Y)) {
                //gun coordinates
                this.gun.X = this.X;
                this.gun.Y = this.Y;
                //gun image creation
                let gunImage = new Image();
                gunImage.src = this.gun.image;
                gunImage.addEventListener('load', () => {
                    this.board.context.drawImage(gunImage, this.X, this.Y);
                }, false);
                //permutes both variables
                [this.gun, this.board.viewedGuns[i]] = [this.board.viewedGuns[i], this.gun];
            }
        }
    }

    characterMove() {
        this.countCharacterMove();
        this.updateInfo();
        this.changeGun()
    }

}