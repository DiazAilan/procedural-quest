import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { TimeDebugComponent } from '../../components/time-debug/time-debug.component';
import { EnemyCharacter } from '../../interfaces/character.interface';
import { EnemiesService } from '../../services/enemies.service';
import { TimeService } from '../../services/time.service';
import { SaveCharacter } from '../../store/player/player.actions';
import { PlayerStateModel } from '../../store/player/player.state';
import { StartTime, StopTime, TimeState } from '../../store/time/time.state';
import { EnemyCharacterComponent } from './enemy-character/enemy-character.component';
import { PlayerCharacterComponent } from './player-character/player-character.component';

@Component({
  selector: 'app-combat',
  imports: [TimeDebugComponent, PlayerCharacterComponent, EnemyCharacterComponent, CommonModule],
  templateUrl: './combat.component.html',
  styleUrl: './combat.component.scss'
})
export class CombatComponent implements OnInit, OnDestroy {

  player!: PlayerStateModel;
  enemies: EnemyCharacter[] = [];
  private lastAttackTick = 0;

  constructor(
    private store: Store,
    private timeService: TimeService,
    private enemiesService: EnemiesService
  ) {
    this.store.select(state => state.player).subscribe(player => {
        this.player = player;
    });
    
    this.enemies = this.enemiesService.getMultipleRandomEnemies(3);
  }

  ngOnInit(): void {
    this.store.dispatch(new StartTime());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StopTime());
  }

  saveGame(): void {
    this.store.dispatch(new SaveCharacter(this.player));
  }

  attack(): void {
    if (this.timeService.isCooldownComplete(this.lastAttackTick, 2)) {
      this.lastAttackTick = this.store.selectSnapshot(TimeState.getTicks);
    }
  }

  castSpell(): void {
    const castTimer$ = this.timeService.createTimer(3);
    castTimer$.subscribe({
      next: remainingSeconds => console.log(`Casting: ${remainingSeconds.toFixed(1)}s remaining`),
      complete: () => console.log('Spell cast complete!')
    });
  }

}
