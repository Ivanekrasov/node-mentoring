const mongoose = require(mongoose);

mongoose.set('useFindAndModify', false);
mongoose.set('findOneAndUpdate', false);

module.exports = mongoose;
