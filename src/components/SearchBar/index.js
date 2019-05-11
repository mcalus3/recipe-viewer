import React, { useEffect } from 'react';
import { actions } from '../../utils/stateManagement.js';
import style from './style';

const SearchBar = ({ ingredients, queryState, dispatch }) => {
  const ingredientsInput = React.createRef();
  function handleSubmit() {
    dispatch({
      type: actions.setIngeredients,
      payload: splitIngredients(ingredientsInput.current.value)
    });
    event.preventDefault();
  }

  useEffect(() => {
    if (ingredientsInput.current.value !== ingredients.join(', ')) {
      ingredientsInput.current.value = ingredients.join(', ');
    }
  });

  return (
    <form onSubmit={handleSubmit} className={style.root}>
      <label>Enter ingredients delimited by comma:</label>
      <br />
      <input
        defaultValue={ingredients.join(', ')}
        type="text"
        ref={ingredientsInput}
      />
      <br />
      <input type="submit" value="get recipes!" />
      <br />
      <label>query status: {queryState}</label>
    </form>
  );
};

function splitIngredients(ingredients) {
  return ingredients
    .split(',')
    .filter(i => i.trim() !== '')
    .map(i => i.trim());
}

export default SearchBar;
