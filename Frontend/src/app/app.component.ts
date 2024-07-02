import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from "./container/container.component";
import { DetailComponent } from "./detail/detail.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { HeaderComponent } from "./header/header.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ContainerComponent, DetailComponent, NotfoundComponent, HeaderComponent]
})
export class AppComponent {
  title = 'store';


}
