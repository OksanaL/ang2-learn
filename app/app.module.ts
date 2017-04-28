import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { AppComponent }  from './app.component';
import { TicTacToeComponent } from './components/TicTacToe/tic-tac-toe.component';
import { GameComponent } from './components/Snake/game.component';
import { SnakeDirective } from './components/Snake/snake.directive';

@NgModule({
    imports:      [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot([
            {
                path: 'tictactoe',
                component: TicTacToeComponent
            },
            {
                path: 'snake',
                component: GameComponent
            }
        ])
    ],
    declarations: [ AppComponent, TicTacToeComponent, GameComponent, SnakeDirective ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
