import mongoose from 'mongoose';

const compSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    components: {
      type: [
        {
          _id: { type: String, default: null },
          type: { type: String, default: String }
        }
      ],
      default: [
        { _id: null, type: 'case'},
        { _id: null, type: 'gpu'},
        { _id: null, type: 'cpu'},
        { _id: null, type: 'motherboard'},
        { _id: null, type: 'monitor'},
        { _id: null, type: 'ram'},
      ]
    },
    history: {
      type: [
        [
          {id: String, message: String, name: String, type: String, endData: Date}
        ]
      ],
      default: []
    },
    location: {
      type: String,
      default: '',
    },
    responsible: {
      type: String,
      default: '',
    },
  }
)

export const Computer = mongoose.model('Computer', compSchema);