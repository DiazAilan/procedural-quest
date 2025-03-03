import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { TimeState } from '../store/time/time.state';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  @Select(TimeState.getTicks) ticks$!: Observable<number>;

  constructor(private store: Store) {}

  /**
   * Creates an observable that completes after the specified duration
   * @param durationInSeconds Duration in seconds
   */
  createTimer(durationInSeconds: number): Observable<number> {
    const ticksRequired = durationInSeconds * 20; // Convert to ticks (20 ticks per second)
    const startTick = this.store.selectSnapshot(TimeState.getTicks);
    
    return this.ticks$.pipe(
      map(currentTick => {
        const elapsedTicks = currentTick - startTick;
        const remainingTicks = ticksRequired - elapsedTicks;
        return Math.max(0, remainingTicks / 20); // Convert back to seconds
      })
    );
  }

  /**
   * Check if enough time has passed since the last action
   * @param lastActionTick The tick when the last action occurred
   * @param cooldownInSeconds Cooldown duration in seconds
   */
  isCooldownComplete(lastActionTick: number, cooldownInSeconds: number): boolean {
    const currentTick = this.store.selectSnapshot(TimeState.getTicks);
    const requiredTicks = cooldownInSeconds * 20;
    return currentTick - lastActionTick >= requiredTicks;
  }
} 