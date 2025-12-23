import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import CameraTest from './pages/CameraTest';
import { Helmet } from 'react-helmet';

import './App.css';

const App=()=>{
  return(
    <>
    <Helmet>
      <title>Camera Test App | Browser Camera Check</title>
        <meta
          name="description"
          content="Run a quick browser camera test to check permissions and live preview. Start, stop, and retry camera access directly in your browser."
        />
    </Helmet>
    <div className='app-container'>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/camera-test" component={CameraTest} />
        </Switch>
      </Router>

    </div>   
    </>
  )
}
export default App;

