import logo from "./logo.svg";
import "./App.css";
import Modelspage from "./Modelspage";
import Loginpage from "./Loginpage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import Upload from "./Upload";
import Login from "./Login";
import RolesAdd from "./RolesAdd";
import Header from "./Header";
import AssignRole from "./AssignRole";
import Headermain from "./Headermain";
import Loginmain from "./Loginmain";
import JobPost from "./JobPost";
import Applicants from "./Applicants";

import CategoryForm from "./CategoryForm";
import Success from "./Success";
import Uploadbrand from "./Uploadbrand";
import Viewar from "./Viewar";
import Editproducts from "./Editproducts";
import GenerateQrcode from "./GenerateQrcode";
import Uploadbulk from "./Uploadbulk";
import Repoupload from "./Repoupload";
import Repodisplay from "./Repodisplay";
import Test from "./Test";
import Luxeadmin from "./Luxeadmin";
import Uploadclient from "./Uploadclient";
import Modelerasignpage from "./Modelerasignpage";
import Uploadclientmodel from "./Uploadclientmodel";
import Viewarclient from "./Viewarclient";
import Modelerassignquleep from "./Modelerassignquleep";
import Uploadquleep from "./Uploadquleep";
import Uploadquleepmodels from "./Uploadquleepmodels";


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
          <Route path="/jobpost" component={JobPost} />
          <Route path="/viewapplicants" component={Applicants} />

          <Route path="/main" component={Headermain} />
          <Route path="/modelpath" component={Loginmain} />
          <Route path="/form" component={CategoryForm} />
          <Route path="/paymentinfo" component={Success} />
          <Route path="/uploadbrand" component={Uploadbrand} />
          <Route path="/viewar" component={Viewar} />
          <Route path="/edit" component={Editproducts} />
          <Route path="/generateqr" component={GenerateQrcode} />
          <Route path="/uploadbulk" component={Uploadbulk} />
          <Route path="/uploadrepo" component={Repoupload} />
          <Route path="/repodisplay" component={Repodisplay} />
          <Route path="/luxeadmin" component={Luxeadmin} />
          <Route path="/uploadclient" component={Uploadclient} />
          <Route path="/assignmodeler" component={Modelerasignpage} />
          <Route path="/modeluploadclient" component={Uploadclientmodel} />
          <Route path="/modeluploadquleep" component={Uploadquleepmodels} />

          <Route path="/viewmodel" component={Viewarclient} />
          <Route path="/managequleep" component={Modelerassignquleep} />
          <Route path="/uploadquleep" component={Uploadquleep} />

          <Route path="/test" component={Test} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
