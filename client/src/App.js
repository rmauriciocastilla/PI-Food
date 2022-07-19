import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Container from './components/Container/Container';
import Create from './components/Create/Create';
import DetailRecipe from './components/DetailRecipe/DetailRecipe';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/home" component={Container}/>
        <Route path="/create" component={Create}/>
        <Route path="/detail/:id" component={DetailRecipe}/>
        <Route path="*">
          <Redirect to="/"/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
