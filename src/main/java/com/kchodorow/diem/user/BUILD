java_library(
    name = "user",
    srcs = ["AccountServlet.java"],
    visibility = ["//src/main/java:__pkg__"],
    deps = [
        ":account",
        "//src/main/java/com/kchodorow/diem/template",
        "//webapp/templates:user",
        "@com_google_objectify//jar",
        "@guice//jar",
        "@javax_servlet_api//jar",
        "@soy//jar",
    ],
)

java_library(
    name = "account",
    srcs = [
        "Account.java",
        "UserStorage.java",
    ],
    deps = [
        "@com_google_appengine_java//:user",
        "@com_google_objectify//jar",
        "@guava//jar",
        "@soy//jar",
    ],
    visibility = ["//src/main/java/com/kchodorow/diem:__subpackages__"],
)
