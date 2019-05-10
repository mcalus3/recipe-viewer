import React, { useEffect, useReducer } from 'react';
import style from './style';
import getRecipes from '../../utils/getRecipes.js';
import {
  reducer,
  initialState,
  actions,
  queryStates
} from '../../utils/stateMamagement.js';
import SearchBar from '../SearchBar';
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
    <div className={style.root}>
      <h2>Welcome to recipe viewer!</h2>
      <SearchBar
        ingredients={state.query.ingredients}
        queryState={state.queryState}
        dispatch={dispatch}
      />
      {state.recipes.map((recipe, index) => (
        <p key={recipe.title + index}>{recipe.title}</p>
      ))}
    </div>
  );
};

export default App;
