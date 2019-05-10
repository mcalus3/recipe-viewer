import React from 'react';
import style from './style';
import {
  reducer,
  initialState,
  actions,
  queryStates
} from '../../utils/stateMamagement.js';

const SearchBar = ({ ingredients, queryState, dispatch }) => {
  const ingredientsInput = React.createRef();
  function handleSubmit() {
    dispatch({
      type: actions.setIngeredients,
      payload: splitIngredients(ingredientsInput.current.value)
    });
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter ingredients delimited by comma:</label>
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
