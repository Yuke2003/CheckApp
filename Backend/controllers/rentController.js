const Rent = require("./../models/rentModel");
const Apperror = require("./../utils/errorHandler");
const APIFeatures = require("./../utils/apiFeatures");

//create rent

exports.createRent = async (req, res, next) => {
  try {
    const createDetails = await Rent.create(req.body);


    res.status(200).json({
      status: "success",
      data:{
        createDetails,
      },
    });
  } catch (err) {
    console.log(err.message);
    next(err.message);
  }
};

exports.TopRents = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-regularPrice";
  // req.query.fields = "name,address";
  next();
};

exports.findAllRents = async (req, res, next) => {
  try {
    //EXECUTE QUERY
    const features = new APIFeatures(Rent.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const rents = await features.query;

    res.status(200).json({
      status: "success",
      results: rents.length,
      data: rents,
    });
  } catch (err) {
    console.log(err.message);
    next(err.message);
  }
};

exports.getOneRent = async (req, res, next) => {
  try {
    const getOne = await Rent.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: getOne,
    });
  } catch (err) {
    console.log(err.message);
    next(err.message);
  }
};

exports.updateRent = async (req, res, next) => {
  const Rentplace = await Rent.findById(req.params.id);

  if (!Rentplace) {
    return next(Apperror(404, "place not found"));
  }

  try {
    const updatedRent = await Rent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: updatedRent,
    });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

exports.deleteRent = async (req, res, next) => {
  // const Rentplace = await Rent.findById(req.params.id);

  // if (!Rentplace) {
  //   return next(Apperror(404, "place not found"));
  // }

  try {
    await Rent.findByIdAndDelete(req.params.id);
    res.status(200).json("your rent is deleted");
  } catch (err) {
    Apperror(400, err.message);
  }
};
