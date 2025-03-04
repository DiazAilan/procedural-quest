import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { TimeState } from '../../store/time/time.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-time-debug',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-debug.component.html',
  styleUrls: ['./time-debug.component.scss']
})
export class TimeDebugComponent implements OnInit {
  ticks$!: Observable<number>;
  isRunning$!: Observable<boolean>;

  constructor(private store: Store) {
    this.ticks$ = this.store.select(state => state.time.ticks)
    this.isRunning$ = this.store.select(state => state.time.isRunning)
  }

  isVisible = false;

  ngOnInit() {}

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
} 