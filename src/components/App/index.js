import React, { useEffect, useReducer } from 'react';
import style from './style';
import getRecipes from '../../utils/getRecipes.js';
import withThemeProvider from './ThemeProvider.js';
import {
  reducer,
  initialState,
  actions,
  queryStates
} from '../../utils/stateManagement.js';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import {
  withStyles,
  createStyles,
  Theme,
  WithStyles
} from '@material-ui/core/styles';
import SearchBar from '../SearchBar';
import RecipesList from '../RecipesList';

const styles = theme =>
  createStyles({
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    },
    paper: {
      margin: '20px auto',
      padding: '5px',
      maxWidth: '400px'
    },
    wrapper: {
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      flexDirection: 'column'
    },
    header: {
      textAlign: 'center'
    }
  });

const App = ({ classes }) => {
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
    <div className={classes.wrapper}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            recipe-viewer
          </Typography>
        </Toolbar>
      </AppBar>

      <Paper className={classes.paper}>
        <h2 className={classes.header}>Welcome to recipe viewer!</h2>
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
      </Paper>
    </div>
  );
};

export default withThemeProvider(withStyles(styles)(App));
