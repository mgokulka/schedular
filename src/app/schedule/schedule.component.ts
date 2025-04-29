import { Component, OnInit, OnDestroy } from '@angular/core';
import { SyncScheduleService } from './services/sync-schedule.service';
import { Subscription } from 'rxjs';
import { ViewModes } from './core/constants';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styles: [],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  constructor(public readonly syncScheduleService: SyncScheduleService) { }
  private _subcription: Subscription = new Subscription();
  ngOnInit(): void {
    this.syncScheduleService.setValue({
      currentView: ViewModes.week,
      currentDate: new Date(),
      currentWeekDayList: [],
    });
    this._subcription = this.syncScheduleService.currentDetails.subscribe(
      (data) => {
        if (data.currentView) {
          this.view = data.currentView;
          this.selectedDate = data.currentDate || new Date();
        }
        if (data.currentDate) {
          this.viewDate = data.currentDate;
        }
      }
    );
  }
  ngOnDestroy(): void {
    if (this._subcription) {
      this._subcription.unsubscribe();
    }
  }

  viewDate: Date = new Date();
  view: string = '';
  selectedDate: Date = new Date();

  selectedDateChange(event: any) {
    this.selectedDate = event;
  }
}
