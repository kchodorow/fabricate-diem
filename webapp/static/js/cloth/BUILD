load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

closure_js_library(
    name = "cloth",
    srcs = ["workboard.js"],
    visibility = ["//webapp/static/js:__pkg__"],
    deps = [
        ":bezier",
        "//webapp/static/js:fabric",
        "//webapp/static/js:util",
    ],
)

closure_js_library(
    name = "bezier",
    srcs = [
        "anchor.js",
        "control_point.js",
        "edge.js",
    ],
    visibility = ["//webapp/static/js/tools:__pkg__"],
    deps = [
        "//webapp/static/js:fabric",
        "//webapp/static/js:globals",
        "//webapp/static/js:mesh-wrapper",
        "//webapp/static/js/events",
    ],
)
