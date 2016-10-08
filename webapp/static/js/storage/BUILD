load(
    "@io_bazel_rules_closure//closure:defs.bzl",
    "closure_js_library",
)

closure_js_library(
    name = "storage",
    srcs = ["pattern.js"],
    visibility = ["//webapp/static/js:__pkg__"],
    deps = ["@io_bazel_rules_closure//closure/library"],
)
