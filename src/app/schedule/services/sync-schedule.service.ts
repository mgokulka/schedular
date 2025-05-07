import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { BehaviorSubject, Subject } from 'rxjs';
export interface currentDetails {
  currentWeekDayList?: any[];
  currentDate?: Date;
  currentView?: string;
}
@Injectable({
  providedIn: 'root',
})
export class SyncScheduleService {
  constructor() { }
  currentDetailsSubject = new BehaviorSubject<currentDetails>({
    currentWeekDayList: [],
    currentDate: new Date(),
    currentView: 'week',
  });
  public currentDetails = this.currentDetailsSubject.asObservable();

  setValue(newData: Partial<currentDetails>): void {
    const currentValue = this.currentDetailsSubject.value;

    const updatedValue = { ...currentValue, ...newData };

    this.currentDetailsSubject.next(updatedValue);
  }
  getValue() {
    return this.currentDetailsSubject.getValue();
  }

  weekdayViewDetails(startDate: any, endDate: any) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateArray = [];

    while (start <= end) {
      const dateObj = {
        date: new Date(start),
        day: start.toLocaleDateString('en-US', { weekday: 'long' }), // Gets the day name
      };
      dateArray.push(dateObj);
      start.setDate(start.getDate() + 1); // Moves to the next day
    }
    this.setValue({ currentWeekDayList: dateArray });
  }
  getWeekRange(date: Date): string {
    const dayOfWeek = date.getDay();

    // Clone the date to avoid modifying the input date
    const startOfWeek = new Date(date);
    const endOfWeek = new Date(date);

    // Calculate start and end of the week
    startOfWeek.setDate(date.getDate() - dayOfWeek);
    endOfWeek.setDate(date.getDate() + (6 - dayOfWeek));

    // Format the dates to "Mon DD"
    const formatShortDate = (d: Date): string =>
      `${d.toLocaleString("default", { month: "short" })} ${d.getDate()}`;

    // Format dates to "YYYY-MM-DD" for weekdayViewDetails
    const formatFullDate = (d: Date): string =>
      d.toLocaleDateString("en-CA"); // Outputs in "YYYY-MM-DD" format

    // Get formatted dates
    const start = formatFullDate(startOfWeek);
    const end = formatFullDate(endOfWeek);

    // Call weekdayViewDetails with formatted dates
    this.weekdayViewDetails(start, end);

    // Return the range in "Mon DD - Mon DD, YYYY" format
    return `${formatShortDate(startOfWeek)} - ${formatShortDate(endOfWeek)}, ${startOfWeek.getFullYear()}`;
  }
  getFormattedFullDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
  normalizeDate = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

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
          id: eventIndex,
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
