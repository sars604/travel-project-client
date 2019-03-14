import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import Places from './places/components/routes/Places'
import Place from './places/components/routes/Place'
import PlaceCreate from './places/components/routes/PlaceCreate'
import PlaceEdit from './places/components/routes/PlaceEdit'
import Home from './Home'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type, fade: false }] })
    setTimeout(() => {
      this.setState(prevState => ({
        alerts: prevState.alerts.map(alert => ({
          message: alert.message,
          type: alert.type,
          fade: true
        }))
      }))
    }, 1000)
    setTimeout(() => {
      this.setState(prevState => ({ alerts: prevState.alerts.slice(1) }))
    }, 2000)
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert className={alert.fade ? 'fade-out' : ''} key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <div className='main-body'>
            <Route path='/sign-up' render={() => (
              <SignUp alert={this.alert} setUser={this.setUser} />
            )} />
            <Route path='/sign-in' render={() => (
              <SignIn alert={this.alert} setUser={this.setUser} />
            )} />
            <AuthenticatedRoute user={user} path='/sign-out' render={() => (
              <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/change-password' render={() => (
              <ChangePassword alert={this.alert} user={user} />
            )} />
            <Route exact path='/' component={Home} />
            <AuthenticatedRoute user={user} exact path='/places' render={() => (
              <Places alert={this.alert} user={user} />
            )} />
            <AuthenticatedRoute user={user} exact path='/places/:id' render={({ match }) => (
              <Place alert={this.alert} match={match} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/place-create' render={() => (
              <PlaceCreate alert={this.alert} user={user} />
            )} />
            <AuthenticatedRoute user={user} exact path='/places/:id/edit' render={({ match }) => (
              <PlaceEdit alert={this.alert} match={match} user={user} />
            )} />
          </div>
        </main>
      </React.Fragment>
    )
  }
}

export default App
