import {
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
  inject,
  OnInit,
} from '@angular/core';
import { addMonths, addWeeks, subMonths, subWeeks } from 'date-fns';
import { DatePipe } from '@angular/common';
import { SyncScheduleService } from '../../services/sync-schedule.service';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  providers: [DatePipe],
})
export class CalendarHeaderComponent implements OnInit {
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
    const currentYear = new Date().getFullYear()-1;
    this.years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  }
  decrement() {
    if (this.view === 'month') {
      this._syncService.setValue({ currentDate: subMonths(this.viewDate, 1) });
    } else if (this.view === 'week') {
      this._syncService.setValue({ currentDate: subWeeks(this.viewDate, 1) });
    }
  }

  increment() {
    if (this.view === 'month') {
      this._syncService.setValue({ currentDate: addMonths(this.viewDate, 1) });
    }
    else if (this.view === 'week') {
      this._syncService.setValue({ currentDate: addWeeks(this.viewDate, 1) });
    }
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
