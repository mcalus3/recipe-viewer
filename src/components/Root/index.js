import React, { useEffect, useReducer } from 'react';
import style from './style';
import getRecipes from '../../utils/getRecipes.js';
import {
  reducer,
  initialState,
  actions,
  queryStates
} from '../../utils/stateMamagement.js';

const App = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //test
  useEffect(() => {
    dispatch({ type: actions.setIngeredients, payload: ['onion', 'garlic'] });
    dispatch({ type: actions.setQueryState, payload: queryStates.pending });
    setTimeout(() => {
      dispatch({
        type: actions.setIngeredients,
        payload: ['potato', 'garlic']
      });
      dispatch({ type: actions.setQueryState, payload: queryStates.pending });
    }, 2000);
  }, []);
  //

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
      {state.recipes.map(recipe => (
        <p key={recipe.title}>{recipe.title}</p>
      ))}
    </div>
  );
};

export default App;
