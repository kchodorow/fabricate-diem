java_library(
    name = "fabdm",
    srcs = [
        "MainServlet.java",
        "StartupRegistrar.java",
        "UserServlet.java",
    ],
    visibility = ["//src/main/java:__pkg__"],
    deps = [
        "//src/main/java/com/fabdm/account",
        "//src/main/java/com/fabdm/project",
        "//src/main/java/com/fabdm/template",
        "@com_google_objectify//jar",
        "@guava//:guava",
        "@javax_servlet_api//jar",
    ],
)
