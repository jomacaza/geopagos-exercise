import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import StepFormContainer from './containers/stepFormContainer';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StepFormContainer />
      </Provider>
    );
  }
}

export default App;
