import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ResumeGame } from '../../store/game/game.actions';
import { SetView } from '../../store/view/view.actions';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(private store: Store) {}

  newGame(): void {
    this.store.dispatch(new SetView('character-creation'));
  }

}
