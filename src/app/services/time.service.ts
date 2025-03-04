import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { TimeState } from '../store/time/time.state';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  ticks$!: Observable<number>

  constructor(private store: Store) {
    this.ticks$ = this.store.select(state => state.time.ticks)
  }

  createTimer(durationInSeconds: number): Observable<number> {
    const ticksRequired = durationInSeconds * 20;
    const startTick = this.store.selectSnapshot(TimeState.getTicks);
    
    return this.ticks$.pipe(
      map(currentTick => {
        const elapsedTicks = currentTick - startTick;
        const remainingTicks = ticksRequired - elapsedTicks;
        return Math.max(0, remainingTicks / 20);
      })
    );
  }

  isCooldownComplete(lastActionTick: number, cooldownInSeconds: number): boolean {
    const currentTick = this.store.selectSnapshot(TimeState.getTicks);
    const requiredTicks = cooldownInSeconds * 20;
    return currentTick - lastActionTick >= requiredTicks;
  }
} 