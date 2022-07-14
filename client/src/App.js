import './App.css';
import {Route} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Container from './components/Container/Container';
import Create from './components/Create/Create';
import DetailRecipe from './components/DetailRecipe/DetailRecipe';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing}/>
      <Route path="/home" component={Container}/>
      <Route path="/create" component={Create}/>
      <Route path="/detail/:id" component={DetailRecipe}/>
    </div>
  );
}

export default App;
