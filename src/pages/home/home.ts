import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

import md5 from 'crypto-md5';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    picture: string;
    email: string;

    constructor(public navCtrl: NavController) {
        this.email = "";
        this.picture = "https://www.gravatar.com/avatar/00000000000000000000000000000000?s=150";
    }

    getProfilePicture() {
        if(this.validateEmail()) {
            this.picture = "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase(), 'hex') + "?s=150";
        }
    }

    // Taken from http://stackoverflow.com/a/46181/498479
    validateEmail() {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.email);
    }

}
