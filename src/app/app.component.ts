import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  static isAdmin = false;
  title = 'font';
  constructor(private location: Location, private router: Router, private cdRef : ChangeDetectorRef) { }
  ngOnInit() {
    console.log(this.location.path());
    if (this.location.path().search('/admin/') > -1)
      AppComponent.isAdmin = true;
    else
      AppComponent.isAdmin = false;
  }

  getIsAdmin(){
    return AppComponent.isAdmin;
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
