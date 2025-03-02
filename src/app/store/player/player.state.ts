import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { CharacterCreation, CreateCharacter, Constellation, LoadCharacter, SaveCharacter } from './player.actions';
import racialModifiers from '../../config/racialModifiers.json';
import { EncryptionService } from '../../services/encryption.service';
import { SetView } from '../view/view.actions';

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

  constructor(private encryption: EncryptionService) {}

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

  @Action(SaveCharacter)
  saveCharacter(ctx: StateContext<PlayerStateModel>, { character }: SaveCharacter) {
    const encryptedCharacter = this.encryption.encrypt(character);
    console.log(encryptedCharacter);
  }

  @Action(LoadCharacter)
  loadCharacter(ctx: StateContext<PlayerStateModel>, { character }: LoadCharacter) {
    ctx.setState({
      ...ctx.getState(),
      ...this.setPlayerFromCharacterCreation(character)
    });
    ctx.dispatch(new SetView('combat'));
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