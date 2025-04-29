import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { CalendarMonthComponent } from './components/calendar-month/calendar-month.component';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { YearMonthPickerComponent } from './components/year-month-picker/year-month-picker.component';
import { EventDialogComponent } from './components/event-dialog/event-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarWeekComponent } from './components/calendar-week/calendar-week.component';
import { ButtonModule } from 'primeng/button';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';
import { ShortDatePipe } from './core/pipes/short-date-pipe.pipe';
import { SkeletonModule } from 'primeng/skeleton';
@NgModule({
  declarations: [
    ScheduleComponent,
    CalendarMonthComponent,
    CalendarHeaderComponent,
    YearMonthPickerComponent,
    CalendarDayComponent,
    CalendarWeekComponent,
    EventDialogComponent,
  ],
  imports: [
    ShortDatePipe,
    CommonModule,
    SkeletonModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    DialogModule,
    ButtonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ScheduleRoutingModule,
  ],
  exports: [ScheduleComponent],
})
export class ScheduleModule { }
