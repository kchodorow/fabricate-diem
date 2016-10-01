java_library(
    name = "diem",
    srcs = [
        "MainServlet.java",
        "UserServlet.java"
    ],
    visibility = ["//src/main/java:__pkg__"],
    deps = [
        "//src/main/java/com/kchodorow/diem/account",
        "//src/main/java/com/kchodorow/diem/template",
        "//webapp/templates:main",
        "@com_google_appengine_java//:user",
        "@guava//jar",
        "@guice//jar",
        "@javax_servlet_api//jar",
        "@soy//jar",
    ],
)