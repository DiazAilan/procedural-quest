import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { LoadCharacter } from '../../store/player/player.actions';
import { EncryptionService } from '../../services/encryption.service';

@Component({
  selector: 'app-load-character',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './load-character.component.html',
  styleUrls: ['./load-character.component.scss']
})
export class LoadCharacterComponent {
  saveCode: string = '';

  constructor(private store: Store, private encryption: EncryptionService) {}

  loadGame(): void {
    if (this.saveCode) {
      this.store.dispatch(new LoadCharacter(this.encryption.decrypt(this.saveCode)));
    }
  }
}
