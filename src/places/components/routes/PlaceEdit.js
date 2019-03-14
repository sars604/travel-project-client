import React, { Component, Fragment } from 'react'
import Alert from 'react-bootstrap/Alert'
import messages from '../../messages'
import { editPlace, getPlace } from '../../api'
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
      favorite: '',
      createdPlaceId: null,
      message: null
    }
  }

  componentDidMount () {
    const { user, match } = this.props
    getPlace(user, match)
      .then(response => this.setState({ name: response.data.place.name,
        date: response.data.place.date,
        city: response.data.place.city,
        country: response.data.place.country,
        comments: response.data.place.comments,
        favorite: response.data.place.favorite
      }))
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
        <div className='single-place'>
          { message && <Alert dismissible variant="success">{message}</Alert> }
          <h3 className="create-quote">Update a Place</h3>
          <form onSubmit={onEditPlace}>
            <div className='form-group'>
              <label>City:&nbsp;</label>
              <input className='form-control' placeholder='City' name="city" onChange={handleChange} value={place.city} type='text' />
            </div>
            <div className='form-group'>
              <label>Country:&nbsp;</label>
              <input className='form-control' placeholder='Country' name="country" onChange={handleChange} value={place.country} type='text' />
            </div>
            <div className='form-group'>
              <label>Date Visited:&nbsp;</label>
              <input className='form-control' placeholder='Date' type="date" name="date" onChange={handleChange} value={place.date} />
            </div>
            <div className='form-group'>
              <label>Your Name:&nbsp;</label>
              <input className='form-control' placeholder='Your Name' type="text" name="name" onChange={handleChange} value={place.name} />
            </div>
            <div className='form-group'>
              <label>Comments:&nbsp;</label>
              <textarea className='form-control' placeholder='Comments' type="text" name="comments" onChange={handleChange} value={place.comments} />
            </div>
            <Button variant="primary" type="submit">Submit</Button>
            <Link to='/places'><Button variant="primary">Back</Button></Link>
          </form>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(PlaceEdit)
