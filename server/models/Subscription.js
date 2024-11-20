import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  email_list: {
    type: [String],
    default: [],
  },
});

export default mongoose.model("Subscription", SubscriptionSchema);
