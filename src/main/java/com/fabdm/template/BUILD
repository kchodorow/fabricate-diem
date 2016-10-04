java_library(
    name = "template",
    srcs = glob(["*.java"]),
    deps = [
        "//src/main/java/com/fabdm/account",
        "//webapp/templates:java-template",
        "@com_google_appengine_java//:user",
        "@guava//jar",
        "@guice//jar",
        "@javax_servlet_api//jar",
        "@soy//jar",
    ],
    visibility = ["//src/main/java/com/fabdm:__subpackages__"],
)
