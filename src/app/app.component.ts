import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextFormatPipe } from './text-format.pipe';
import { BackgroundColorEffectDirective } from './background-color-effect.directive';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    TextFormatPipe,
    BackgroundColorEffectDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  colors: string[] = [
    'red',
    'green',
    'blue',
    'yellow',
    'orange',
    'purple',
    'pink',
    'brown',
    'gray',
    'black',
    'white',
    'violet',
    'indigo',
    'cyan',
    'magenta',
    'teal',
    'turquoise',
    'lime',
    'gold',
    'silver',
    'beige',
    'coral',
    'peach',
    'maroon',
    'navy',
    'olive',
    'plum',
    'salmon',
    'sienna',
    'orchid',
    'crimson',
    'lavender',
    'mint',
    'fuchsia',
    'chartreuse',
    'azure',
    'emerald',
    'ruby',
  ];
  colorList: string[] = [];
  colorInput: string = '';

  onAddColor() {
    this.colorInput = this.colorInput.trim();
    this.colorInput = this.colorInput.toLowerCase();
    let colorExists = this.colors.find((x) => x === this.colorInput);
    if (!colorExists) return alert('wrong color name');
    let checkColor = this.colorList.find((x) => x === this.colorInput);
    if (checkColor) return alert('Color already exists!');

    this.colorList.push(this.colorInput);
    this.colorInput = '';
  }
}
