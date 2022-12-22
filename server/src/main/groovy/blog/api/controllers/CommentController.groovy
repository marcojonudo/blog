package blog.api.controllers

import blog.api.domains.Comment
import blog.api.repository.CommentRepository
import groovy.transform.CompileStatic
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.*
import jakarta.inject.Inject
import org.reactivestreams.Publisher
import reactor.core.publisher.Mono

@Controller("/comments")
@CompileStatic
class CommentController {

	@Inject CommentRepository commentRepository

	@Get("/{postPath}")
	Publisher<Comment> getComments(@PathVariable String postPath) {
		return commentRepository.findAll(postPath)
    }

	@Post
	Mono<HttpResponse> saveComment(@Body Comment comment) {
		commentRepository.save(comment)
//		comment.parent ? commentRepository.add(comment) : commentRepository.save(comment)
		return Mono.just(HttpResponse.created(comment)) as Mono<HttpResponse>
    }

}
