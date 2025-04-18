import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-year-month-picker',
  
  templateUrl: './year-month-picker.component.html',
  styleUrl: './year-month-picker.component.css'
})
export class YearMonthPickerComponent {
  @Input() selectedDate: Date = new Date();
  @Output() dateSelected = new EventEmitter<Date>();

  showPanel = false;
  years: number[] = [];
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth();

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
    this.selectedYear = this.selectedDate.getFullYear();
    this.selectedMonth = this.selectedDate.getMonth();
  }

  togglePanel() {
    this.showPanel = !this.showPanel;
  }

  selectMonth(index: number) {
    this.selectedMonth = index;
    const newDate = new Date(this.selectedYear, this.selectedMonth, 1);
    this.dateSelected.emit(newDate);
    this.showPanel = false;
  }

  onYearChange(event: any) {
    this.selectedYear = +event.target.value;
  }

}
