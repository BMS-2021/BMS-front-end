import React, { createContext, useContext } from 'react';
import { useImmerReducer, Reducer } from 'use-immer';

export type userStateType = {
  username: string | null;
  password: string | null;
};

export type userActionType =
  | {
      type: 'login';
      username: string | null;
      password?: string | null;
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
  password: null,
};

const stateReducer: userReducerType = (draft, action) => {
  switch (action.type) {
    case 'login':
      draft.username = action.username;
      draft.password = action.password;
      break;
    case 'logout':
      draft.username = draft.password = null;
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
