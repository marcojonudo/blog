package blog.api.controllers

import blog.api.domains.Post
import blog.api.repository.PostRepository
import groovy.transform.CompileStatic
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable
import jakarta.inject.Inject
import org.reactivestreams.Publisher

@Controller("/posts")
@CompileStatic
class PostController {

	@Inject PostRepository postRepository

	@Get
	Publisher<Post> findPosts() {
		return postRepository.findAll()
    }

	@Get("/{path}")
	Publisher<Post> findPost(@PathVariable String path) {
		return postRepository.find(path)
    }

}
