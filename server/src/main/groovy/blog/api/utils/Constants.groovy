package blog.api.utils

import groovy.transform.CompileStatic

@CompileStatic
class Constants {

    static final String SPAIN_TIMEZONE = "Europe/Madrid"

    static class DateTimeFormat {

        static final String yyyy_MM_dd_HH_mm_ss = "yyyy-MM-dd HH:mm:ss"
        static final String yyyy_MM_dd_T_HH_mm_ss_SSS = "yyyy-MM-dd'T'HH:mm:ss.SSS"
        static final String yyyy_MM_dd_T_HH_mm_ss_SSS_Z = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"

    }

}
