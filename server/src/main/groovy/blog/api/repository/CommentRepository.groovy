package blog.api.repository

import blog.api.config.CommentConfiguration
import blog.api.domains.Comment
import com.mongodb.client.model.Updates
import com.mongodb.reactivestreams.client.MongoClient
import com.mongodb.reactivestreams.client.MongoCollection
import jakarta.inject.Inject
import jakarta.inject.Singleton
import org.bson.Document
import org.reactivestreams.Publisher

@Singleton
class CommentRepository {

    @Inject CommentConfiguration commentConfig
    @Inject MongoClient mongoClient

    Publisher<Comment> findAll(String postPath) {
        Document query = new Document("postPath", postPath)
        return getCollection().find(query)
    }

    void save(Comment comment) {
        collection.insertOne(comment)
    }

    void add(Comment comment) {
        Document query = new Document(
            [postPath: comment.postPath, email: comment.parent.email, date: comment.parent.date]
        )
        collection.updateOne(query, Updates.push("replies", comment))
    }
    
    private MongoCollection<Comment> getCollection() {
        return mongoClient.getDatabase(commentConfig.name).getCollection(commentConfig.collection, Comment)
    }

}
