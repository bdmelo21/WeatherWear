const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const closetSchema = new Schema (
  {
    closetData:[
      {
        name: String
      },
     {
      type: ['top', 'bottom'],
      required: true
    },
   {
      typeOf: ['t-shit','long-sleeve','shirt','top','sweater','hoodie','coat','dress','jeans','shorts','skirt','sweatpants','leggings'],
      required: true
    },
    {
      fit:['slim','oversize','cropped', 'fitted'],
      required: true
    },
   {
      color: [''],
      required: true,
    },
    { name: Pattern,
      type: Boolean,
      required: true
    },
    {
      imageUrl: String
    }

  ]}, 
  {
    timestamps: true
   }
)

module.exports = model('Closet', closetSchema);