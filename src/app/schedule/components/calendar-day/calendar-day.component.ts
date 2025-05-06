import { Component, inject, OnInit } from '@angular/core';
import { SyncScheduleService, currentDetails } from '../../services/sync-schedule.service';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrl: './calendar-day.component.css'
})
export class CalendarDayComponent implements OnInit {
  _syncService = inject(SyncScheduleService);
  viewDate: Date = new Date();
  ngOnInit(): void {
    Promise.resolve().then(() => {
      this._syncService.currentDetails.subscribe(
        (data: currentDetails) => {
          this.viewDate = data.currentDate || new Date();
        }
      );
    });
  }
}
