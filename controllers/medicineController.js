import Medicine from '../models/Medicine.js';

const createMedicine = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  try {
    const medicine = new Medicine({
      name,
      description,
      price,
      quantity,
      pharmacyId: '63f6447282cfa72aeb467e20',
    });
    await medicine.save();
    res.json({
      message: 'Medicine created successfully',
      medicine,
    });
  } catch (error) {
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
  const { name, description, price, stock } = req.body;
  try {
    const medicine = await Medicine.findById(req.params.id);
    medicine.name = name;
    medicine.description = description;
    medicine.price = price;
    medicine.stock = stock;
    await medicine.save();
    return res.json({
      message: 'Medicine updated successfully',
      medicine,
    });
  } catch (error) {
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
