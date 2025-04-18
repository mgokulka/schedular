import { Component, OnInit } from '@angular/core';
import { SyncScheduleService } from './services/sync-schedule.service';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styles: [],
})
export class ScheduleComponent implements OnInit {
  constructor(public readonly syncScheduleService: SyncScheduleService) {}

  ngOnInit(): void {
    this.syncScheduleService.setValue({
      currentView: 'week',
      currentDate: new Date(),
      cuurentWeekDayList:[]
    });
    this.syncScheduleService.currentDetails.subscribe((data) => {
      if (data.currentView) {
        this.view = data.currentView;
        this.selectedDate = data.currentDate || new Date();
      }
      if (data.currentDate) {
        this.viewDate = data.currentDate;
      }
    });
  }

  viewDate: Date = new Date();
  view: string = '';
  selectedDate: Date = new Date();

  selectedDateChange(event: any) {
    this.selectedDate = event;
  }
}
