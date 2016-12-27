java_library(
    name = "servlet",
    srcs = ["EditorServlet.java"],
    visibility = ["//src/main/java:__pkg__"],
    deps = [
        ":editor",
        "//src/main/java/com/fabdm/account",
        "//src/main/java/com/fabdm/editor/pdf:servlet",
        "//src/main/java/com/fabdm/project",
        "//src/main/java/com/fabdm/template",
        "@com_google_appengine_java//:user",
        "@com_google_gson//jar",
        "@com_google_objectify//jar",
        "@guava//:guava",
        "@javax_servlet_api//jar",
    ],
)

java_library(
    name = "editor",
    srcs = ["ProjectLoader.java"],
    visibility = ["//src/main/java/com/fabdm/editor/pdf:__pkg__"],
    deps = [
        "//src/main/java/com/fabdm/account",
        "//src/main/java/com/fabdm/project",
        "@com_google_objectify//jar",
        "@guava//:guava",
        "@javax_servlet_api//jar",
    ],
)
