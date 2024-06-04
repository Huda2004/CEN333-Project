import { Component, AfterViewInit } from '@angular/core';
import { MCardComponent } from '../../m-framework/m-card/m-card.component';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { Feature3Component } from '../feature3/feature3.component';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { MHeaderComponent } from "../../m-framework/m-header/m-header.component";
import { item } from '../../data/item';
@Component({
    selector: 'app-feature1',
    standalone: true,
    templateUrl: './feature1.component.html',
    styleUrls: ['./feature1.component.css'],
    imports: [CommonModule, MContainerComponent, MCardComponent, Feature3Component, MHeaderComponent]
})
export class Feature1Component implements AfterViewInit {
  title:string;
  description:string;
  image:string;
  itemList:item[];

  constructor(private router:Router,private firebaseService: FirebaseService) { 
    this.title="";
    this.description="";
    this.image="";
    this.itemList = [];
  }

  ngAfterViewInit(): void {
    const preveiwContainer = document.querySelector('.products-preview') as HTMLElement;
    const previewBox = preveiwContainer.querySelectorAll('.preview') as NodeListOf<HTMLElement>;

    document.querySelectorAll('.products-container .product').forEach(product => {
      product.addEventListener('click', () => {
        preveiwContainer.style.display = 'flex';
        const name = product.getAttribute('data-name');
        previewBox.forEach(preview => {
          const target = preview.getAttribute('data-target');
          if (name === target) {
            preview.classList.add('active');
          }
        });
      });
    });

    previewBox.forEach(close => {
      const closeButton = close.querySelector('.fa-times') as HTMLElement;
      closeButton.addEventListener('click', () => {
        close.classList.remove('active');
        preveiwContainer.style.display = 'none';
      });
    });
  }
}