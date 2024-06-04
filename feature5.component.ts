import { Component, AfterViewInit } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { MCardComponent } from '../../m-framework/m-card/m-card.component';
import { MAnalogOutputComponent } from '../../m-framework/m-analog-output/m-analog-output.component';
import { MHeaderComponent } from "../../m-framework/m-header/m-header.component";
import { FirebaseService } from '../../services/firebase.service';

@Component({
    selector: 'app-feature5',
    standalone: true,
    templateUrl: './feature5.component.html',
    styleUrls: ['./feature5.component.css'],
    imports: [MContainerComponent, MCardComponent, MAnalogOutputComponent, MHeaderComponent]
})
export class Feature5Component {
  constructor(private firebase: FirebaseService) {}
}