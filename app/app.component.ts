import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <a routerLink="/">Home</a>
        <a routerLink="/tictactoe">Tic-Tac-Toe</a>
        <a routerLink="/snake">Snake</a>
        <br />
        <hr />
        <br />
        <router-outlet></router-outlet>
    `
})

export class AppComponent {}
