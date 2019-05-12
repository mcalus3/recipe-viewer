import React from 'react';
import style from './style';
import { actions } from '../../utils/stateManagement.js';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
    <ListItem className={style.RecipeCard}>
      <div className={style.column}>
        <img src={recipe.thumbnail} alt="image" className={style.image} />
      </div>
      <div className={style.column}>
        <a href={recipe.href}>{recipe.title}</a>
        <br />
        ingredients: {ingredients}
      </div>
    </ListItem>
  );
};

export default RecipeCard;
