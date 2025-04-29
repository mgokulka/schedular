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
import { ViewModes } from '../../core/constants';
export interface CalendarSlot {
  time?: string; // Optional: if you want specific time slots
  status: 'available' | 'unavailable' | 'empty'; // Status control
}

export interface CalendarDay {
  date: Date; // Full date (e.g., 2025-04-27)
  dayName: string; // 'Sunday', 'Monday', etc.
  slots: CalendarSlot[]; // List of slots under this day
}
@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrl: './calendar-week.component.css',
})
export class CalendarWeekComponent implements OnInit, AfterViewInit {
  _syncService = inject(SyncScheduleService);
  weekDayList: any[] = [];
  currentDate: Date = new Date();
  constructor(private readonly applicationRef: ApplicationRef) { }
  locationList: string[] = ["Apollo Hospitals",
    "Max Super Speciality Hospital",
    "Fortis Memorial Research Institute",
    "Kokilaben Dhirubhai Ambani Hospital",
    "Nanavati Super Specialty Hospital",
    "Medanta - The Medicity",
    "Narayana Health",
    "Christian Medical College (CMC)",
    "AIIMS",
    "Artemis Hospital"]
  weekData: CalendarDay[] = [
    {
      date: new Date('2025-04-27'),
      dayName: 'Sunday',
      slots: [
        { status: 'available' },
        { status: 'empty' },
        { status: 'available' },
        { status: 'empty' }
      ]
    },
    {
      date: new Date('2025-04-28'),
      dayName: 'Monday',
      slots: [
        { status: 'empty' },
        { status: 'available' },
        { status: 'empty' },
        { status: 'available' }
      ]
    },
    // ... similarly for Tuesday to Saturday
  ];
  ngOnInit(): void {
    // this._syncService.getWeekRange(this.currentDate);
  }
  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this._syncService.currentDetails.subscribe(
        (data: currentDetails) => {
          this.weekDayList = data.currentWeekDayList || [];
          this.currentDate = data.currentDate || new Date();
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    });
    console.table(this.weekDayList)
  }
  changeView(day: any) {
    this._syncService.setValue({
      currentDate: new Date(day.date),
      currentView: ViewModes.day
    })
  }
}
