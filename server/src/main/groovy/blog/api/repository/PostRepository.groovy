package blog.api.repository

import blog.api.config.PostConfiguration
import blog.api.domains.Post
import com.mongodb.reactivestreams.client.MongoClient
import com.mongodb.reactivestreams.client.MongoCollection
import jakarta.inject.Inject
import jakarta.inject.Singleton
import org.reactivestreams.Publisher

@Singleton
class PostRepository {

    @Inject PostConfiguration postConfig
    @Inject MongoClient mongoClient

    Publisher<Post> findAll() {
        return getCollection().find()
    }

    private MongoCollection<Post> getCollection() {
        return mongoClient.getDatabase(postConfig.name).getCollection(postConfig.collection, Post)
    }

}
