import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Attack } from './combat.actions';
import { Constellation } from '../player/player.actions';

export interface CombatStateModel {
  player: {
    name: string;
    level: number;
    experience: number;
    health: number;
    energy: number;
    strength: number;
    dexterity: number;
    intelligence: number;
    race: 'Human' | 'Orc' | 'Elf';
    class: 'Fighter' | 'Thief' | 'Mage';
    constellation: Constellation;
  };
  enemies: {
    name: string;
    health: number;
    strength: number;
    dexterity: number;
    intelligence: number;
  }[];
}

@State<CombatStateModel>({
  name: 'combat',
  defaults: {
    player: {
      name: '',
      level: 1,
      experience: 0,
      health: 0,
      energy: 0,
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      race: 'Human',
      class: 'Fighter',
      constellation: Constellation.Aries
    },
    enemies: []
  }
})
@Injectable()
export class CombatState {
  @Selector()
  static getPlayer(state: CombatStateModel) {
      return state.player;
  }

  @Selector()
  static getEnemies(state: CombatStateModel) {
      return state.enemies;
  }

  @Action(Attack)
  attack(ctx: StateContext<CombatStateModel>, action: Attack) {
    const state = ctx.getState();
    const source = state.player;
    const target = state.enemies.find(enemy => enemy.name === action.target);
    if (target) {
        const damage = Math.max(0, source.strength - target.dexterity);
        ctx.setState({
            ...state,
            enemies: state.enemies.map(enemy => enemy.name === action.target ? { ...enemy, health: enemy.health - damage } : enemy)
        });
    }
  }
}