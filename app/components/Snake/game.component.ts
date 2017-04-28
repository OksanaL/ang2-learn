import {Component} from '@angular/core';
import {SnakeDirective} from './snake.directive';
import * as _  from 'lodash';

import {BOARD_SIZE, KEYS } from './data.service';

@Component({
    selector: 'snake_game',
    templateUrl: './game.component.html',
    styles: [ require('./game.component.scss') ]
})

export class GameComponent {
    board: boolean[][];
    snake: Snake;
    isStarted: boolean;
    isGameOver: boolean;
    interval: number;

    constructor() {
        this.setupBoard();
        this.start();
    }

    setupBoard() {
        this.board = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            this.board[i] = [];
            for (let j = 0; j < BOARD_SIZE; j++) {
                this.board[i][j] = false;
            }
        }
        this.snake = {
            direction: KEYS.LEFT,
            parts: []
        }
    }

    start() {
        this.isStarted = true;
        this.isGameOver = false;
        this.interval = 100;

        this.snake.direction = KEYS.LEFT;
        this.snake.parts = [];

        for (let i: number = 0; i < 5; i++) {
            this.snake.parts.push({x: 10, y: 10 + i});
        }
        this.update();
    }

    // toggle() {
    //     if (this.isGameOver) {
    //         console.log('game over');
    //     } else {
    //         this.start();
    //     }
    // }

    update() {
        if (this.isStarted) {
            setTimeout(() => {
                let newHead: Part = this.getNewHead();

                if (this.selfCollision(newHead)) {
                    this.isGameOver = true;
                    alert('Game Over');
                    return;
                }

                // remove tail
                let oldTail: Part = this.snake.parts.pop();
                this.board[oldTail.y][oldTail.x] = false;

                // pop tail to head
                this.snake.parts.unshift(newHead);
                this.board[newHead.y][newHead.x] = true;

                this.update();
            }, this.interval);
        }
    }

    getNewHead() {
       let newHead: Part = _.cloneDeep(this.snake.parts[0]);

       // update Location
       if (this.snake.direction === KEYS.LEFT) {
           newHead.y -= 1;
       } else if (this.snake.direction === KEYS.RIGHT) {
           newHead.y += 1;
       } else if (this.snake.direction === KEYS.UP) {
           newHead.x -= 1;
       } else if (this.snake.direction === KEYS.DOWN) {
           newHead.x += 1;
       }

       newHead = this.boardCollision(newHead);

       return newHead;
   }

   boardCollision(part: Part) {
       if(part.x === -1) {
           part.x = BOARD_SIZE-1;
       } else if (part.y === -1) {
           part.y = BOARD_SIZE-1;
       } else if (part.x === BOARD_SIZE) {
           part.x = 0;
       } else if (part.y === BOARD_SIZE) {
           part.y = 0;
       }

       return part;
   }

   selfCollision(part: Part) {
       return this.board[part.y][part.x];
   }

   setSnake(row: number, col: number) {
       return ((this.snake.parts.length > 0 && this.snake.parts[0].x === row && this.snake.parts[0].y === col) || this.board[col][row]);
   }

   onChangeDirection(direction: number) {
       this.snake.direction = direction;
   }
}

interface Part {
    x: number;
    y: number;
}

interface Snake{
    parts: Part[];
    direction: number;
}

// export interface Fruit extends Part {
//     type: string;
// }
