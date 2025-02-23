import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ResumeGame } from './game.actions';

export interface GameStateModel {
  active: boolean;
}

@State<GameStateModel>({
  name: 'game',
  defaults: {
    active: false
  }
})
@Injectable()
export class ViewState {
  @Action(ResumeGame)
  setView(ctx: StateContext<GameStateModel>) {
      const state = ctx.getState();
      ctx.setState({
          ...state,
          active: true
      });
  }

  @Selector()
  static getState(state: GameStateModel) {
      return state;
  }
}