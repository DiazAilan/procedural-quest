import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ResumeGame } from '../../store/game/game.actions';
import { SetView } from '../../store/view/view.actions';
import { LoadCharacter } from '../../store/player/player.actions';
import { EncryptionService } from '../../services/encryption.service';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(private store: Store, private encryption: EncryptionService) {}

  newGame(): void {
    this.store.dispatch(new SetView('character-creation'));
  }

  loadGame(): void {
    this.store.dispatch(new SetView('load-character'));
  }

}
