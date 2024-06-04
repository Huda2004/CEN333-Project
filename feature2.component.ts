import { Component } from '@angular/core';
import { MMainMenuComponent } from '../../m-framework/m-main-menu/m-main-menu.component';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { MHeaderComponent } from "../../m-framework/m-header/m-header.component";
@Component({
    selector: 'app-feature2',
    standalone: true,
    templateUrl: './feature2.component.html',
    styleUrl: './feature2.component.css',
    imports: [MContainerComponent, MHeaderComponent]
})
export class Feature2Component {
  fun(){
    console.log('Feature 2 button clicked!');
  }

}
