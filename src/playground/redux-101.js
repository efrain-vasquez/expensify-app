import { createStore } from 'redux';

// Action generators - functions that return action objects

//we need the default empty object beacuse if we had situations where we didnt
//pass anything into incrementCount (like we do at the bottom) we would be trying to 
//access a property on an object and than object is actually undefined and accessing a 
//property on an undefined object will throw an error to fix that we are going to use the default
//empty object we set up here the same goes for decrementCount.

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const setCount = ({ count }) => ({
  type: 'SET',
  count
});

const resetCount = () => ({
  type: 'RESET',
});


//Actions describe the fact that smething happened, 
//but don't specify how the application's state changes in response.
//This is the job os reducers.
//this function below is called a reducer:
//we get our action but the action alone doesnt do anything its the reducer that 
//determines what to do based off of an action (how do we want to change the state)

//Reducers
//Reducers are pure functions which have certain qualities:
//first the output is only determined by the input: 
//what it returns will only be determined by the things that get passed in
//by the state and the action it doesnt use anything else from outside the function scope
//and doesnt change anything from outside the function scope either:
//does not interact with anything outside of its scope 
//other functions or even affecting other vaiables outside of the reducers scope
//our reducers need to compute the new state using (only) the old state and the actions

//number 2 reducers never mutate or change the state or actions
//never reassign a value to state or action only read off of both of those things
//meaning using the input to only return an object that represents the new state
//instead of changing or mutating the state directly simply return the state on the new object instead

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      };
    case 'SET':
      return {
        count: action.count
      };
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  }
};


// const store = createStore((state = { count: 0 }, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return {
//         count: state.count + action.incrementBy
//       };
//     case 'DECREMENT':
//       return {
//         count: state.count - action.decrementBy
//       };
//     case 'SET':
//       return {
//         count: action.count
//       };
//     case 'RESET':
//       return {
//         count: 0
//       };
//     default:
//       return state;
//   }
// });

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 5 }))

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: -100 }));
