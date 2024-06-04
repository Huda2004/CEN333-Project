import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { Feature1Component } from '../feature1/feature1.component';
import { Feature2Component} from '../feature2/feature2.component';
import { Feature3Component} from '../feature3/feature3.component';
import { MMainMenuComponent } from "../../m-framework/m-main-menu/m-main-menu.component";
import { Router } from '@angular/router';
import { MHeaderComponent } from "../../m-framework/m-header/m-header.component";
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [MContainerComponent, CommonModule, FormsModule, Feature1Component, Feature2Component, Feature3Component, MMainMenuComponent, MHeaderComponent]
})
export class HomeComponent {
    constructor(private router: Router){

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

}