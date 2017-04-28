import { Injectable } from '@angular/core';
import '../interfaces/tic-tac-toe.interfaces';

@Injectable()

export class CheckWinComponent {
    field: line[];
    radius: number;
    size: number;
    gameOverMsg: string

    constructor(field: line[], radius: number) {
        this.field = field;
        this.radius = radius;
        this.size = field.length;
        this.gameOverMsg = '';
    }

    checkWin(line: number, col: number) {
        this.checkWinInLine(col, line);
        this.checkWinInDiagonal(col, line);

        return this.gameOverMsg;
    }

    checkWinInLine(col: number, line: number) {
        //horizontal
        let arr: number[] = [];
        let start: number;
        let end: number;
        start = (col-this.radius > 0 ? col-this.radius+1 : 0); //start point
        end = (col+this.radius < this.size ? col+this.radius : this.size); //end point
        for (let j = start; j < end; j++) {
            arr.push(this.field[line].items[j].weight);
            if (this.checkSum(arr)) {
                return true;
            }
        }
        //vertical
        arr = [];
        start = (line-this.radius > 0 ? line-this.radius+1 : 0); //start point
        end = (line+this.radius < this.size ? line+this.radius : this.size); //end point
        for (let i = start; i < end; i++) {
            arr.push(this.field[i].items[col].weight);
            if (this.checkSum(arr)) {
                return true;
            }
        }

        return false;
    }

    checkWinInDiagonal(colIndex: number, lineIndex: number) {
        //main diagonal
        let h = 0;
        let arr = [];
        let line = lineIndex;
        let col = colIndex;
        //up
        while (h < this.radius &&
                line >= 0 &&
                col >= 0) {
            arr.push(this.field[line].items[col].weight);
            if (this.checkSum(arr)) {
                return true;
            }
            line--;
            col--;
            h++;
        }

        h = 0;
        arr = [];
        line = lineIndex;
        col = colIndex;
        //down
        while (h < this.radius &&
                line < this.size &&
                col < this.size) {
            arr.push(this.field[line].items[col].weight);
            if (this.checkSum(arr)) {
                return true;
            }
            line++;
            col++;
            h++;
        }

        //asside diagonal
        h = 0;
        arr = [];
        line = lineIndex;
        col = colIndex;
        //up
        while (h < this.radius &&
                line >= 0 &&
                col < this.size) {
            arr.push(this.field[line].items[col].weight);
            if (this.checkSum(arr)) {
                return true;
            }
            line--;
            col++;
            h++;
        }

        h = 0;
        arr = [];
        line = lineIndex;
        col = colIndex;
        //down
        while (h < this.radius &&
                line < this.size &&
                col >= 0) {
            arr.push(this.field[line].items[col].weight);
            if (this.checkSum(arr)) {
                return true;
            }
            line++;
            col--;
            h++;
        }

        return false;
    }

    checkSum(arr: number[]) {
        if (arr.length > this.radius) {
            arr.shift();
        }
        let sum: number = 0;
        sum = arr.reduce(function(a, b) {
            return a + b;
        });
        if (Math.abs(sum) == this.radius) {
            if (sum < 0) {
                this.gameOverMsg = 'O win! ';
            } else {
                this.gameOverMsg = 'X win! ';
            }
            return true;
        }
    }
}
