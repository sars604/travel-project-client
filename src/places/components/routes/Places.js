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
    if (!this.state.places) {
      return <p>loading...</p>
    }
    return (
      <Fragment>
        <h2>Where have you been?</h2>
        {this.state.places.map(place => (
          <Link key={place.id} to={`/places/${place.id}`}>
            <div className='place' >
              <h5>{place.city}, {place.country}</h5>
            </div>
          </Link>
        ))}
      </Fragment>
    )
  }
}

export default Places
