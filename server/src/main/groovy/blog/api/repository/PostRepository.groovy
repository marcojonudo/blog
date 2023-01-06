package blog.api.repository

import blog.api.config.PostConfiguration
import blog.api.domains.Post
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Projections
import com.mongodb.reactivestreams.client.MongoClient
import com.mongodb.reactivestreams.client.MongoCollection
import jakarta.inject.Inject
import jakarta.inject.Singleton
import org.bson.conversions.Bson
import org.reactivestreams.Publisher

@Singleton
class PostRepository {

    @Inject PostConfiguration postConfig
    @Inject MongoClient mongoClient

    Publisher<Post> findAll() {
        Bson projection = Projections.fields(
            Projections.include("title"),
            Projections.include("author"),
            Projections.include("date"),
            Projections.include("logo"),
            Projections.include("path")
        )
        return getCollection().find().projection(projection)
    }

    Publisher<Post> find(String path) {
        return getCollection().find(Filters.eq("path", path)).first()
    }

    private MongoCollection<Post> getCollection() {
        return mongoClient.getDatabase(postConfig.name).getCollection(postConfig.collection, Post)
    }

}
