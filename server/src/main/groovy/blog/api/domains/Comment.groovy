package blog.api.domains

import blog.api.deserializer.LocalDateTimeDeserializer
import blog.api.utils.Constants
import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import groovy.transform.CompileStatic

import javax.validation.constraints.NotNull
import java.time.LocalDateTime
import java.time.ZoneOffset

@CompileStatic
//@JsonDeserialize(using = CommentDeserializer)
class Comment {

	String postPath

	@NotNull
	String name

	String email

	@NotNull
	String message

	@JsonFormat(pattern = Constants.DateTimeFormat.yyyy_MM_dd_T_HH_mm_ss_SSS)
	@JsonDeserialize(using = LocalDateTimeDeserializer)
	LocalDateTime date = LocalDateTime.now(ZoneOffset.UTC)

//	@JsonInclude
//	List<Comment> replies = []

	Comment parent

}
