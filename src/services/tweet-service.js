const {TweetRepository, HashtagRepository} = require('../repository/index');
// const tweetRepository = require('../repository/tweet-repository');
// const hashtagRepository = require('../repository/hashtag-repository');

class TweetService {
    constructor() {
        this.tweetRepository = TweetRepository;
        this.hashtagRepository = HashtagRepository;
    }

    async create(data) {
        const content = data.content;
        const tags = content.match(/#[a-zA-Z0-9_]+/g);
        tags = tags.map(tag => tag.substring(1)).map(tag => tag.toLowerCase());
        console.log(tags);
        const tweet = await this.tweetRepository.create(data);
        const alreadyPresentHashtags = await this.hashtagRepository.findByName(tags);
        const titleOfPresentTags = alreadyPresentHashtags.map(hashtag => hashtag.title);
       const newHashtags = tags.filter(tag => !titleOfPresentTags.includes(tag)).map(tag => ({ title: tag, tweets: [tweet.id] }));
       const createdHashtags = await this.hashtagRepository.bulkCreate(newHashtags);
       alreadyPresentHashtags.forEach(tag => {
        tag.tweets.push(tweet.id);
        tag.save();

       });
       
       
        return tweet;
    }
}

module.exports = TweetService;