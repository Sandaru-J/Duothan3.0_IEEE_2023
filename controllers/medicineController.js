import Medicine from '../models/Medicine.js';

const createMedicine = async (req, res) => {
    const { name, description, price, stock } = req.body;
    const medicine = new Medicine({
        name,
        description,
        price,
        stock
    });
    await medicine.save();
    res.json({
        message: 'Medicine created successfully',
        medicine
    });
}