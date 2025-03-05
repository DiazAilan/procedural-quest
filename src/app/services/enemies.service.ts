import { Injectable } from '@angular/core';
import { EnemyCharacter } from '../interfaces/character.interface';
import enemiesConfig from '../config/enemies.json';

@Injectable({
  providedIn: 'root'
})
export class EnemiesService {
  private enemies: EnemyCharacter[] = enemiesConfig;

  getRandomEnemy(): EnemyCharacter {
    const randomIndex = Math.floor(Math.random() * this.enemies.length);
    return { ...this.enemies[randomIndex] };
  }

  getMultipleRandomEnemies(count: number): EnemyCharacter[] {
    const enemies: EnemyCharacter[] = [];
    for (let i = 0; i < count; i++) {
      enemies.push(this.getRandomEnemy());
    }
    return enemies;
  }

  getAllEnemies(): EnemyCharacter[] {
    return this.enemies.map(enemy => ({ ...enemy }));
  }
}
