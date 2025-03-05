export interface BaseCharacter {
  name: string;
  health: number;
  energy: number;
  strength: number;
  dexterity: number;
  intelligence: number;
}

export interface PlayerCharacter extends BaseCharacter {
  level: number;
  experience: number;
  race: 'Human' | 'Orc' | 'Elf';
  class: 'Fighter' | 'Thief' | 'Mage';
  constellation: string;
}

export interface EnemyCharacter extends BaseCharacter {
  // Add enemy-specific properties here if needed
} 