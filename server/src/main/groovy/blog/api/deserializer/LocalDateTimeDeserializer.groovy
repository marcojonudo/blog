package blog.api.deserializer

import blog.api.utils.Constants
import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonDeserializer
import com.fasterxml.jackson.databind.node.TextNode
import groovy.transform.CompileStatic

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@CompileStatic
class LocalDateTimeDeserializer extends JsonDeserializer<LocalDateTime> {

	@Override
	LocalDateTime deserialize(JsonParser parser, DeserializationContext deserializationContext)
			throws IOException, JsonProcessingException {
		TextNode node = (TextNode) parser.getCodec().readTree(parser)
		return LocalDateTime.parse(
			node.asText(), DateTimeFormatter.ofPattern(Constants.DateTimeFormat.yyyy_MM_dd_T_HH_mm_ss_SSS_Z)
		)
	}

}
