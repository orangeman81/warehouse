// movements-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const movements = new Schema({
    assigneeId: { type: String, required: true },
    assignee: { type: String, required: true },
    productId: { type: String, required: true },
    product: { type: String, required: true },
    inOut: { type: Boolean, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('movements', movements);
};