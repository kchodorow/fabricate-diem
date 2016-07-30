load(
    "@io_bazel_rules_closure//closure:defs.bzl",
    "closure_js_library",
    "closure_js_test",
)

closure_js_library(
    name = "cloth",
    srcs = ["workboard.js"],
    visibility = ["//webapp/static/js:__pkg__"],
    deps = [
        ":bezier",
        "//webapp/static/js:event_handler",
        "//webapp/static/js:fabric",
        "//webapp/static/js:globals",
        "//webapp/static/js:mesh-wrapper",
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

closure_js_library(
    name = "physical_piece",
    srcs = ["physical_piece.js"],
    deps = [
        "//webapp/static/js:globals",
        "//webapp/static/js:mesh-wrapper",
        "//webapp/static/js/events",
        "//webapp/static/js/tools:drag-piece",
    ],
)

closure_js_test(
    name = "physical_piece_test",
    srcs = ["physical_piece_test.js"],
    compilation_level = "WHITESPACE_ONLY",
    data = ["//webapp/static/js:three.js"],
    html = "testing.html",
    deps = [
        ":physical_piece",
        "@io_bazel_rules_closure//closure/library:testing",
    ],
)
