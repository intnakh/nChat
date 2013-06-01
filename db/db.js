
var mongoose = require("mongoose");
 
// 스키마
var Ride = new  mongoose.Schema({
    title:String,
    rider:String,
    ridingDate: Date,
    keywords: String
});
 
// 모델
var RideModel = mongoose.model('Ride', Ride);
 
// 데이타베이스에 접속한다
mongoose.connect("mongodb://lamp:lamp@ds027628.mongolab.com:27628/intnakh");
 
// RESTful API callback functions
exports.readAll = function (req, res) {
    return RideModel.find(function (err, rides) {
        if (!err) {
            return res.send(rides);
        } else {
            return console.log(err);
        }
    });
};

exports.createRider = function(req, res) {
  var ride = new RideModel({
        title:'1',
        rider:'rider1',
        ridingDate: new Date(),
        keywords: 'keyword'
    });
 
    ride.save(function (err) {
        if (!err) {
            return console.log('created');
        } else {
            return console.log(err);
        }
    });
    return res.send(ride);
};

exports.create = function (req, res) {
    var ride = new RideModel({
        title:req.body.title,
        rider:req.body.rider,
        ridingDate:req.body.ridingDate,
        keywords: req.body.keywords
    });
 
    ride.save(function (err) {
        if (!err) {
            return console.log('created');
        } else {
            return console.log(err);
        }
    });
    return res.send(ride);
};
 
exports.read = function(req, res){
    return RideModel.findById(req.params.id, function(err, ride){
        if(!err){
            return res.send(ride);
        } else {
            return console.log(err);
        }
    });
};
 
exports.update = function(req, res){
    console.log('Updating ride ' + req.body.title);
    return RideModel.findById(req.params.id, function(err, ride){
        ride.title = req.body.title;
        ride.rider = req.body.rider;
        ride.ridingDate = req.body.ridingDate;
        ride.keywords = req.body.keywords;
        return ride.save(function(err){
            if(!err){
                console.log('ride updated');
            } else {
                console.log(err);
            }
            return res.send(ride);
        });
    });
};
 
exports.delete = function(req, res){
    console.log('Deleting ride with id: ' + req.params.id);
    return RideModel.findById(req.params.id, function(err, ride){
        return ride.remove(function(err){
            if(!err){
                console.log('Ride removed');
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
};