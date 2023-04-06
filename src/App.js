import logo from './logo.svg';
import './App.css';
import Modelspage from './Modelspage';
import Loginpage from './Loginpage';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Upload from './Upload';
import Login from './Login';
import RolesAdd from './RolesAdd';
import Header from './Header';
import AssignRole from './AssignRole';
import Headermain from './Headermain';
import Loginmain from './Loginmain';

function App() {
  return (
    <div className="App">

<Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/admin" component={Modelspage} />
        <Route path="/upload" component={Upload} />
        <Route path="/login" component={Login} />
        <Route path="/adminregister" component={RolesAdd} />
        <Route path="/hrpage" component={Header} />
        <Route path="/assignrole" component={AssignRole} />
        <Route path="/main" component={Headermain} />
        <Route path="/modelpath" component={Loginmain} />








        
     
      </Switch>
    </Router>

     
     
    </div>
  );
}

export default App;
