
export class Gun {
    constructor(name, damage, image, X, Y) {
        this.name = name;
        this.damage = damage;
        this.image = image;
        this.X = X;
        this.Y = Y;
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

    }

};


