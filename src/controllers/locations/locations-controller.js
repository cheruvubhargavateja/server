import Locations from "../../schemas/location.model.js";

//Add locations api
//path: http://localhost:4000/api/locations/add-location

export async function addLocation(req, res) {
  const { name, imageUrl, price, heading } = req.body;

  if (!name || !imageUrl || !price || !heading) {
    return res.status(400).json({
      message: "name, imageUrl, price and heading cannot be empty",
      success: false,
    });
  }

  const exists = await Locations.findOne({ name });

  if (exists) {
    return res.status(400).json({
      message: "Already added this location",
      success: false,
    });
  }

  const location = new Locations({
    name,
    imageUrl,
    price,
    heading,
  });

  try {
    await location.save();

    res.status(201).json({
      message: "Location added successfully",
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

//Get all locations api
//path: http://localhost:4000/api/locations
export async function getAllLocations(req, res) {
  try {
    const locations = await Locations.find();

    res.status(200).json({
      message: "Locations fetched successfully",
      data: locations,
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

//Get a location by name api
//path: http://localhost:4000/api/locations/:locationName
export async function getLocationById(req, res) {
  const locationName = req.params.locationName;
  try {
    const location = await Locations.findOne({ name: locationName });

    res.status(200).json({
      message: "Location fetched successfully",
      data: location,
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
