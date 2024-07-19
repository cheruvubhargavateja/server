import Bookings from "../../schemas/bookings.model.js";

//Add locations api
//path: http://localhost:4000/api/bookings

export async function addBooking(req, res) {
  const {
    name,
    note,
    price,
    phoneNo,
    totalDays,
    passengers,
    startDate,
    location,
    user,
  } = req.body;

  if (
    !name ||
    !phoneNo ||
    !price ||
    !totalDays ||
    !passengers ||
    !startDate ||
    !location ||
    !user
  ) {
    return res.status(400).json({
      message:
        "name, phoneNo, price, totalDays, passengers, startDate, location and user cannot be empty",
      success: false,
    });
  }

  const tour = new Bookings({
    name,
    price,
    phoneNo,
    passengers,
    totalDays,
    startDate,
    note,
    location,
    user,
  });

  try {
    await tour.save();

    res.status(201).json({
      message: "Your tour has booked!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Intrnal server error",
      error: error.message,
      success: false,
    });
  }
}

//Get all bookings of a user
//path: http://localhost:4000/api/bookings/:userId
export async function getBookingsByUserId(req, res) {
  try {
    const bookings = await Bookings.find({ user: req.params.userId }).populate("location");

    res.status(200).json({
      message: "bookings fetched successfully",
      data: bookings,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Intrnal server error",
      error: error.message,
      success: false,
    });
  }
}
