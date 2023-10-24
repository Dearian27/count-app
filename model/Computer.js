import mongoose from 'mongoose';

const compSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    components: {
      type: [{id: String, type: String}],
      default: []
    },
    history: {
      type: [{id: String, type: String, endData: Date}],
      default: []
      //TODO добавити старт експлуатації з посиланням на старий комп'ютер
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