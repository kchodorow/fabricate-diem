load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

closure_js_library(
    name = "tools",
    srcs = glob(["*.js"]),
    deps = [
        "//webapp/static/js/cloth:bezier",
        "@io_bazel_rules_closure//closure/library",
    ],
    visibility = ["//webapp/static/js:__pkg__"],
)
