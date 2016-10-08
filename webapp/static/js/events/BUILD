load(
    "@io_bazel_rules_closure//closure:defs.bzl",
    "closure_js_library",
    "closure_js_test",
)

closure_js_library(
    name = "events",
    srcs = [
        "event_builder.js",
        "events.js",
    ],
    visibility = ["//webapp/static/js:__subpackages__"],
    deps = ["@io_bazel_rules_closure//closure/library"],
)

closure_js_library(
    name = "intersectable",
    srcs = ["intersectable.js"],
    visibility = ["//webapp/static/js:__subpackages__"],
)

closure_js_test(
    name = "events_test",
    srcs = glob(["*_test.js"]),
    deps = [
        ":events",
        "//webapp/static/js:mesh-wrapper",
        "@io_bazel_rules_closure//closure/library:testing",
    ],
)
