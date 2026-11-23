const LikeService = require('../services/like-service.js');

const likeService = new LikeService();

const toggleLike = async (req, res) => {
    try {
        const { modelId, modelType } = req.body;
        if (!modelId || !modelType) {
            return res.status(400).json({ error: 'modelId and modelType are required' });
        }
        const userId = req.user.id;
       const result = await likeService.toggleLike(modelId, modelType, userId);
        res.status(200).json({ message: 'Like status updated successfully',
            data: result
         });
    } catch (error) {
        console.error('Error toggling like:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    toggleLike
};
