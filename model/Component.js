import mongoose from 'mongoose';

const componentSchema = mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['case', 'gpu', 'cpu', 'motherboard', 'monitor', 'ram']
  },
},
{timestamps: true}
)

export const Component = mongoose.model('Component', componentSchema);