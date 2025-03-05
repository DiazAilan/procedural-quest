export enum AttackType {
  Melee = 'Melee',
  Ranged = 'Ranged',
  Magic = 'Magic'
}

export interface AttackAction {
  source: string;
  target: string;
  attackType: AttackType;
}

export class Attack {
  static readonly type = '[Combat] Attack';
  constructor(public target: string) {}
}

export class AddEnemies {
  static readonly type = '[Combat] Add Enemies';
  constructor(public count: number) {}
}
