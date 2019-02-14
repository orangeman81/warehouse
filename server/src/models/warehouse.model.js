// warehouse-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const warehouse = new Schema({
    assigneeId: { type: String, required: false },
    name: { type: String, required: true },
    producer: { type: String, required: true },
    serial: { type: String, required: true },
    type: { type: String, required: true },
    note: { type: String, required: false },
    assignmentDate: { type: Number, required: false },
    conditions: { type: String, required: false },
    deleted: { type: Boolean, required: false }
  }, {
      timestamps: true
    });

  return mongooseClient.model('warehouse', warehouse);
};
