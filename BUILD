load("@io_bazel_rules_appengine//appengine:appengine.bzl", "appengine_war")

appengine_war(
    name = "diem",
    data = ["//webapp"],
    data_path = "/webapp",
    jars = ["//src/main/java:bundle_deploy.jar"],
)
