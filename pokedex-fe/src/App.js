import './App.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

//components
import { NavbarComponent } from './components/NavbarComponent';
import { DetailsComponent } from './components/DetailsComponent';

function App() {
  const [view, setView] = useState(isBrowser ? "browser" : "mobile")

  return (
    <div className='App'> 
    <BrowserView className='browser-wrapper'>
      <BrowserRouter>
        <div className='browser-navbar'>
          <NavbarComponent view={view}/>
        </div>
        <div className='browser-details'>
          <Switch>
            <Route exact path='/:id'> 
                <DetailsComponent view={view}/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </BrowserView>
    <MobileView className='mobile-wrapper'>
      <BrowserRouter>
        <Switch>
          <Route exact path ="/">
            <div className='mobile-navbar'>
              <NavbarComponent view={view}/>
            </div>
          </Route>
          <Route exact path='/:id'> 
            <div className='mobile-details'>
              <DetailsComponent view={view}/>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </MobileView>
    </div>
  );
}

export default App;
