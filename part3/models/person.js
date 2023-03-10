const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

numberValidator = {
  validator: v => /^\d{2,3}-\d+$/.test(v),
  msg: 'Phone Number is invalid',
}

const personSchema = new mongoose.Schema({
  name: {
    type:String,
    minLength: 3,
    required: true
  },
  number: {
    type:String,
    validate : numberValidator,
    minLength: 8,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)