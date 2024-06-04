import { Component } from '@angular/core';
import { MHeaderComponent } from "../m-header/m-header.component";

@Component({
    selector: 'm-container',
    standalone: true,
    templateUrl: './m-container.component.html',
    styleUrl: './m-container.component.css',
    imports: [MHeaderComponent]
})
export class MContainerComponent {

}
