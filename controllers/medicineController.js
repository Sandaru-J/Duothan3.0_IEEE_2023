import Medicine from '../models/Medicine.js';

const createMedicine = async (req, res) => {
  const { name, price, quantity, ndc, supplier, expireDate, manufacturer } =
    req.body;
  try {
    if (
      !name ||
      !price ||
      !quantity ||
      !ndc ||
      !supplier ||
      !expireDate ||
      !manufacturer
    )
      return res.status(400).json({ message: 'Please fill all the fields' });
    const expireDateConverted = new Date(expireDate);
    const medicine = new Medicine({
      name,
      price,
      quantity,
      pharmacyId: '63f6447282cfa72aeb467e20',
      ndc,
      supplier,
      expireDate: expireDateConverted,
      manufacturer,
    });
    await medicine.save();
    res.json({
      message: 'Medicine created successfully',
      medicine,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong',
      error,
    });
  }
};

const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    return res.json({
      medicines,
    });
  } catch (error) {}
};

const getMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    return res.json({
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      error,
    });
  }
};

const updateMedicine = async (req, res) => {
  const {
    name,
    description,
    price,
    quantity,
    ndc,
    supplier,
    expireDate,
    manufacturer,
  } = req.body;
  try {
    const medicine = await Medicine.findById(req.params.id);
    medicine.name = name;
    medicine.description = description;
    medicine.price = price;
    medicine.quantity = quantity;
    medicine.ndc = ndc;
    medicine.supplier = supplier;
    medicine.expireDate = expireDate;
    medicine.manufacturer = manufacturer;

    await medicine.save();
    return res.json({
      message: 'Medicine updated successfully',
      medicine,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong',
      error,
    });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    await medicine.remove();
    return res.json({
      message: 'Medicine deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      error,
    });
  }
};

export {
  createMedicine,
  getMedicines,
  getMedicine,
  updateMedicine,
  deleteMedicine,
};
