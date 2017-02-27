import {Component} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'tic-tac-toe',
    templateUrl: './tic-tac-toe.component.html',
    styleUrls: [ './tic-tac-toe.component.css' ]
})

export class TicTacToeComponent {
    _n: number;
    x: string;
    o: string;
    error: string;
    gameOverMsg: string;
    step: number;

    field: line[];

    constructor() {
        this.x = 'X';
        this.o = 'O';
        this.error = '';
        this.gameOverMsg = '';
        this.step = 0;

        this.number = 3;
    }

    set number(newVal) {
        this._n = newVal;
        this.step = 0;
        this.gameOverMsg = '';

        //set field
        this.field = this.newField(newVal);
    }

    get number() {
        return this._n;
    }

    newField(newVal: number) {
        let field = [];
        for (let i: number = 0; i < newVal; i++) {
            let items = [];
            for (let j: number = 0; j < newVal; j++) {
                items.push({
                    weight: 0,
                    value: ''
                });
            }
            field.push({items: items});
        }

        return field;
    }

    setSquare(square: square, weight: number, value: string) {
        square.weight = weight;
        square.value = value;
    }

    toggleTurn(square: square, i: number, j: number) {
        this.error = '';
        if (square.weight == 0 && this.gameOverMsg == '') {
            this.step++;
            if (this.step % 2 == 0) {
                this.setSquare(square, -1, this.o);
            } else {
                this.setSquare(square, 1, this.x)
            }

            if (this.checkWin(i, j)) {
                this.gameOverMsg += 'Game Over!!';
            } else if (this.step == Math.pow(this.number, 2)) {
                this.gameOverMsg = 'Nobody wins! Game Over!!';
            }
        } else {
            if (this.gameOverMsg == '') {
                this.error = 'this squre has already been filled, try another one!';
            }
        }
    }

    checkWin(line: number, col: number, r: number = 5) {
        //horizontal
        let arr: number[] = [];
        let sum: number = 0;
        let start = (col-r > 0 ? col-r+1 : 0); //start point
        let end = (col+r < this.number ? col+r : this.number); //end point
        for (let j = start; j < end; j++) {
            if (arr.length == r) {
                arr.shift();
            }
            arr.push(this.field[line].items[j].weight);
            sum = arr.reduce(function(a, b) {
                return a + b;
            });
            if(Math.abs(sum) == r) {
                this.gameOverMsg = "End!";
                return true;
            }
        }

        //vertical
        arr = [];
        sum = 0;
        start = (line-r > 0 ? line-r+1 : 0); //start point
        end = (line+r < this.number ? line+r : this.number); //end point
        for (let i = start; i < end; i++) {
            if (arr.length == r) {
                arr.shift();
            }
            arr.push(this.field[i].items[col].weight);
            sum = arr.reduce(function(a, b) {
                return a + b;
            });
            if(Math.abs(sum) == r) {
                this.gameOverMsg = "End!";
                return true;
            }
        }

        //main diagonal
        let h = 0;
        arr = [];
        sum = 0;
        start = line;
        end = col;
        //up
        while (h < r &&
                start >= 0 &&
                end >= 0) {
            if (arr.length == r) {
                arr.shift();
            }
            arr.push(this.field[start].items[end].weight);
            sum = arr.reduce(function(a, b) {
                return a + b;
            });
            if(Math.abs(sum) == r) {
                this.gameOverMsg = "End!";
                return true;
            }
            start--;
            end--;
            h++;
        }

        h = 0;
        arr = [];
        sum = 0;
        start = line;
        end = col;
        //down
        while (h < r &&
                start < this.number &&
                end < this.number) {
            if (arr.length == r) {
                arr.shift();
            }
            arr.push(this.field[start].items[end].weight);
            sum = arr.reduce(function(a, b) {
                return a + b;
            });
            if(Math.abs(sum) == r) {
                this.gameOverMsg = "End!";
                return true;
            }
            start++;
            end++;
            h++;
        }

        //asside diagonal
        h = 0;
        arr = [];
        sum = 0;
        start = line;
        end = col;
        //up
        while (h < r &&
                start >= 0 &&
                end < this.number) {
            if (arr.length == r) {
                arr.shift();
            }
            arr.push(this.field[start].items[end].weight);
            sum = arr.reduce(function(a, b) {
                return a + b;
            });
            if(Math.abs(sum) == r) {
                this.gameOverMsg = "End!";
                return true;
            }
            start--;
            end++;
            h++;
        }

        h = 0;
        arr = [];
        sum = 0;
        start = line;
        end = col;
        //down
        while (h < r &&
                start < this.number &&
                end >= 0) {
            if (arr.length == r) {
                arr.shift();
            }
            arr.push(this.field[start].items[end].weight);
            sum = arr.reduce(function(a, b) {
                return a + b;
            });
            if(Math.abs(sum) == r) {
                this.gameOverMsg = "End!";
                return true;
            }
            start++;
            end--;
            h++;
        }
    }
}

interface line {
    items: square[];
}

interface square {
    weight: number;
    value: string;
}
