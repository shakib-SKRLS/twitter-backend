const CommentRepository = require('../repository/comment-repository');
const TweetRepository = require('../repository/tweet-repository');
class CommentService {
    constructor() {
        this.commentRepository = CommentRepository;
        this.tweetRepository =  TweetRepository;
    }

    async create(modelId, modelType, userId, content) {
        if(modelType == 'Tweet'){
            var commentable = await this.tweetRepository.find(modelId);
        }else if(modelType == 'Comment'){
            var commentable = await this.commentRepository.find(modelId);
        } else{
            throw new Error('Unknown model type');
        }

        const comment = await this.commentRepository.create({
           content: content,
           userId: userId,
           onModel: modelType,
           commentableId: modelId,
           comments: [],
            
        });
       commentable.comments.push(comment);
       await commentable.save();
       return comment;
    }

}

module.exports = CommentService;