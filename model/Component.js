import mongoose from 'mongoose';

const componentSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['case', 'gpu', 'cpu', 'motherboard', 'monitor', 'ram']
  },
},
{timestamps: true}
)

export default Component = mongoose.model('Component', componentSchema);