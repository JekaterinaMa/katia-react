//import useFetch from "./useFetch";
import ProductList from './ProductList';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from './HomePage';
import NavBar from './NavBar';
import View from "./view";


function App() {
  
  return (
    <Router>
      <div>  
        <NavBar />          
          <div>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/addpurchase">
                <ProductList />
              </Route>
              <Route path="/view">
               <View />
              </Route>
            </Switch>
          </div>
      </div>
    </Router>
  );
}

export default App;
