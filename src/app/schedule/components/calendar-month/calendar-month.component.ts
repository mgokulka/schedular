import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarMonthViewBeforeRenderEvent,
} from 'angular-calendar';
import { SyncScheduleService } from '../../services/sync-schedule.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarMonthComponent implements OnInit {
  selectedDateHieghLight: Date = new Date();
  constructor(private readonly syncScheduleService: SyncScheduleService) {}
  ngOnInit(): void {
    this.syncScheduleService.currentDetails.subscribe((data) => {
      this.viewDate = data.currentDate || new Date();
      this.refresh.next();
    });
  }
  viewDate: Date = new Date();
  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'Test Event',
      color: { primary: '#1e90ff', secondary: '#D1E8FF' },
    },
    {
      start: new Date(),
      title: 'Test2 Event',
      color: { primary: '#1eff72', secondary: '#176138' },
    },
  ];

  changeDay(date: Date) {
    this.selectedDateHieghLight = date;
    this.viewDate = date;
    this.syncScheduleService.setValue({
      currentDate: date,
      currentView: 'week',
    });
  }
  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    renderEvent.body.forEach((day) => {
      if (
        day.date.getDate() === this.selectedDateHieghLight.getDate() &&
        day.inMonth
      ) {
        day.cssClass = 'border border-dark border-3 text-dark fw-bold bg-light'; // Add your custom class here
      }
    });
  }
}
