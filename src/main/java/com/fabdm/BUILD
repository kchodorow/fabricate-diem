java_library(
    name = "fabdm",
    srcs = [
        "MainServlet.java",
        "UserServlet.java",
        "StartupRegistrar.java",
    ],
    visibility = ["//src/main/java:__pkg__"],
    deps = [
        "//src/main/java/com/fabdm/account",
        "//src/main/java/com/fabdm/project", 
        "//src/main/java/com/fabdm/template",
        "@com_google_objectify//jar",
        "@guava//jar",
        "@javax_servlet_api//jar",
    ],
)