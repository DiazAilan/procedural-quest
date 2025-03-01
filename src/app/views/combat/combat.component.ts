import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { PlayerStateModel } from '../../store/player/player.state';
import { SaveCharacter } from '../../store/player/player.actions';

@Component({
  selector: 'app-combat',
  imports: [],
  templateUrl: './combat.component.html',
  styleUrl: './combat.component.scss'
})
export class CombatComponent {

  player!: PlayerStateModel;

  constructor(private store: Store) {
    this.store.select(state => state.player).subscribe(player => {
        this.player = player;
    });
  }

  saveGame(): void {
    this.store.dispatch(new SaveCharacter(this.player));
  }

}
