import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { SyncScheduleService } from '../../services/sync-schedule.service';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarMonthComponent implements OnInit {
  constructor(private readonly syncScheduleService: SyncScheduleService) { }
  ngOnInit(): void {
    this.syncScheduleService.currentDetails.subscribe((data) => {
      this.viewDate = data.currentDate || new Date();

    });
  }
  viewDate: Date = new Date();

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
    this.viewDate = date;
    this.syncScheduleService.setValue({
      currentDate: date,
      currentView: 'week',
    })

  }
}
