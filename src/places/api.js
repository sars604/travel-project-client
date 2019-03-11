import apiUrl from '../apiConfig'
import axios from 'axios'

export const getPlaces = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/places',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const getPlace = (user, match) => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/places/${match.params.id}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const createPlace = (place, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/places',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      place: {
        name: place.name,
        date: place.date,
        city: place.city,
        country: place.country,
        comments: place.comments,
        favorite: false
      }
    }
  })
}