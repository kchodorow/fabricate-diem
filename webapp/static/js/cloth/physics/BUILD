load(
    "@io_bazel_rules_closure//closure:defs.bzl",
    "closure_js_library",
    "closure_js_test",
)

closure_js_library(
    name = "physics",
    visibility = ["//webapp/static/js/cloth:__pkg__"],
    exports = [
        ":constraint",
        ":grid",
    ],
)

closure_js_library(
    name = "grid",
    srcs = [
        "column.js",
        "grid.js",
    ],
    deps = [":constraint"],
)

closure_js_library(
    name = "constraint",
    srcs = ["constraint.js"],
)

closure_js_test(
    name = "constraint-test",
    srcs = ["constraint_test.js"],
    deps = [":constraint"],
)
