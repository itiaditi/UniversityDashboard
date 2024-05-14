const mongoose = require("mongoose");

const subjects = mongoose.Schema({
    name : String,
	streams : { type: mongoose.Schema.Types.ObjectId, ref: 'streams'}
},{
    versionKey:false
})

const SubjectModel = mongoose.model('subjects',subjects);

module.exports={
    SubjectModel
}