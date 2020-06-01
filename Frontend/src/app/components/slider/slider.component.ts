import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  //este parametro se vera en el slider
  @Input() nombre: string;
  @Input() size: string;

  constructor() { }

  ngOnInit(): void {
  }

}
