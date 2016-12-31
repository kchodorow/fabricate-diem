load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")
load("//webapp/static/js/testing:testing.bzl", "js_test")

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
        "//webapp/static/js/storage",
        "//webapp/static/js/tools:drag-piece",
        "//webapp/static/js/tools:fabric",
        "//webapp/static/js/tools:move-piece",
        "@io_bazel_rules_closure//closure/library",
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
        "//webapp/static/js/storage",
        "//webapp/static/js/tools:anchor-point",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "physical-piece",
    srcs = ["physical_piece.js"],
    deps = [
        ":geometry-mapper",
        "//webapp/static/js:globals",
        "//webapp/static/js:mesh-wrapper",
        "//webapp/static/js:physics",
        "//webapp/static/js:pin",
        "//webapp/static/js/events",
        "//webapp/static/js/tools:drag-piece",
        "//webapp/static/js/tools:move-piece",
    ],
)

closure_js_library(
    name = "geometry-mapper",
    srcs = [
        "geometry_mapper.js",
        "queryable_quadtree.js",
    ],
    deps = ["@io_bazel_rules_closure//closure/library"],
)

js_test(
    name = "physical-piece-test",
    srcs = ["physical_piece_test.js"],
    deps = [":cloth"],
)
