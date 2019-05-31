import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.page.html',
  styleUrls: ['./welcome-screen.page.scss'],
})
export class WelcomeScreenPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoPlay: true
  };

  constructor() { }

  ngOnInit() {
  }

}
