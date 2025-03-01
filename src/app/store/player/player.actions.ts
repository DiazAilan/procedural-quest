import { PlayerStateModel } from "./player.state";

export enum Constellation {
  Aries = 'Aries',
  Taurus = 'Taurus',
  Gemini = 'Gemini',
  Cancer = 'Cancer',
  Leo = 'Leo',
  Virgo = 'Virgo',
  Libra = 'Libra',
  Scorpio = 'Scorpio',
  Sagittarius = 'Sagittarius',
  Capricorn = 'Capricorn',
  Aquarius = 'Aquarius',
  Pisces = 'Pisces'
}

export interface CharacterCreation {
  [x: string]: any;
  name: string;
  race: 'Human' | 'Orc' | 'Elf';
  class: 'Fighter' | 'Thief' | 'Mage';
  constellation: Constellation;
}


export class CreateCharacter {
  static readonly type = '[Player] Create Character';

  constructor(public character: CharacterCreation) {}
}

export class LoadCharacter {
  static readonly type = '[Player] Load Character';

  constructor(public character: PlayerStateModel) {}
}

export class SaveCharacter {
  static readonly type = '[Player] Save Character';

  constructor(public character: PlayerStateModel) {}
}
