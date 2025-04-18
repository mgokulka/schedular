import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
export interface currentDetails {
  cuurentWeekDayList?: any[];
  currentDate?: Date;
  currentView?: string;
}
@Injectable({
  providedIn: 'root',
})
export class SyncScheduleService {
  constructor() {}
  currentDetailsSubject = new BehaviorSubject<currentDetails>({
    cuurentWeekDayList: [],
    currentDate: new Date(),
    currentView: 'week',
  });
  public currentDetails = this.currentDetailsSubject.asObservable();

  setValue(newData: Partial<currentDetails>): void {
    const currentValue = this.currentDetailsSubject.value;

    const updatedValue = { ...currentValue, ...newData };

    this.currentDetailsSubject.next(updatedValue);
  }

  weekdayViewDetails(startDate: any, endDate: any) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateArray = [];

    while (start <= end) {
      const dateObj = {
        date: start.toISOString().split('T')[0], // Converts date to 'YYYY-MM-DD' format
        day: start.toLocaleDateString('en-US', { weekday: 'long' }), // Gets the day name
      };
      dateArray.push(dateObj);
      start.setDate(start.getDate() + 1); // Moves to the next day
    }
    this.currentDetailsSubject.next({ cuurentWeekDayList: dateArray });
  }
  getWeekRange(date: Date): string {
    // Get the day of the week (0 = Sunday, 6 = Saturday)
    const dayOfWeek = date.getDay();

    // Calculate the start and end of the week
    const startOfWeek = new Date(date);
    const endOfWeek = new Date(date);

    startOfWeek.setDate(date.getDate() - dayOfWeek);
    endOfWeek.setDate(date.getDate() + (6 - dayOfWeek));

    // Format the dates to "dd-mm-yyyy"
    const formatDate = (d: Date): string =>
      `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${d.getFullYear()}`;

    const start = new Date(startOfWeek).toISOString().split('T')[0];
    const end = new Date(endOfWeek).toISOString().split('T')[0];
    this.weekdayViewDetails(start, end);
    return `${formatDate(startOfWeek)} to ${formatDate(endOfWeek)}`;
  }
}
