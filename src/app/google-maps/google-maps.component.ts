import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-google-maps',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './google-maps.component.html',
  styleUrl: './google-maps.component.scss',
})
export class GoogleMapsComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 };

  zoom = 18;
  ngOnInit(): void {
    this.getCurrentLocation()
      .then((location) => {
        console.log('Current Location:', location);
        this.center = location;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getCurrentLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            resolve({ lat, lng });
          },
          (error) => {
            reject('Error getting location: ' + error.message);
          }
        );
      } else {
        reject('Geolocation is not available in this browser.');
      }
    });
  }
}
