const {TweetRepository, HashtagRepository} = require('../repository/index');

class TweetService {
    constructor() {
        this.tweetRepository = TweetRepository;
        this.hashtagRepository = HashtagRepository;
    }

    async create(data) {
        const content = data.content || '';
        const rawTags = content.match(/#[a-zA-Z0-9_]+/g) || [];
        const tags = rawTags.map(tag => tag.substring(1).toLowerCase());
        const tweet = await this.tweetRepository.create(data);
        if (tags.length === 0) {
            return tweet;
        }
        const alreadyPresentHashtags = await this.hashtagRepository.findByName(tags);
        const titleOfPresentTags = alreadyPresentHashtags.map(hashtag => hashtag.title);
        const newHashtags = tags.filter(tag => !titleOfPresentTags.includes(tag)).map(tag => ({ title: tag, tweets: [tweet.id] }));
        if (newHashtags.length > 0) {
            await this.hashtagRepository.bulkCreate(newHashtags);
        }
        for (const tag of alreadyPresentHashtags) {
            tag.tweets.push(tweet.id);
            await tag.save();
        }

        return tweet;
    }
}

module.exports = TweetService;
