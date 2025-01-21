import {mongoose} from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: {
     type: String, 
     required: true 
    }, 
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
}, 
createdAt: {
  type: Date,
  default: Date.now, 
},
updatedAt: {
  type: Date,
  default: Date.now, 
}
});


export const Item = mongoose.model('Item', ItemSchema );


