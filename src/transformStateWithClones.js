'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (let i = 0; i < keysToRemove.length; i++) {
    delete state[keysToRemove[i]];
  }
}

function clear(state, massive) {
  for (const key in state) {
    delete state[key];
  }
}

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(currentState, action.extraData);
        stateHistory.push({ ...currentState });
        break;
      case 'removeProperties':
        removeProperties(currentState, action.keysToRemove);
        stateHistory.push({ ...currentState });
        break;
      case 'clear':
        clear(currentState);
        stateHistory.push({ ...currentState });
        break;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
