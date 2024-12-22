import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
class LayoutComponent {}

export default LayoutComponent;
