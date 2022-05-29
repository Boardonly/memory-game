"use strict"

class MemoryGame {
    constructor() {
        this.suits = ['0001', '0002', '0003', '0004', '0005', '0006',
            '0007', '0008', '0001', '0002', '0003', '0004', '0005', '0006',
            '0007', '0008'];
        this.cards = [];
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');

        this.width;
        this.height;
        this.flippedCards = [];
        this.canvas.addEventListener('click', (e) => this.onClick(e));

    }


    init() {
        canvas.width = 600;
        canvas.height = 800;
        this.width = canvas.width / 4;
        this.height = canvas.height / 4;

        this.createCards();
        animate();
    }


    createCards() {

        for (let i = 1; i <= 4; i += 1) {
            for (let j = 1; j <= 4; j += 1) {
                let card = new Card(this.suits[i], this.ctx, this.width * (j - 1), this.height * (i - 1));
                this.cards.push(card);
            }
        }

    }

    setToScreen() {
        this.cards.forEach((card) => card.flipped ? card.drawTop() : card.drawBack());

    }
    update() {
        if (this.flippedCards.length !== 0) {
            let first = this.flippedCards[0];
            if (this.flippedCards.length !== 1) {

                let second = this.flippedCards[1];

                if (first.name === second.name) {
                    this.flippedCards = [];
                }

                if (first.name !== second.name) {
                    setTimeout(function () {
                        first.flipped = false;
                        second.flipped = false;
                    }, 1500);
                }
                this.flippedCards = [];
            }
        }

    }

    onClick(event) {
        console.log(event);
        this.cards.forEach((elem) => {
            if (elem.isSeleted(event.offsetX, event.offsetY) && this.flippedCards.length < 2) {
                elem.flipped = true;
                this.flippedCards.push(elem);
            }
        });
    }

}

class Card {
    constructor(imgName, context, x, y) {
        
        this.context = context;
        this.name = imgName;
        this.x = x;
        this.y = y;
        this.flipped = false;
        
        const img = new Image();   // Create new img element
        console.log(imgName);
        img.src = `https://raw.githubusercontent.com/Boardonly/images/master/images/${imgName}.jpg`;
        const img2 = new Image();
        img2.src = 'https://raw.githubusercontent.com/Boardonly/images/master/images/back.jpg';
        
        img.onload = () => {
            this.image = img;
            this.width = img.width * 0.9;
            this.height = img.height * 0.9;
            
        }
        img2.onload = () => {
            this.topSuit = img2;
        }
        
    }
    
    drawTop() {
        if (this.image) {
            this.context.drawImage(this.image, this.x, this.y);
        }
        
    }
    drawBack() {
        if (this.topSuit) {
            this.context.drawImage(this.topSuit, this.x, this.y);
        }
        
    }
    isSeleted(x, y) {
        return this.x <= x && (this.x + this.width) >= x && this.y <= y && (this.y + this.height) >= y;
    }
    
}

function animate() {
    requestAnimationFrame(animate);
    q.setToScreen();
    q.update();
}

let q = new MemoryGame();
q.init();