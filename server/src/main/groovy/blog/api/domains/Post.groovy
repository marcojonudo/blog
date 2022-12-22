package blog.api.domains

import blog.api.utils.Constants
import com.fasterxml.jackson.annotation.JsonFormat

import javax.validation.constraints.NotNull
import java.time.LocalDateTime

class Post {

	@NotNull
	String title

	@NotNull
	String author

	@NotNull
	String content

	@JsonFormat(pattern = Constants.DateTimeFormat.yyyy_MM_dd_HH_mm_ss, timezone = Constants.SPAIN_TIMEZONE)
	LocalDateTime date

	String headerImage
	String logo
	String color
	String path

}
