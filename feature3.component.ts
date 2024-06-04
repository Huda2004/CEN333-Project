import { Component,  } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { MResultBoxComponent } from '../../m-framework/m-result-box/m-result-box.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MFormUlaComponent } from '../../m-framework/m-form-ula/m-form-ula.component';
import { HttpClient } from '@angular/common/http';
import { MMapComponent } from '../../m-framework/m-map/m-map.component';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { MHeaderComponent } from "../../m-framework/m-header/m-header.component";
import { item } from '../../data/item';
import { MAhaComponent } from '../../m-aha/m-aha.component';
//@ts-ignore
declare var google; // Forward Declaration 
class Location{
  lat: number;
  lon: number;
  constructor(lat: number, lon: number){
    this.lat = lat; this.lon = lon; 
  }
}
class Toast{
  message: string; 
  type: string;
  duration: number; 
  header: string; 
  ngIfControl: boolean; 
  constructor(message: string, type:string, header: string, duration:number)
  {
    this.message = message; 
    this.type = type; 
    this.header = header; 
    this.duration = duration; 
    this.ngIfControl = false;
  }
  show(){
    this.ngIfControl = true; 
    setTimeout(()=>{
       this.ngIfControl = false; 
     },this.duration);
     return this;
  }
}
@Component({
    selector: 'app-feature3',
    standalone: true,
    templateUrl: './feature3.component.html',
    styleUrls: ['./feature3.component.css'],
    imports: [MContainerComponent, MResultBoxComponent, FormsModule, CommonModule, MFormUlaComponent, MMapComponent, MHeaderComponent, MAhaComponent]
})
export class Feature3Component {
  lat: number; 
  lng: number; 
  map: any; 
  address:string;
  itemlist: item[];
  reversegeocodingurl: string;
  selectedImage: string | ArrayBuffer = '';
  userName: string;
  list: any[];
  toast: any; 
  title: string;
  description: string;
selectedImagePreview: any;
  constructor(private http: HttpClient, private firebaseservice: FirebaseService,private router:Router){
    this.lat = 0; 
    this.lng = 0; 
    this.address = "";
    this.reversegeocodingurl = "";
    this.itemlist =[];
    this.userName = "";
    this.list =[];
    this.title = " ";
    this.description = " ";
    this.location2Address();

  }
  
  drawMarkerWithIcon(latitude: number, longitude: number, icon:any){
    return new google.maps.Marker({
      map: this.map,
      position: {lat: latitude, lng: longitude},
      icon: icon,
      zIndex: 9999999
    });
  }
  drawMarker(latitude: number, longitude: number){
    const marker = new google.maps.Marker({
      map: this.map,
      position: {lat: latitude, lng: longitude},
    });
  }
    storeUserLocation(){
      if(this. userName != null)
      {
          this.firebaseservice.addToList("/routes",{userName: this.userName, locations: this.list});
          this.toast = new Toast("Location Stored","success","Done",2000).show(); 
      }
      else
        this.toast = new Toast("Warning. User Name not entered", "warning","Warning", 2000).show();
    }

    drawUserLocation(){
  
      navigator.geolocation.getCurrentPosition((position)=>{
         this.lat = position.coords.latitude;
         this.lng = position.coords.longitude;
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.lat},${this.lng} &key=AIzaSyAvdbNyMkWpcMBKRwghEShYjD4lFFKKo68`;     
        this.http.get(url).subscribe((cityData: any) => {       
          let address = cityData.results[0].formatted_address;       
          this.address = address;    
         });   
      });
        const icon = {
          url: "https://cdn-icons-png.flaticon.com/512/5385/5385604.png",
          scaledSize: new google.maps.Size(50,50)
        }
        this.drawMarkerWithIcon(this.lat,this.lng,icon);
      }
    

    location2Address(){
      navigator.geolocation.getCurrentPosition((position)=>{
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng} &key=AIzaSyAvdbNyMkWpcMBKRwghEShYjD4lFFKKo68`;     
        this.http.get(url).subscribe((cityData: any) => {       
          let address = cityData.results[0].formatted_address;       
          this.address = address;    
         });   
      });
    }


  getMapInstance(map: any)
  {
    this.map = map;
    this.map.addListener("click", (event:any) => {
      let location = event.latLng;
      this.drawMarker(location.lat(),location.lng());
      this.address= location
    });
  }


  ngOnInit(): void {
    const timeSelect = document.getElementById("timeSelect");

    for (let i = 9; i < 24; i++) {
      const startTime = `${i}:00`;
      const endTime = `${i + 1}:00`;
      const option = document.createElement("option");
      option.value = `${startTime} - ${endTime}`;
      option.textContent = `${startTime} - ${endTime}`;
      timeSelect?.appendChild(option);
    }
  }

  onSelectImage(event: any) {
    const inputElement = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
    this.selectedImage = reader.result as string | ArrayBuffer;
    };
    reader.readAsDataURL(inputElement);
  }


  addItem() {
        const newItem = {
          title: this.title,
          image: this.selectedImage as string,
          description: this.description,
          address: this.address,
        };
        this.itemlist.push(newItem);
        console.log(this.itemlist);
        if(newItem != null && this.itemlist != null){
          let object = {title: newItem.title, description: newItem.description, image:newItem.image,address:newItem.address};
          let key = this.firebaseservice.addToList("items",object)!;
        this.firebaseservice.updateList('items',key,{id:key});
      };

}
}

