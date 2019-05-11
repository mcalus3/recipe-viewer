import React, { useEffect, useReducer } from 'react';
import style from './style';
import { actions } from '../../utils/stateManagement.js';
import RecipeCard from './RecipeCard.js';

const RecipesList = ({ recipes, page, dispatch }) => {
  return recipes.length === 0 ? (
    <div className={style.root}>No recipes found 😓</div>
  ) : (
    <div className={style.root}>
      Here are your recipes 👇
      <div className={style.recipesList}>
        {recipes.map((recipe, index) => (
          <RecipeCard
            recipe={recipe}
            dispatch={dispatch}
            index={index + 1}
            key={recipe.title + index}
          />
        ))}
      </div>
      Page: {page}
      {page !== 1 ? (
        <a
          href="#"
          onClick={event => {
            event.preventDefault();
            dispatch({
              type: actions.setPage,
              payload: page - 1
            });
          }}
        >
          Previous
        </a>
      ) : null}{' '}
      <a
        href="#"
        onClick={event => {
          event.preventDefault();
          dispatch({
            type: actions.setPage,
            payload: page + 1
          });
        }}
      >
        Next
      </a>
    </div>
  );
};

export default RecipesList;
