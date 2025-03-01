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
    this.store.dispatch(new LoadCharacter(this.encryption.decrypt('U2FsdGVkX1/tNIZrLfMMZCe+OKibsK1L4bZvlXPMo55Rr9BvnRPEbQvqXdfOw5PuE06omeDxhzMMiL2wzzPAmR/NNQF4CWURHFDB13kvNZyU5Qy90vIiHRqguz8/PrTxuhd9bEX6nKnEYagugiGsHaq2wDrZjxx0fSHm4FTsrGZOOcqYv0A/uLiSzUyDyVofIK7PaId2QDuxvTkuhl/tvlhXi6OzR7LcriXURJne9Nwrr/dXW7Ro1oqAUofAwqWh')));
    this.store.dispatch(new SetView('combat'));
  }

}
