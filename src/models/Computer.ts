import mongoose from "mongoose";

const compSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  components: {
    type: [
      {
        id: [String],
        type: { type: String },
      },
    ],
    default: [
      { id: [], type: "case" },
      { id: [], type: "gpu" },
      { id: [], type: "cpu" },
      { id: [], type: "motherboard" },
      { id: [], type: "monitor" },
      { id: [], type: "ram" },
      { id: [], type: "disk" },
      { id: [], type: "keyboard" },
      { id: [], type: "mouse" },
      { id: [], type: "power_supply" },
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
          default: "",
        },
        oldName: {
          type: String,
          default: "",
        },
      },
    ],
    default: [],
  },
  location: {
    type: String,
    default: "",
  },
  responsible: {
    type: String,
    default: "",
  },
  notes: {
    type: String,
    default: "",
  },
});

export const Computer = mongoose.model("Computer", compSchema);
