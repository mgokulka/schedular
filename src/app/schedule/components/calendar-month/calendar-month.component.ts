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
    this.events = this.syncScheduleService.generateMonthEvents();

    this._subscription = this.syncScheduleService.currentDetailsSubject.subscribe(ele => {
      if (ele.currentDate !== this.viewDate) {
        this.viewDate = ele?.currentDate || new Date()
        this.refresh.next();

      }
    })
  }
  viewDate: Date = new Date();
  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

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
      day.badgeTotal = day.events.length
    })
  }
}