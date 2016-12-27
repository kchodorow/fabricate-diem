java_library(
    name = "account",
    srcs = [
        "Account.java",
        "AccountStorage.java",
    ],
    visibility = ["//src/main/java/com/fabdm:__subpackages__"],
    deps = [
        "//src/main/java/com/fabdm/project",
        "@com_google_appengine_java//:user",
        "@com_google_objectify//jar",
        "@guava//:guava",
        "@jsr305//:jsr305",
        "@soy//:soy",
    ],
)

java_library(
    name = "servlet",
    srcs = ["SetUsernameServlet.java"],
    visibility = ["//src/main/java:__pkg__"],
    deps = [
        ":account",
        "//src/main/java/com/fabdm/template",
        "@com_google_appengine_java//:user",
        "@com_google_objectify//jar",
        "@guava//:guava",
        "@javax_servlet_api//jar",
        "@jsr305//:jsr305",
    ],
)
