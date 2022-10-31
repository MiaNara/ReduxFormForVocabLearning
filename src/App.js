import logo from './logo.svg';
import './App.css';
import VocabForm from'./components/VocabForm'
import store from './index';
import {Provider} from 'react-redux';
function App() {
  return (
    <div>
      <Provider store={store}>
      <VocabForm></VocabForm>
      </Provider>
    </div>
  );
}

export default App;
