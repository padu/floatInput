import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'angular-helloword';
  inputValue = 50;
  inputNo = 20;
  startTime = new Date();
  endTime = new Date();

  ngOnInit() {
    this.startTime.setTime( this.startTime.getTime() + 5 * 86400000 )
  }

  checkModuleValue() {
    console.log('input : ', this.inputValue);
  }
}
