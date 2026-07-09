'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function addProperties(state, extraData) {
  const stateCopy = { ...state };

  Object.assign(stateCopy, extraData);

  return stateCopy;
}

function removeProperties(state, keysToRemove) {
  const stateCopy = { ...state };

  for (let i = 0; i < keysToRemove.length; i++) {
    delete stateCopy[keysToRemove[i]];
  }

  return stateCopy;
}

function clear(state, massive) {
  return {};
}

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = addProperties(currentState, action.extraData);
        break;
      case 'removeProperties':
        currentState = removeProperties(currentState, action.keysToRemove);
        break;
      case 'clear':
        currentState = clear(currentState);
        break;
    }
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
