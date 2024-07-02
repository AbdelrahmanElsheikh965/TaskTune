import { Component, Input } from '@angular/core';
import { DetailComponent } from "../detail/detail.component";
import { HeaderComponent } from "../header/header.component";
import { ContainerComponent } from '../container/container.component';
import { Route, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ProductDiscountPipe } from '../Pipes/product-discount.pipe';
import { ProductIntPricePipe } from '../Pipes/product-int-price.pipe';
import { ProductCardComponent } from '../product-card/product-card.component';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-list',
    standalone: true,
    templateUrl: './list.component.html',
    styleUrl: './list.component.css',
    imports: [ContainerComponent, DetailComponent, HeaderComponent, DatePipe, ProductDiscountPipe, ProductIntPricePipe, ProductCardComponent]
})
export class ListComponent {

    constructor(private routeObj : Router){}

    @Input() ReceivedData: any;
   
}
