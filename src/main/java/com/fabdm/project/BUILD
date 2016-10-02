java_library(
    name = "project",
    srcs = [
        "Project.java",
        "RandomName.java",
    ],
    deps = [
        "@com_google_appengine_java//:api",
        "@com_google_objectify//jar",
        "@guava//jar",
    ],
    visibility = [
        "//src/main/java/com/fabdm:__subpackages__"
    ],
)

java_library(
    name = "servlet",
    srcs = ["NewProjectServlet.java"],
    deps = [
        ":project",
        "//src/main/java/com/fabdm/account",        
        "@com_google_appengine_java//:user",
        "@com_google_objectify//jar",
        "@guava//jar",
        "@javax_servlet_api//jar",
    ],
    visibility = ["//src/main/java:__pkg__"],
)
