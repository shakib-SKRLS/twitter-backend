const LikeService = require('../services/like-service.js');

const likeService = new LikeService();

const toggleLike = async (req, res) => {
    try {
        const { modelId, modelType } = req.params;
        const userId = req.user.id;
       const result = await likeService.toggleLike(userId, modelId, modelType);
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