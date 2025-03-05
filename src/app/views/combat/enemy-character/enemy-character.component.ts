import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnemyCharacter } from '../../../interfaces/character.interface';

@Component({
  selector: 'app-enemy-character',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enemy-character.component.html',
  styleUrls: ['./enemy-character.component.scss']
})
export class EnemyCharacterComponent {
  @Input() character!: EnemyCharacter;
} 