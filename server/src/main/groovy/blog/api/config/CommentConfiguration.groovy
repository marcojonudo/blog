package blog.api.config;

import io.micronaut.context.annotation.ConfigurationProperties
import io.micronaut.core.annotation.NonNull
import io.micronaut.core.naming.Named

@ConfigurationProperties("db.config.comment")
interface CommentConfiguration extends Named {

    @NonNull
    String getCollection()

}
