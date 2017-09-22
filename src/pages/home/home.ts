import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

import md5 from 'crypto-md5';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    animations: [
        trigger('itemState', [
            state('idle', style({
                opacity: '1',
            })),
            state('adding', style({
                opacity: '1',
            })),
            transition('idle <=> adding',
                animate(3000, keyframes([
                    style({ transform: 'scale(0, 0)' }),
                    style({ transform: 'scale(1, 1)' }),
                ]))),
        ])
    ]
})
export class HomePage {

    picture: string;
    email: string;
    itemState: string = 'idle';

    constructor(public navCtrl: NavController, private changeDetector: ChangeDetectorRef) {
        this.email = "";
        this.picture = "https://www.gravatar.com/avatar/00000000000000000000000000000000?s=150";
    }

    getProfilePicture() {
        if(this.validateEmail()) {
            this.itemState = 'adding';
            this.changeDetector.detectChanges();
            this.picture = "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase(), 'hex') + "?s=150";
            this.itemState = 'idle';
            this.changeDetector.detectChanges();
        }
    }

    // Taken from http://stackoverflow.com/a/46181/498479
    validateEmail() {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.email);
    }

}
