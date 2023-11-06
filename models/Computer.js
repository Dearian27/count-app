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
          id: { type: String, default: null },
          type: { type: String, default: String }
        }
      ],
      default: [
        { id: null, type: 'case'},
        { id: null, type: 'gpu'},
        { id: null, type: 'cpu'},
        { id: null, type: 'motherboard'},
        { id: null, type: 'monitor'},
        { id: null, type: 'ram'},
        { id: null, type: 'disk'},
        { id: null, type: 'keyboard'},
        { id: null, type: 'mouse'},
        { id: null, type: 'power_supply'},
      ],
      _id: false,
    },
    history: {
      type: [
        {
          date: Date,
          componentType: String,
          _id: String,
          name: String,
          oldId: {
            type: String,
            default: '',
          },
          oldName: {
            type: String,
            default: '',
          }
        }
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