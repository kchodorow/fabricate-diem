java_library(
    name = "editor",
    srcs = ["EditorServlet.java"],
    visibility = ["//src/main/java:__pkg__"],
    deps = [
        ":model",
        "//src/main/java/com/fabdm/account",
        "//src/main/java/com/fabdm/project",
        "//src/main/java/com/fabdm/template",
        "@com_google_appengine_java//:user",
        "@com_google_objectify//jar",
        "@guava//jar",
        "@javax_servlet_api//jar",
    ],
)

java_library(
    name = "model",
    srcs = ["Model.java"],
    visibility = ["//src/main/java/com/fabdm:__subpackages__"],
)
