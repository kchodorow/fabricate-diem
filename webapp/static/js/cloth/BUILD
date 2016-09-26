load(
    "@io_bazel_rules_closure//closure:defs.bzl",
    "closure_js_library",
    "closure_js_test",
)

closure_js_library(
    name = "cloth",
    visibility = ["//webapp/static/js:__pkg__"],
    exports = [
        ":bezier",
        ":physical-piece",
        ":workboard",
    ],
)

closure_js_library(
    name = "workboard",
    srcs = ["workboard.js"],
    deps = [
        ":bezier",
        ":physical-piece",
        "//webapp/static/js:event_handler",
        "//webapp/static/js:fabric",
        "//webapp/static/js:globals",
        "//webapp/static/js:mesh-wrapper",
        "//webapp/static/js/tools:drag-piece",
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
        "//webapp/static/js/tools:anchor-point",
    ],
)

closure_js_library(
    name = "physical-piece",
    srcs = ["physical_piece.js"],
    deps = [
        "//webapp/static/js:globals",
        "//webapp/static/js:mesh-wrapper",
        "//webapp/static/js:physics",
        "//webapp/static/js/events",
        "//webapp/static/js/tools:drag-piece",
    ],
)

closure_js_test(
    name = "physical_piece_test",
    srcs = ["physical_piece_test.js"],
    compilation_level = "WHITESPACE_ONLY",
    data = ["//webapp/static/js:three.js"],
    html = ":testing.html",
    suppress = ["JSC_MISSING_JSDOC"],
    deps = [
        ":cloth",
        "@io_bazel_rules_closure//closure/library",
        "@io_bazel_rules_closure//closure/library:testing",
    ],
)
