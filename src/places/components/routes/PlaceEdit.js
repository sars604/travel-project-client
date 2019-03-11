import React, { Component, Fragment } from 'react'
import Alert from 'react-bootstrap/Alert'
import messages from '../../messages'
import { editPlace } from '../../api'
import { Link, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

class PlaceEdit extends Component {
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
  onEditPlace = event => {
    event.preventDefault()

    const { alert, user, match, history } = this.props
    const { id } = match.params

    editPlace(this.state, user, id)
      .then(() => alert(messages.editPlaceSuccess, 'success'))
      .catch(error => {
        console.error(error)
        this.setState({ name: '', date: '', city: '', country: '', comments: '' })
        alert(messages.editPlaceFailure, 'danger')
      })
      .finally(() => {
        history.push(`/places/${id}`)
      })
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    this.setState(updatedField)
  }

  render () {
    const { message } = this.state
    const place = this.state
    const { handleChange, onEditPlace } = this
    return (
      <Fragment>
        { message && <Alert dismissible variant="success">{message}</Alert> }
        <h3 className="create-quote">Update a Place</h3>
        <form onSubmit={onEditPlace}>
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

export default withRouter(PlaceEdit)
