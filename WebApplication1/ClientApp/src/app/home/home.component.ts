import { Component, OnInit } from '@angular/core';

interface ItemData {
  id: string;
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})

export class HomeComponent {

  array = [0, 1, 2, 3];
  arrayImage = [
    "https://cdn.akamai.steamstatic.com/steam/apps/1517290/header.jpg?t=1628787459",
    "https://cdn.akamai.steamstatic.com/steam/apps/1643320/header.jpg?t=1628240324",
    "https://cdn.akamai.steamstatic.com/steam/apps/1124300/header.jpg?t=1629304781",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg?t=1625262842"
  ];
  arrayName = ["Battlefield™ 2042","S.T.A.L.K.E.R. 2","HUMANKIND","Forza Horizon 5"];
  arrayGenre = [
  "Action, Shooter, Multiplayer, War",
  "Open World, Adwenture, Story Rich, Western",
  "Open World, Adwenture, Story Rich, Western",
  "Open World, Adwenture, Racing"];
  listOfData: ItemData[] = [];
  ngOnInit(): void {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        id: `${i}`,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`
      });
    }
    this.listOfData = data;    
  }

}

