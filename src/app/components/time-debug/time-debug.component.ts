import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select } from '@ngxs/store';
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
  @Select(TimeState.getTicks) ticks$!: Observable<number>;
  @Select(TimeState.isRunning) isRunning$!: Observable<boolean>;

  isVisible = false;

  ngOnInit() {}

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
} 