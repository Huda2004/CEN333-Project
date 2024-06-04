import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'm-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './m-header.component.html',
  styleUrl: './m-header.component.css'
})
export class MHeaderComponent {

  goToCart(event: Event){
    event.preventDefault();
    this.router.navigate(['feature2']);
  }

  goToContact(event: Event){
    event.preventDefault();
    this.router.navigate(['feature4']);
  }

  goToUpload(event: Event){
    event.preventDefault();
    this.router.navigate(['feature3']);
  }

  goToBuy(event: Event){
    event.preventDefault();
    this.router.navigate(['feature1']);
  }

goToHome(event: Event){
    event.preventDefault();
    this.router.navigate(['']);
  }

  goToChat(event: Event){
    event.preventDefault();
    this.router.navigate(['feature5']);
  }

  @Input() title: string; 
  @Input() homename: string; 
  private featureList: string[]; 

  constructor(private router: Router){
    this.title = "";
    this.featureList = [];
    this.homename = "Home";
  }

  @Input()
  set features(value: string[]){
    this.featureList = value; 
  }

  get features(): string[]{
    return this.featureList;
  }

  feature2path(feature: string){
    return feature.replace(/\s+/g, '').toLowerCase();
  }

}
