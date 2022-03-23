import React, { useReducer, createContext, useContext } from 'react';

const initialPosts = [];

function postReducer(state, action) {
  switch (action.type) {
    case 'SAVE': {
      return state.concat(action.posts);
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const PostStateContext = createContext();
const PostDispatchContext = createContext();

export default function PostProvider({ children }) {
  const [state, dispatch] = useReducer(postReducer, initialPosts);
  return (
    <PostStateContext.Provider value={state}>
      <PostDispatchContext.Provider value={dispatch}>
        {children}
      </PostDispatchContext.Provider>
    </PostStateContext.Provider>
  );
}

export function usePostState() {
  const context = useContext(PostStateContext);
  if (!context) {
    throw new Error('Cannot find PostStateContext');
  }
  return context;
}

export function usePostDispatch() {
  const context = useContext(PostDispatchContext);
  if (!context) {
    throw new Error('Cannot find PostDispatchContext');
  }
  return context;
}
