import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer } from '@angular/core';

import {BOARD_SIZE, KEYS } from './data.service'

@Directive({
    selector: '[snake]'
})

export class SnakeDirective {
    direction: number;

    constructor(renderer: Renderer, private el: ElementRef) {
       renderer.setElementClass(el.nativeElement, 'snake', true);
    }

    @Input() currentDirection: number;
    @Output() onChangeDirection = new EventEmitter<number>();

    @HostListener('document:keyup', ['$event']) onKeyUp(e: KeyboardEvent) {
        switch (e.keyCode) {
            case KEYS.LEFT:
                if (this.currentDirection !== KEYS.RIGHT) {
                    this.direction = KEYS.LEFT;
                }
                break;
            case KEYS.RIGHT:
                if (this.currentDirection !== KEYS.LEFT) {
                    this.direction = KEYS.RIGHT;
                }
                break;
            case KEYS.UP:
                if (this.currentDirection !== KEYS.DOWN) {
                    this.direction = KEYS.UP;
                }
                break;
            case KEYS.DOWN:
                if (this.currentDirection !== KEYS.UP) {
                    this.direction = KEYS.DOWN;
                }
                break;
        }
        if (this.direction && this.direction !== this.currentDirection) {
            this.onChangeDirection.emit(this.direction);
        }
    }

}
