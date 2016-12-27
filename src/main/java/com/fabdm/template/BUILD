java_library(
    name = "template",
    srcs = glob(["*.java"]),
    visibility = ["//src/main/java/com/fabdm:__subpackages__"],
    deps = [
        "//src/main/java/com/fabdm/account",
        "//webapp/templates:java-template",
        "@com_google_appengine_java//:user",
        "@guava//:guava",
        "@guice//:guice",
        "@javax_servlet_api//jar",
        "@soy//:soy",
    ],
)
