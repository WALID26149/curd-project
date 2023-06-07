const User = require('../models/usersDB.js');
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js');
const factory = require('./../controllers/handlerFactory.js')

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
}

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      results:users.length,
      data: {
        users
      } 
    });
  });

  
  exports.updateMe = catchAsync(async(req, res, next) => {
    // create an err if user posts pass data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('tis route is not for password updates. please use /updateMyPassword', 400))
    }

    const filteredBody = filterObj(req.body, 'name', 'email');
    // update User document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        status: 'success',
        date: {
            user: updatedUser
        }
      });
  });

  exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  });

  exports.getUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };

  exports.createUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };

exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User)