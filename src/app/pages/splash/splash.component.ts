import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-splash',
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css'
})
export class SplashComponent implements OnInit{

  constructor(private router: Router){

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/login']); 
    }, 3000);
  }
  
}
