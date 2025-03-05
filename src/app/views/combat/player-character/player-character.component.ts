import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerCharacter } from '../../../interfaces/character.interface';

@Component({
  selector: 'app-player-character',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-character.component.html',
  styleUrls: ['./player-character.component.scss']
})
export class PlayerCharacterComponent {
  @Input() character!: PlayerCharacter;
} 