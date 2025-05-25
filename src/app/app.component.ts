import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ScheduleModule } from './schedule/schedule.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, ButtonModule, ScheduleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'my-app';

  ngOnInit(): void {}
}
