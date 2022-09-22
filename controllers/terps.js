export const getTerps = async (req, res) => {
    try {
        const terps = await Terp.find();
        res.status(200).json(terps);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}