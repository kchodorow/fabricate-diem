load("@io_bazel_rules_appengine//appengine:appengine.bzl", "appengine_war")

appengine_war(
    name = "diem",
    data = [
        ":xml",
        "//webapp/static",
    ],
    data_path = "/webapp",
    jars = [":mylib"],
)

java_library(
    name = "mylib",
    srcs = glob(["src/main/java/com/kchodorow/diem/*.java"]),
    deps = [
        "@io_bazel_rules_appengine//appengine:javax.servlet.api",
    ],
)

filegroup(
    name = "xml",
    srcs = glob(["webapp/WEB-INF/*.xml"]),
)
