import {
  ApplicationRef,
  Component,
  inject,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import {
  currentDetails,
  SyncScheduleService,
} from '../../services/sync-schedule.service';

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrl: './calendar-week.component.css',
})
export class CalendarWeekComponent implements OnInit, AfterViewInit {
  _syncService = inject(SyncScheduleService);
  weekDayList: any[] = [];
  constructor(private applicationRef: ApplicationRef) { }

  ngOnInit(): void { }
  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this._syncService.currentDetails.subscribe(
        (data: currentDetails) => {
          this.weekDayList = data.cuurentWeekDayList || [];
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    });
  }
  changeView(day: any) {
    this._syncService.setValue({
      currentDate: new Date(day.date),
      currentView:'day'
    })
  }
}
