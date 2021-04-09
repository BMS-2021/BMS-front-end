/* eslint-disable @typescript-eslint/indent */
import React, { createContext, useContext } from 'react';
import { useImmerReducer, Reducer } from 'use-immer';

export type userStateType = {
  username: string | null;
};

export type userActionType =
  | {
      type: 'login';
      username: string | null;
    }
  | {
      type: 'logout';
    };

export type userReducerType = Reducer<userStateType, userActionType>;

export type dispatcherType = {
  state: userStateType;
  dispatch?: React.Dispatch<userActionType>;
};

const initialState: userStateType = {
  username: null,
};

const stateReducer: userReducerType = (draft, action) => {
  switch (action.type) {
    case 'login':
      draft.username = action.username;
      break;
    case 'logout':
      draft.username = null;
      break;
    default:
      throw 'unknow action!';
  }
};

export const Context = createContext<dispatcherType>({ state: initialState });

export const getUserStateContext = (): dispatcherType => useContext(Context);

const UserState: React.FC = ({ children }: { children: React.ReactNode }) => {
  const [state, reducer] = useImmerReducer(stateReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch: reducer }}>
      {children}
    </Context.Provider>
  );
};

export default UserState;
