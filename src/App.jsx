import logo from "./logo.svg";
import "./App.css";
import Modelspage from "./Modelspage";
import Loginpage from "./Loginpage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
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
import ModelRequestedTable from "./ModelRequestedTable";
import ClientRequestModelTable from "./ClientRequestModelTable";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Modelspage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminregister" element={<RolesAdd />} />
          <Route path="/hrpage" element={<Header />} />
          <Route path="/assignrole" element={<AssignRole />} />
          <Route path="/jobpost" element={<JobPost />} />
          <Route path="/viewapplicants" element={<Applicants />} />
          <Route path="/main" element={<Headermain />} />
          <Route path="/modelpath" element={<Loginmain />} />
          <Route path="/form" element={<CategoryForm />} />
          <Route path="/paymentinfo" element={<Success />} />
          <Route path="/uploadbrand" element={<Uploadbrand />} />
          <Route path="/viewar" element={<Viewar />} />
          <Route path="/edit" element={<Editproducts />} />
          <Route path="/generateqr" element={<GenerateQrcode />} />
          <Route path="/uploadbulk" element={<Uploadbulk />} />
          <Route path="/uploadrepo" element={<Repoupload />} />
          <Route path="/repodisplay" element={<Repodisplay />} />
          <Route path="/luxeadmin" element={<Luxeadmin />} />
          <Route path="/uploadclient" element={<Uploadclient />} />
          <Route path="/assignmodeler" element={<Modelerasignpage />} />
          <Route path="/modeluploadclient" element={<Uploadclientmodel />} />
          <Route path="/modeluploadquleep" element={<Uploadquleepmodels />} />
          <Route path="/viewmodel" element={<Viewarclient />} />
          <Route path="/managequleep" element={<Modelerassignquleep />} />
          <Route path="/uploadquleep" element={<Uploadquleep />} />
          <Route path="/modelrequesttable" element={<ModelRequestedTable/>}/>
          <Route path="/clientrequesttable" element={<ClientRequestModelTable/>}/>
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
