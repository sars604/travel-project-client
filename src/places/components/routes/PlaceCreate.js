import React, { Component, Fragment } from 'react'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import messages from '../../messages'
import { createPlace } from '../../api'
import { Link, withRouter } from 'react-router-dom'

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
        <div className='single-place'>
          { message && <Alert dismissible variant="success">{message}</Alert> }
          <h3 className="create-quote">Log a Place</h3>
          <form onSubmit={onCreatePlace}>
            <div className='form-group'>
              <label>City:&nbsp;</label>
              <input className='form-control' placeholder='London' name="city" onChange={handleChange} value={place.city} type='text' />
            </div>
            <div className='form-group'>
              <label>Country:&nbsp;</label>
              <input className='form-control' placeholder='England' name="country" onChange={handleChange} value={place.country} type='text' />
            </div>
            <div className='form-group'>
              <label>Date Visited:&nbsp;</label>
              <input className='form-control' placeholder='Date' type="date" name="date" onChange={handleChange} value={place.date} />
            </div>
            <div className='form-group'>
              <label>Your Name:&nbsp;</label>
              <input className='form-control' placeholder='Sarah' type="text" name="name" onChange={handleChange} value={place.name} />
            </div>
            <div className='form-group'>
              <label>Comments:&nbsp;</label>
              <textarea className='form-control' placeholder='Big Ben is big!' type="text" name="comments" onChange={handleChange} value={place.comments} />
            </div>
            <Button variant="primary" type="submit">Submit</Button>
            <Link to='/places'><Button variant="primary">Back</Button></Link>
          </form>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(PlaceCreate)
