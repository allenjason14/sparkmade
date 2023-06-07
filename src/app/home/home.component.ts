import { Component } from '@angular/core';
import { vowels } from '../commons/commons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'sparkmade';
  share = testytest;
  testing = true;
  changeTesting = () => { this.testing = !this.testing };
  vowelList = [...vowels]
}

const testytest = () =>  console.log('does this just fire since its a thing?')
