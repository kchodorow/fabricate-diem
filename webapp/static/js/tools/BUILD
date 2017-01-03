load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

closure_js_library(
    name = "tools",
    visibility = ["//webapp/static/js:__pkg__"],
    exports = [
        ":add-piece",
        ":anchor-point",
        ":camera",
        ":delete",
        ":drag-piece",
        ":fabric",
        ":move-piece",
        ":person",
    ],
)

closure_js_library(
    name = "tool-manager",
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
    name = "add-piece",
    srcs = ["add_piece.js"],
    visibility = ["//webapp/static/js:__pkg__"],
    deps = [
        ":tool",
        "//webapp/static/js:button",
        "//webapp/static/js:pattern",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "camera",
    srcs = ["camera_tool.js"],
    deps = [
        ":tool",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "delete",
    srcs = ["delete.js"],
    visibility = ["//webapp/static/js:__subpackages__"],
    deps = [
        ":tool",
        "//webapp/static/js:button",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "fabric",
    srcs = ["fabric_tool.js"],
    visibility = ["//webapp/static/js/cloth:__pkg__"],
    deps = [
        ":tool",
        "//webapp/static/js:button",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "person",
    srcs = ["person_tool.js"],
    deps = [
        ":tool",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "drag-piece",
    srcs = ["drag_piece.js"],
    visibility = ["//webapp/static/js:__subpackages__"],
    deps = [
        ":tool",
        "//webapp/static/js:button",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "move-piece",
    srcs = ["move_piece.js"],
    visibility = ["//webapp/static/js:__subpackages__"],
    deps = [
        ":tool",
        "//webapp/static/js:button",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "anchor-point",
    srcs = [
        "add_anchor_pt.js",
        "anchor_pt.js",
        "rm_anchor_pt.js",
    ],
    visibility = ["//webapp/static/js:__subpackages__"],
    deps = [
        ":tool",
        "//webapp/static/js:button",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "toolbar",
    srcs = ["toolbar.js"],
    visibility = ["//webapp/static/js:__subpackages__"],
    deps = [
        ":tool-manager",
        "//webapp/static/js:button",
        "@io_bazel_rules_closure//closure/library",
    ],
)
