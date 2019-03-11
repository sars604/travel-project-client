import React, { Component, Fragment } from 'react'
import Alert from 'react-bootstrap/Alert'
import messages from '../../messages'
import { createPlace } from '../../api'
import { Link, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

class PlaceCreate extends Component {
  constructor () {
    super()

    this.state = {
      name: '',
      date: '',
      city: '',
      country: '',
      comments: '',
      createdPlaceId: null,
      message: null
    }
  }
  onCreatePlace = event => {
    event.preventDefault()

    const { city, country } = this.state
    if (city.length === 0 || country.length === 0) {
      return this.setState({ message: 'Please fill out City and Country fields.' })
    }

    const { alert, user, history } = this.props

    createPlace(this.state, user)
      .then(response => this.setState({ createdPlaceId: response.data.place.id }))
      .then(() => alert(messages.createPlaceSuccess, 'success'))
      .catch(error => {
        console.error(error)
        this.setState({ name: '', date: '', city: '', country: '', comments: '' })
        alert(messages.createPlaceFailure, 'danger')
      })
      .finally(() => {
        history.push(`/places/${this.state.createdPlaceId}`)
      })
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    this.setState(updatedField)
  }

  render () {
    const { message } = this.state
    const place = this.state

    const { handleChange, onCreatePlace } = this
    return (
      <Fragment>
        { message && <Alert dismissible variant="success">{message}</Alert> }
        <h3 className="create-quote">Log a Place</h3>
        <form onSubmit={onCreatePlace}>
          <label>City:&nbsp;</label>
          <input placeholder='City' name="city" onChange={handleChange} value={place.city} type='text' /><br />
          <label>Country:&nbsp;</label>
          <input placeholder='Country' name="country" onChange={handleChange} value={place.country} type='text' /><br />
          <label>Date Visited:&nbsp;</label>
          <input placeholder='Date' type="date" name="date" onChange={handleChange} value={place.date} /><br />
          <label>Your Name:&nbsp;</label>
          <input placeholder='Your Name' type="text" name="name" onChange={handleChange} value={place.name} /><br />
          <label>Comments:&nbsp;</label>
          <input placeholder='Comments' type="text" name="comments" onChange={handleChange} value={place.comments} /><br />
          <Link to='/places'><Button variant="primary">Back</Button></Link>
          <Button variant="primary" type="submit">Submit</Button>
        </form>
      </Fragment>
    )
  }
}

export default withRouter(PlaceCreate)
