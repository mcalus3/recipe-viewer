import React, { useEffect, useReducer } from 'react';
import style from './style';
import getRecipes from '../../utils/getRecipes.js';
import {
  reducer,
  initialState,
  actions,
  queryStates
} from '../../utils/stateManagement.js';
import SearchBar from '../SearchBar';
import RecipesList from '../RecipesList';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.queryState === queryStates.pending) {
      dispatch({
        type: actions.setQueryState,
        payload: queryStates.inProgress
      });

      getRecipes(state.query)
        .then(data => {
          dispatch({
            type: actions.setQueryState,
            payload: queryStates.succesful
          });
          dispatch({ type: actions.setRecipes, payload: data });
        })
        .catch(error => {
          dispatch({ type: actions.setQueryState, payload: queryStates.error });
        });
    }
  }, [state.queryState]);
  return (
    <div>
      <h2 className={style.title}>Welcome to recipe viewer!</h2>
      <SearchBar
        ingredients={state.query.ingredients}
        queryState={state.queryState}
        dispatch={dispatch}
      />
      <RecipesList
        recipes={state.recipes}
        page={state.query.page}
        dispatch={dispatch}
      />
    </div>
  );
};

export default App;
