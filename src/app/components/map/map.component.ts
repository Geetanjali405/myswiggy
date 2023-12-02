import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LatLngExpression } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 17.4482929, 78.39148509999995 ],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // maxZoom: 18,
      // minZoom: 3,
      // attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    // Define the line coordinates
    let line: LatLngExpression[] = [
      [17.4482929, 78.39148509999995],
      [17.440081, 78.348915] // Location 2
    ];

    // Create the line and add it to the map
    L.polyline(line, { color: 'blue' }).addTo(this.map);
    
    
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
