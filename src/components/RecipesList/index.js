import React, { useEffect, useReducer } from 'react';
import style from './style';
import { actions } from '../../utils/stateManagement.js';
import RecipeCard from './RecipeCard.js';
import { createStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const styles = theme =>
  createStyles({
    status: {
      color: 'Gray',
      fontSize: '12px'
    }
  });

const RecipesList = ({ recipes, page, dispatch }) => {
  return recipes.length === 0 ? (
    <div className={style.root}>No recipes found 😓</div>
  ) : (
    <div className={style.root}>
      Here are your recipes 👇
      <List>
        {recipes.map((recipe, index) => (
          <>
            <Divider />
            <RecipeCard
              recipe={recipe}
              dispatch={dispatch}
              index={index + 1}
              key={recipe.title + index}
            />
          </>
        ))}
        <Divider />
      </List>
      Page: {page}{' '}
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

export default withStyles(styles)(RecipesList);
