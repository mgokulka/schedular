import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import {
  CalendarEvent,
  CalendarMonthViewBeforeRenderEvent,
} from 'angular-calendar';
import { SyncScheduleService } from '../../services/sync-schedule.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarMonthComponent implements OnInit, OnDestroy {
  selectedDateHieghLight: Date = new Date();
  private _subscription: Subscription = new Subscription()
  constructor(private readonly syncScheduleService: SyncScheduleService) { }
  ngOnDestroy(): void {
    if (this._subscription)
      this._subscription.unsubscribe();
  }
  ngOnInit(): void {
    const data = this.syncScheduleService.getValue();
    this.viewDate = data.currentDate ?? new Date();
    this.selectedDateHieghLight = this.viewDate;
    this.refresh.next();

    this._subscription = this.syncScheduleService.currentDetailsSubject.subscribe(ele => {
      if (ele.currentDate !== this.viewDate) {
        this.viewDate = ele?.currentDate || new Date()
        this.refresh.next();

      }
    })
  }
  viewDate: Date = new Date();
  refresh = new Subject<void>();

  events: CalendarEvent[] = this.generateMonthEvents();

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
      // Apply the custom class logic
      if (
        day.date.getDate() === this.selectedDateHieghLight.getDate() &&
        day.inMonth
      ) {
        day.cssClass = 'border border-dark border-3 text-dark fw-bold bg-light'; // Add your custom class here
      }

      // Apply the badgeTotal logic
      day.badgeTotal = this.events.length
    })
  }




  // Function to generate random events for a full month
  generateMonthEvents(): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const numberOfEvents = Math.floor(Math.random() * 5) + 1; // Random number of events (1 to 5)
      for (let eventIndex = 0; eventIndex < numberOfEvents; eventIndex++) {
        events.push({
          start: new Date(currentYear, currentMonth, day),
          title: `Event ${eventIndex + 1} for ${day}/${currentMonth + 1}/${currentYear}`,
          color: {
            primary: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            secondary: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          },
        });
      }
    }

    return events;
  }

}
