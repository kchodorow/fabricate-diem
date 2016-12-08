java_library(
    name = "project",
    srcs = [
        "Anchor.java",
        "GsonFactory.java",
        "Model.java",
        "Piece.java",
        "Project.java",
        "RandomName.java",
        "Vector2.java",
    ],
    deps = [
        "@auto_value_gson//:processor",
        "@com_google_appengine_java//:api",
        "@com_google_gson//jar",
        "@com_google_objectify//jar",
        "@guava//jar",
        "@jsr305//jar",
    ],
    visibility = [
        "//src/main/java/com/fabdm:__subpackages__",
        "//src/test/java/com/fabdm:__subpackages__",
    ],
)

java_library(
    name = "servlet",
    srcs = ["NewProjectServlet.java"],
    deps = [
        ":project",
        "//src/main/java/com/fabdm/account",
        "//src/main/java/com/fabdm/template",
        "@com_google_appengine_java//:user",
        "@com_google_objectify//jar",
        "@guava//jar",
        "@javax_servlet_api//jar",
    ],
    visibility = ["//src/main/java:__pkg__"],
)
