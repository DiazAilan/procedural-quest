import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { interval, Subscription } from 'rxjs';

export interface TimeStateModel {
  ticks: number;
  isRunning: boolean;
  ticksPerSecond: number;
}

export class StartTime {
  static readonly type = '[Time] Start';
}

export class StopTime {
  static readonly type = '[Time] Stop';
}

export class Tick {
  static readonly type = '[Time] Tick';
}

@State<TimeStateModel>({
  name: 'time',
  defaults: {
    ticks: 0,
    isRunning: false,
    ticksPerSecond: 20
  }
})
@Injectable()
export class TimeState {
  private timeSubscription?: Subscription;

  @Selector()
  static getTicks(state: TimeStateModel) {
    return state.ticks;
  }

  @Selector()
  static isRunning(state: TimeStateModel) {
    return state.isRunning;
  }

  @Action(StartTime)
  startTime(ctx: StateContext<TimeStateModel>) {
    const state = ctx.getState();
    if (!state.isRunning) {
      ctx.patchState({ isRunning: true });

      const intervalMs = 1000 / state.ticksPerSecond;
      
      this.timeSubscription = interval(intervalMs).subscribe(() => {
        ctx.dispatch(new Tick());
      });
    }
  }

  @Action(StopTime)
  stopTime(ctx: StateContext<TimeStateModel>) {
    ctx.patchState({ isRunning: false });
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }

  @Action(Tick)
  tick(ctx: StateContext<TimeStateModel>) {
    const state = ctx.getState();
    if (state.isRunning) {
      ctx.patchState({
        ticks: state.ticks + 1
      });
    }
  }
} 