import {createStore} from 'redux';

function reducer() {
    return "state";
}

export const store = createStore(reducer);