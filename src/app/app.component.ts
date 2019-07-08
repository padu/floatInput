import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'angular-helloword';
  inputValue = 50;

  checkModuleValue() {
    console.log('input : ', this.inputValue);
  }
}
