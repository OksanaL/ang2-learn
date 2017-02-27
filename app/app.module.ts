import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { TicTacToeComponent } from './components/tic-tac-toe.component';

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ AppComponent, TicTacToeComponent],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
