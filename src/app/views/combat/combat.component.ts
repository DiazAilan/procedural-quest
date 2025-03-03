import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { PlayerStateModel } from '../../store/player/player.state';
import { SaveCharacter } from '../../store/player/player.actions';
import { StartTime, StopTime, TimeState } from '../../store/time/time.state';
import { TimeService } from '../../services/time.service';
import { TimeDebugComponent } from '../../components/time-debug/time-debug.component';

@Component({
  selector: 'app-combat',
  imports: [TimeDebugComponent],
  templateUrl: './combat.component.html',
  styleUrl: './combat.component.scss'
})
export class CombatComponent implements OnInit, OnDestroy {

  player!: PlayerStateModel;
  private lastAttackTick = 0;

  constructor(
    private store: Store,
    private timeService: TimeService
  ) {
    this.store.select(state => state.player).subscribe(player => {
        this.player = player;
    });
  }

  ngOnInit() {
    // Start the time system when combat begins
    this.store.dispatch(new StartTime());
  }

  ngOnDestroy() {
    // Stop the time system when leaving combat
    this.store.dispatch(new StopTime());
  }

  saveGame(): void {
    this.store.dispatch(new SaveCharacter(this.player));
  }

  attack() {
    // Check if attack is off cooldown (2 second cooldown)
    if (this.timeService.isCooldownComplete(this.lastAttackTick, 2)) {
      // Perform attack
      this.lastAttackTick = this.store.selectSnapshot(TimeState.getTicks);
    }
  }

  castSpell() {
    // Create a 3-second cast timer
    const castTimer$ = this.timeService.createTimer(3);
    castTimer$.subscribe({
      next: remainingSeconds => {
        // Update UI with remaining cast time
        console.log(`Casting: ${remainingSeconds.toFixed(1)}s remaining`);
      },
      complete: () => {
        // Cast is complete, execute spell
        console.log('Spell cast complete!');
      }
    });
  }

}
