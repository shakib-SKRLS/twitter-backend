const commentService = require('../services/comment-service');

const commentServiceInstance = new commentService();

const createComment = async (req, res) => {
    try {
        const { modelId, modelType, userId, content } = req.body;
        const comment = await commentServiceInstance.create(modelId, modelType, userId, content);
        res.status(201).json({
            message: 'Comment created successfully',
            comment: comment,
            success: true,
            error: null
        });
    } catch (error) {
        res.status(400).json({
            message: 'Failed to create comment',
            comment: null,
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    createComment
};