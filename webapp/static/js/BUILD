load("@io_bazel_rules_closure//closure:defs.bzl",
    "closure_js_binary", "closure_js_library")

filegroup(
    name = "js",
    srcs = [
        "three.js",
        "renderers/CanvasRenderer.js",
        ":lib.js",
    ],
    visibility = ["//webapp/static:__pkg__"],
)

closure_js_binary(
    name = "lib",
    deps = [
        ":scene",
        ":externs",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "externs",
    externs = ["extern.js"],
)

closure_js_library(
    name = "scene",
    srcs = [
        "scene.js",
        "scene_container.js",
    ],
    deps = [
        ":cloth",
        ":person",
        ":util",
        "//webapp/static/js/tools",
    ],
)

closure_js_library(
    name = "person",
    srcs = [
        "person.js",
    ],
    deps = [":util"],
)

closure_js_library(
    name = "cloth",
    srcs = [
        "cloth.js",
        "fabric.js",
        "part.js",
        "particle.js",
    ],
    deps = [":util"],
)

closure_js_library(
    name = "util",
    srcs = [
        "event_handler.js",
        "globals.js",
        "pin.js",
        "ruler.js",
        "workboard.js",
    ],
)
