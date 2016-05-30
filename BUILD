load("@io_bazel_rules_appengine//appengine:appengine.bzl", "appengine_war")

appengine_war(
   name = "diem",
   jars = [":mylib"],
   data = [
       ":xml",
       "//webapp/static:uncompiled",
       "//webapp/static:js",
   ],
   data_path = "/webapp",
)

java_library(
    name = "mylib",
    srcs = glob(["src/main/java/com/kchodorow/diem/*.java"]),
    deps = [
        "//external:appengine/java/api",
        "@io_bazel_rules_appengine//appengine:javax.servlet.api",
    ],
)

filegroup(
    name = "xml",
    srcs = glob(["webapp/WEB-INF/*.xml"]),
)
