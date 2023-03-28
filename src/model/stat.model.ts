import mongoose from "mongoose";

export interface StatDocument extends mongoose.Document {
  idUser: string;
  date: string;
  bedtime: string;
  waketime: string;
  total_sleep_time: string;
  sleep_cycles: {
    cycle_number: number;
    start_time: string;
    end_time: string;
    duration: string;
    sleep_stage: string;
  }[];
  sleep_score: number;
}

const StatSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    bedtime: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    waketime: {
      type: String,
      required: true,
    },
    total_sleep_time: {
      type: String,
      require: true,
    },
    sleep_cycles: [
      {
        cycle_number: {
          type: Number,
          require: true,
        },
        start_time: {
          type: String,
          require: true,
        },
        end_time: {
          type: String,
          require: true,
        },
        duration: {
          type: String,
          require: true,
        },
        sleep_stage: {
          type: String,
          require: true,
        },
      },
    ],
    sleep_score: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const StatModel = mongoose.model<StatDocument>("Stat", StatSchema);

export default StatModel;
