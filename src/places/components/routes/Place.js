import React, { Component, Fragment } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Link, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { getPlace, deletePlace, favoritePlace } from '../../api'
import messages from '../../messages'

class Place extends Component {
  constructor () {
    super()

    this.state = {
      name: '',
      date: '',
      city: '',
      country: '',
      comments: '',
      favorite: ''
    }
  }

  onDeletePlace = event => {
    const { user, alert, history } = this.props
    deletePlace(user, this.props.match.params.id)
      .then(() => alert(messages.deletePlaceSuccess, 'success'))
      .catch(error => {
        console.error(error)
        this.setState({ name: '', city: '', country: '', comments: '', date: '', favorite: '' })
        alert(messages.deletePlaceFailure, 'danger')
      })
      .finally(() => history.push('/places'))
  }

  onFavoritePlace = event => {
    const { user, match } = this.props
    const { id } = match.params
    this.setState(() => {
      favoritePlace(!this.state.favorite, user, id)
        .then(response => this.setState({ favorite: response.data.place.favorite }))
    })
  }

  componentDidMount () {
    event.preventDefault()

    const { user, match } = this.props

    getPlace(user, match)
      .then(response => this.setState({
        name: response.data.place.name,
        date: response.data.place.date,
        city: response.data.place.city,
        country: response.data.place.country,
        comments: response.data.place.comments,
        favorite: response.data.place.favorite
      }))
      // this.setState({ place: response.data.place })
      .catch(console.error)
  }

  render () {
    const { name, date, city, country, comments, favorite } = this.state
    const { flag } = require('country-emoji')

    if (!name) {
      return <ProgressBar striped variant="primary" animated now={60} />
    }
    return (
      <Fragment>
        <div className='single-place'>
          <h3>{city}, {country} {flag(country)} {favorite ? '❤️' : ''}</h3>
          <h5>{date}</h5>
          <p>{comments}</p>
          <Button onClick={this.onFavoritePlace}>
            {this.state.favorite ? 'Like, not Love' : 'Loved it!'}
          </Button>
          <Link to='/places'><Button>Back</Button></Link>
          <Link to={`/places/${this.props.match.params.id}/edit`}><Button>Edit</Button></Link>
          <Button onClick={this.onDeletePlace}>Delete</Button>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Place)
