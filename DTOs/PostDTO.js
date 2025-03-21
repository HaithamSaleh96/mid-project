class PostDTO {
    constructor(post) {
        this.id = post._id;
        this.title = post.title;
        this.content = post.content;
        this.author = {
            id: post.author._id,
            name: post.author.name,
            email: post.author.email,
        };
        this.createdAt = post.createdAt;
        this.updatedAt = post.updatedAt;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            author: this.author,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}

module.exports = PostDTO;
