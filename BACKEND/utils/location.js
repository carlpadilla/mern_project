const axios = require('axios')
require('dotenv').config()

const HttpError = require('../models/http-error')


const getCoordsForAdress = async(address) =>{
   const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.API_KEY}`)

   const data = response.data

   if(!data || data.status === 'ZERO_RESULTS'){
       const error = new HttpError('Could not find address', 422)
       throw error
   }
   const coordinates = data.results[0].geometry.location

   return coordinates
}

module.exports = getCoordsForAdress