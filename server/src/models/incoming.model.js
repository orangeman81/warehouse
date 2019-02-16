// incoming-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const incoming = new Schema({
    description: { type: String, required: true },
    sender: { type: String, required: false },
    recipient: { type: String, required: false },
    serial: { type: String, required: false },
    user: { type: String, required: false },
    checkInDate: { type: String, required: true },
    cheked: { type: Boolean, required: false },
  }, {
    timestamps: true
  });

  return mongooseClient.model('incoming', incoming);
};
