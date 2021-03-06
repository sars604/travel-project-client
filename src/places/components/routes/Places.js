import React, { Component, Fragment } from 'react'
import { getPlaces } from '../../api'
import { Link } from 'react-router-dom'

class Places extends Component {
  constructor () {
    super()

    this.state = {
      places: null
    }
  }

  componentDidMount () {
    event.preventDefault()

    const { user } = this.props

    getPlaces(user)

      .then(response => this.setState({ places: response.data.places }))
      .catch(console.error)
  }

  render () {
    const { flag } = require('../../../.././src/emoji/lib.js')
    if (!this.state.places) {
      return <div className='places-box'>
        <p>Loading...</p>
      </div>
    }

    if (this.state.places.length < 1) {
      return <div className='places-box'>
        <h3>No places logged, <Link to='/place-create'>add one now!</Link></h3>
      </div>
    }

    return (
      <Fragment>
        <div className='places-box'>
          <h2>Where have you been?</h2>
          {this.state.places.map(place => (
            <Link key={place.id} to={`/places/${place.id}`}>
              <div className='place' >
                <h5>{place.city}, {place.country} {flag(place.country)} {place.favorite ? '💛' : ''} </h5>
              </div>
            </Link>
          ))}
        </div>
      </Fragment>
    )
  }
}

export default Places
