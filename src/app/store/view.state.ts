import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';

export class SetView {
    static readonly type = '[View] Set';
    constructor(public payload: string) {}
}

export interface ViewStateModel {
    currentView: string;
}

@State<ViewStateModel>({
    name: 'view',
    defaults: {
        currentView: 'main' // Default view
    }
})
@Injectable()
export class ViewState {
    @Action(SetView)
    setView(ctx: StateContext<ViewStateModel>, action: SetView) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            currentView: action.payload
        });
    }

    @Selector()
    static getState(state: ViewStateModel) {
        return state;
    }
}