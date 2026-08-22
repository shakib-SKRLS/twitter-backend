const { LikeRepository, TweetRepository } = require("../repository/index");

class LikeService {
    constructor() {
        this.likeRepository = LikeRepository;
        this.tweetRepository = TweetRepository;
    }

    async toggleLike(modelId, modelType, userId) {
        let likeable;

        if (modelType === "Tweet") {
            likeable = await this.tweetRepository.get(modelId);
        } else if (modelType === "Comment") {
            throw new Error("Comment likes are not supported yet");
        } else {
            throw new Error(`Unsupported model type: ${modelType}`);
        }

        if (!likeable) {
            throw new Error(`${modelType} not found`);
        }

        const existingLike = await this.likeRepository.findByUserIdAndLikeable({
            likeable: modelId,
            onModel: modelType,
            user: userId
        });

        let isAdded;
        if (existingLike) {
            likeable.likes.pull(existingLike._id);
            await likeable.save();
            await this.likeRepository.destroy(existingLike._id);
            isAdded = false;
        } else {
            const newLike = await this.likeRepository.create({
                likeable: modelId,
                onModel: modelType,
                user: userId
            });
            likeable.likes.push(newLike._id);
            await likeable.save();
            isAdded = true;
        }

        return isAdded;
    }
}
module.exports = LikeService;