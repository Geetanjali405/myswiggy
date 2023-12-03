import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LatLngExpression } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit,AfterViewInit {
  private map;
  private selectedLocation: any;

  private locations = [
    { name: 'Hyderabad', lat: 17.4482929, lon: 78.39148509999995 },
    { name: 'Bangalore', lat: 12.971599, lon: 77.594563 },
    { name: 'Patna', lat: 25.5940947, lon: 85.1375645 },
    { name: 'Delhi', lat: 28.7040592, lon: 77.10249019999999 },
    { name: 'MadhapurHyderabad', lat: 17.448294, lon: 78.391487 }
  ];

  ngOnInit(): void {
    this.selectedLocation = this.locations.find(loc => loc.name === localStorage.getItem('selectedLocation'));
  }

  private initMap(): void {

    const center: LatLngExpression = [this.selectedLocation.lat, this.selectedLocation.lon];
    this.map = L.map('map', {
      center,
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
      center, 
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
