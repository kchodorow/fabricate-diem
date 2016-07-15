load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

closure_js_library(
    name = "cloth",
    srcs = ["workboard.js"],
    deps = [
        ":bezier",
        "//webapp/static/js:fabric",
        "//webapp/static/js:util",
    ],
    visibility = ["//webapp/static/js:__pkg__"],
)

closure_js_library(
    name = "bezier",
    srcs = [
        "anchor.js",
        "control_point.js",
        "edge.js",
    ],
    deps = [
        "//webapp/static/js:externs",
        "//webapp/static/js:fabric",
    ],
    visibility = ["//webapp/static/js/tools:__pkg__"],
)
