import {Component} from '@angular/core';
import { CheckWinComponent } from './CheckWin/check-win.component';
import './interfaces/tic-tac-toe.interfaces';

import '../../../styles/style.scss';

@Component({
    // moduleId: module.id,
    selector: 'tic-tac-toe',
    templateUrl: './tic-tac-toe.component.html',
    // styleUrls: [ './tic-tac-toe.component.css' ]
    styles: [ require('./tic-tac-toe.component.scss') ]
})

export class TicTacToeComponent {
    _n: number;
    _r: number;
    x: string;
    o: string;
    error: string;
    gameOverMsg: string;
    step: number;

    field: line[];
    private checkWinComponent: CheckWinComponent;

    constructor() {
        this.x = 'X';
        this.o = 'O';
        this.error = '';
        this.gameOverMsg = '';
        this.step = 0;
        this.radius = 3;
        this.number = 3;
    }

    set radius(newVal) {
        this._r = newVal;
        this.step = 0;
        this.gameOverMsg = '';

        //set field
        this.field = this.newField(this.number);
        this.checkWinComponent = new CheckWinComponent(this.field, this.radius);
    }

    get radius() {
        return this._r
    }

    set number(newVal) {
        this._n = newVal;
        this.step = 0;
        this.gameOverMsg = '';

        //set field
        this.field = this.newField(newVal);
        this.checkWinComponent = new CheckWinComponent(this.field, this.radius);
    }

    get number() {
        return this._n;
    }

    reset() {
        this.number = this._n;
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
            let winner = this.checkWinComponent.checkWin(i, j)
            if (winner != '') {
                this.gameOverMsg = winner + 'Game Over!!';
            } else if (this.step == Math.pow(this.number, 2)) {
                this.gameOverMsg = 'Nobody wins! Game Over!!';
            }
        } else {
            if (this.gameOverMsg == '') {
                this.error = 'this squre has already been filled, try another one!';
            }
        }
    }
}
