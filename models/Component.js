import mongoose from 'mongoose';

const componentSchema = mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['case', 'gpu', 'cpu', 'motherboard', 'monitor', 'ram']
  },
  anchor: {
    type: String,
    default: ""
    }
},
{timestamps: true}
)

export const Component = mongoose.model('Component', componentSchema);