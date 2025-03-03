import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetView } from './view.actions';

export interface ViewStateModel {
    currentView: string;
}

@State<ViewStateModel>({
    name: 'view',
    defaults: {
        currentView: 'main'
    }
})
@Injectable()
export class ViewState {
    @Action(SetView)
    setView(ctx: StateContext<ViewStateModel>, action: SetView): void {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            currentView: action.payload
        });
    }

    @Selector()
    static getState(state: ViewStateModel): ViewStateModel {
        return state;
    }
}