export function reducer(state, action) {
  switch (action.type) {
    case actions.setIngeredients:
      return {
        ...state,
        queryState: queryStates.pending,
        query: { ...state.query, ingredients: action.payload }
      };

    case actions.setPage:
      return {
        ...state,
        queryState: queryStates.pending,
        query: { ...state.query, page: action.payload }
      };

    case actions.addIngeredient:
      return {
        ...state,
        queryState: queryStates.pending,
        query: { ...state.query, ingredients: [...ingredients, action.payload] }
      };

    case actions.setRecipes:
      return { ...state, recipes: action.payload };

    case actions.setQueryState:
      return { ...state, queryState: action.payload };
  }
  return state;
}

export const actions = {
  setIngeredients: 'SET_INGREDIENTS',
  setPage: 'SET_PAGE',
  addIngeredient: 'ADD_INGREDIENT',
  setRecipes: 'SET_RECIPES',
  setQueryState: 'SET_QUERY_STATE'
};

export const queryStates = {
  succesful: 'QUERY_SUCCESSFUL',
  pending: 'QUERY_PENDING',
  inProgress: 'QUERY_IN_PROGRESS',
  error: 'QUERY_ERROR'
};

export const initialState = {
  query: {
    ingredients: ['garlic', 'onion'],
    page: 1
  },
  queryState: queryStates.pending,
  recipes: [
    {
      title: '',
      href: '',
      ingredients: [''],
      thumbnailUrl: ''
    }
  ]
};
