// warehouse-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const warehouse = new Schema({
    name: { type: String, required: true },
    producer: { type: String, required: true },
    type: { type: String, required: true },
    conditions: { type: String, required: false },
    deleted: { type: Boolean, required: false },
    assigneeId: { type: String, required: false },
    assignmentDate: { type: Number, required: false },
    checkInDate: { type: Number, required: false },
    description: { type: String, required: false },
    serial: { type: String, required: true },
    sender: { type: String, required: false },
    consignee: { type: String, required: false },
    user: { type: String, required: true }
  }, {
      timestamps: true
    });

  return mongooseClient.model('warehouse', warehouse);
};