const sellerService = require('../service/seller');

const getTenProducts = async (_req, res) => {
    try {
        const result = await sellerService.getTenProducts();

        if (!result) return res.status(404).json({ message: 'Not found' });

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);

        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await sellerService.getProductById(id);

        if (!response) return res.status(404).json({ message: 'Expired or invalid token' });

        return res.status(200).json(response);
    } catch (error) {
        console.error(error);

        return res.status(500).json({ message: 'Internal server error' });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Não tenho certeza quanto a forma em que o status vai chegar
    await sellerService.update(id, status);
    return res.status(200).json({ message: 'updated!' });
  };

module.exports = {
    getTenProducts,
    getProductById,
    update,
};