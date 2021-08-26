import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  array = [
    "https://cdn.cloudflare.steamstatic.com/steam/apps/201810/ss_5a2e74c1d7290052d36a340fd22b350690e20069.600x338.jpg?t=1574179370", 
    "https://cdn.cloudflare.steamstatic.com/steam/apps/201810/ss_7ca56142f1670fd1381d6fb66f22504fb376e671.600x338.jpg?t=1574179370", 
    "https://cdn.cloudflare.steamstatic.com/steam/apps/201810/ss_a9e2ea041b2fe6a5d5a1eac69d5c8435cf54f481.600x338.jpg?t=1574179370", 
    "https://cdn.cloudflare.steamstatic.com/steam/apps/201810/ss_5a2e74c1d7290052d36a340fd22b350690e20069.600x338.jpg?t=1574179370",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/201810/ss_0c5739cdf9028d1feade84f370b7f75d7e090f59.600x338.jpg?t=1574179370"];


  constructor() { }

  ngOnInit() {

  }

}
