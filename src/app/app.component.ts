import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { MainComponent } from './views/main/main.component';
import { CombatComponent } from './views/combat/combat.component';
import { CharacterComponent } from './views/character/character.component';
import { SetView } from './store/view.actions';
import { CharacterCreationComponent } from './views/character-creation/character-creation.component';
@Component({
  selector: 'app-root',
  imports: [MainComponent, CombatComponent, CharacterComponent, CommonModule, CharacterCreationComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'procedural-quest';

  currentView: string = 'main';

  constructor(private store: Store) {
      this.store.select(state => state.view.currentView).subscribe(view => {
          this.currentView = view;
      });
  }

  setView(view: string): void {
      this.store.dispatch(new SetView(view));
  }

}
