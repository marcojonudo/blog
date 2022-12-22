package blog.api.deserializer

import blog.api.domains.Comment
import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import groovy.transform.CompileStatic

@CompileStatic
class CommentDeserializer extends StdDeserializer<Comment> {

	CommentDeserializer() {
		this(null)
	}

    CommentDeserializer(Class<Comment> clazz) {
		super(clazz)
	}

	@Override
	Comment deserialize(JsonParser parser, DeserializationContext deserializationContext)
			throws IOException, JsonProcessingException {
		JsonNode node = (JsonNode) parser.getCodec().readTree(parser)
		return null
	}

}
