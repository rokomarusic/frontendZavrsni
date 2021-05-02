import Igraci from './components/igraci';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from './components/navbar.component'
import IgracStranica from './components/igracStranica'
import Drzave from './components/Drzave'

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar/>
      <br/>
      <Route path="/admin/igraci" exact component={Igraci} />
      <Route path="/admin/drzave" exact component={Drzave} />
      <Route path="/admin/igrac/:id" component={IgracStranica} />
      </div>
    </Router>
  );
}

export default App;
