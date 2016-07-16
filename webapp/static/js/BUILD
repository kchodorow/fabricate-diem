load(
    "@io_bazel_rules_closure//closure:defs.bzl",
    "closure_js_binary",
    "closure_js_library",
)

filegroup(
    name = "js",
    srcs = [
        "renderers/CanvasRenderer.js",
        "three.js",
        ":lib.js",
    ],
    visibility = ["//webapp/static:__pkg__"],
)

closure_js_binary(
    name = "lib",
    deps = [
        ":globals",
        ":scene",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "globals",
    srcs = ["globals.js"],
    externs = ["extern.js"],
    visibility = ["//webapp/static/js:__subpackages__"],
)

closure_js_library(
    name = "scene",
    srcs = [
        "scene.js",
        "scene_container.js",
    ],
    deps = [
        ":cloth",
        ":pattern",
        ":person",
        ":util",
        "//webapp/static/js/cloth",
        "//webapp/static/js/tools",
    ],
)

closure_js_library(
    name = "pattern",
    srcs = ["pattern.js"],
    deps = ["//webapp/static/js/cloth"],
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
        "part.js",
        "particle.js",
    ],
    deps = [
        ":fabric",
        ":util",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "fabric",
    srcs = ["fabric.js"],
    visibility = ["//webapp/static/js:__subpackages__"],
)

closure_js_library(
    name = "util",
    srcs = [
        "event_handler.js",
        "pin.js",
        "ruler.js",
    ],
    visibility = ["//webapp/static/js:__subpackages__"],
    deps = [
        ":globals",
        "@io_bazel_rules_closure//closure/library",
    ],
)
