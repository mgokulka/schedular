import {
  HostListener, Component,
  Input,
  Output,
  EventEmitter,
  Inject,
  inject,
  OnInit,
} from '@angular/core';
import { addDays, addMonths, addWeeks, subDays, subMonths, subWeeks } from 'date-fns';
import { DatePipe } from '@angular/common';
import { SyncScheduleService } from '../../services/sync-schedule.service';
import { ViewModes } from '../../core/constants';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  providers: [DatePipe],
})
export class CalendarHeaderComponent implements OnInit {
  @HostListener('window:keydown.alt.m', ['$event'])
  onCtrlM(event: KeyboardEvent) {
    event.preventDefault(); // Prevents default browser behavior
    this._syncService.setValue({ currentView: ViewModes.month })
  }
  @HostListener('window:keydown.alt.w', ['$event'])
  onAltW(event: KeyboardEvent) {
    event.preventDefault(); // Prevents default browser behavior
    this._syncService.setValue({ currentView: ViewModes.week });
  }
  @HostListener('window:keydown.alt.d', ['$event'])
  onAltD(event: KeyboardEvent) {
    event.preventDefault(); // Prevents default browser behavior
    this._syncService.setValue({ currentView: ViewModes.day });
  }
  @HostListener('window:keydown.alt.P', ['$event'])
  onCtrlP(event: KeyboardEvent) {
    event.preventDefault(); // Prevents default browser behavior
    this.decrement()
  }
  @HostListener('window:keydown.alt.n', ['$event'])
  onAltN(event: KeyboardEvent) {
    event.preventDefault(); // Prevents default browser behavior
    this.increment();
  }
  @HostListener('window:keydown.alt.t', ['$event'])
  onAltT(event: KeyboardEvent) {
    event.preventDefault(); // Prevents default browser behavior
    this.today();
  }
  @HostListener('window:keydown.alt.y', ['$event'])
  onAltY(event: KeyboardEvent) {
    event.preventDefault(); // Prevents default browser behavior
    this.togglePanel()
  }


  view: string = '';
  viewDate: Date = new Date();
  _syncService = inject(SyncScheduleService);
  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
    Promise.resolve().then(() => {
      this._syncService.currentDetails.subscribe((data) => {
        this.viewDate = data.currentDate || new Date();
        this.view = data.currentView || 'month';
        this.selectedDate = new Date(this.viewDate);
        this.selectedYear = this.selectedDate.getFullYear();
        this.selectedMonth = this.selectedDate.getMonth();
      });
    });
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  }
  decrement() {
    let currDate
    if (this.view === ViewModes.month) {
      currDate = subMonths(this.viewDate, 1)
    } else if (this.view === ViewModes.week) {
      currDate = subWeeks(this.viewDate, 1)
    }
    else if (this.view === ViewModes.day) {
      currDate = subDays(this.viewDate, 1)
    }
    this._syncService.setValue({ currentDate: currDate });
    this._syncService.getWeekRange(currDate ?? new Date())
  }

  increment() {
    let currDate
    if (this.view === ViewModes.month) {
      currDate = addMonths(this.viewDate, 1)
    }
    else if (this.view === ViewModes.week) {
      currDate = addWeeks(this.viewDate, 1)
    }
    else if (this.view === ViewModes.day) {
      currDate = addDays(this.viewDate, 1)
    }
    this._syncService.setValue({ currentDate: currDate });
    this._syncService.getWeekRange(currDate ?? new Date())
  }

  today() {
    this._syncService.setValue({ currentDate: new Date() });
  }

  changeView(view: string) {
    this._syncService.setValue({ currentView: view });
    this.view = view;
  }

  get formattedMonthYear(): string {
    return this.datePipe.transform(this.viewDate, 'MMMM yyyy') || '';
  }

  selectedDate: Date = new Date();

  showPanel = false;
  years: number[] = [];
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth();

  togglePanel() {
    this.showPanel = !this.showPanel;
  }

  selectMonth(index: number) {
    this.selectedMonth = index;
    const newDate = new Date(this.selectedYear, this.selectedMonth, 1);
    this._syncService.setValue({ currentDate: newDate, currentView: 'month' });
    this.showPanel = false;
  }

  onYearChange(event: any) {
    this.selectedYear = +event.target.value;
  }
}
