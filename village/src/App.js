import './less/app.less'
import { BrowserRouter, Route,Link,IndexRoute} from 'react-router-dom'
import React,{Component} from 'react'
import {render} from 'react-dom'
import Detail from './components/detail/ctrl'
import Home from './components/home'
 class App extends Component {
  constructor(d) {
    super(d);
  }
  render(){ 
    return (
      <div className='app'>
          {this.props.children || 'Welcome'}
        </div>
    )
  }
 } 

render(( 
  <BrowserRouter>
    <App>
      <Route exact path="/" component={Home} / >
      <Route path="/detail/:id" component={Detail} />
    </App>
  </BrowserRouter>
  ),document.querySelector('#app'))
 