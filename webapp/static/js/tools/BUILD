load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

closure_js_library(
    name = "tools",
    srcs = glob(
        ["*.js"],
        exclude = ["*_test.js"],
    ),
    visibility = ["//webapp/static/js:__pkg__"],
    deps = [
        "//webapp/static/js/cloth:bezier",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "tool_manager",
    srcs = ["tool_manager.js"],
    visibility = ["//webapp/static/js:__pkg__"],
    deps = [
        ":tool",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "tool",
    srcs = ["tool.js"],
    deps = [
        "//webapp/static/js:globals",
        "//webapp/static/js/events:intersectable",
    ],
)

closure_js_library(
    name = "drag-piece",
    srcs = ["drag_piece.js"],
    visibility = ["//webapp/static/js/cloth:__pkg__"],
    deps = [
        ":tool",
        "@io_bazel_rules_closure//closure/library",
    ],
)
