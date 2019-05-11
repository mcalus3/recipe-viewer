import React from 'react';
import style from './style';
import { actions } from '../../utils/stateManagement.js';

const RecipeCard = ({ recipe, dispatch, index }) => {
  function handleRecipeClick(ingredient) {
    dispatch({ type: actions.addIngredient, payload: ingredient });
  }

  const ingredients = recipe.ingredients.map((i, index) => (
    <div key={i + index}>
      &bull;
      <a
        href="#"
        onClick={event => {
          event.preventDefault();
          handleRecipeClick(i);
        }}
      >
        {i}
      </a>
    </div>
  ));
  return (
    <div className={style.recipeCard}>
      <div className={style.column}>
        <img src={recipe.thumbnail} alt="image" className={style.image} />
      </div>
      <div className={style.column}>
        <a href={recipe.href}>{recipe.title}</a>
        <br />
        ingredients: {ingredients}
      </div>
    </div>
  );
};

export default RecipeCard;
