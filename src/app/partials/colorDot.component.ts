import { Component, Input} from '@angular/core';

@Component({
  selector: 'color-dot-partial',
  template: `
    <div class='colorDotContainer'>
        <div class='colorDot' *ngFor="let color of colorsArray" [style.backgroundColor]="color"></div>
    </div>  
  `
})
export class ColorDotComponent{
  @Input() colorsArray;
}
