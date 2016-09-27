java_library(
    name = "diem",
    srcs = ["MainServlet.java"],
    visibility = ["//src/main/java:__pkg__"],
    deps = [
        "//src/main/java/com/kchodorow/diem/user:account",
        "//webapp/templates:main",
        "@com_google_appengine_java//:user",
        "@guava//jar",
        "@guice//jar",
        "@javax_servlet_api//jar",
        "@soy//jar",
    ],
)