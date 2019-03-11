import React, { Component, Fragment } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Link, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { getPlace } from '../../api'

class Place extends Component {
  constructor () {
    super()

    this.state = {
      place: null,
      favorite: false
    }
  }

  componentDidMount () {
    event.preventDefault()

    const { user, match } = this.props

    getPlace(user, match)
      .then(response => this.setState({ place: response.data.place }))
      .catch(console.error)
  }

  render () {
    const { place } = this.state
    if (!place) {
      return <ProgressBar striped variant="primary" animated now={60} />
    }
    return (
      <Fragment>
        <div className='single-place'>
          <h3>{place.city}, {place.country}</h3>
          <h5>{place.date}</h5>
          <p>{place.comments}</p>
          <Button onClick={this.toggleFavorite}>
            {this.state.favorite ? 'Not my Favorite' : 'Favorite!'}
          </Button>
          <Link to='/places'><Button>Back</Button></Link>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Place)
