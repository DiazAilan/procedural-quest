import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CharacterCreation, CreateCharacter, Constellation } from './player.actions';
import racialModifiers from '../config/racialModifiers.json';

export interface PlayerStateModel {
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
}

@State<PlayerStateModel>({
  name: 'player',
  defaults: {
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
  }
})
@Injectable()
export class PlayerState {
  @Selector()
  static getState(state: PlayerStateModel) {
      return state;
  }

  @Action(CreateCharacter)
  createCharacter(ctx: StateContext<PlayerStateModel>, { character }: CreateCharacter) {
    ctx.setState({
      ...ctx.getState(),
      ...this.setPlayerFromCharacterCreation(character)
    });
  }

  private setPlayerFromCharacterCreation(character: CharacterCreation): PlayerStateModel {
    return {
      name: character.name,
      level: 1,
      experience: 0,
      health: 20 * racialModifiers[character.race].health,
      energy: 10 * racialModifiers[character.race].energy,
      strength: 5 + racialModifiers[character.race].strength,
      dexterity: 5 + racialModifiers[character.race].dexterity,
      intelligence: 5 + racialModifiers[character.race].intelligence,
      race: character.race,
      class: character.class,
      constellation: character.constellation
    }
  }
}