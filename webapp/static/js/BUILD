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

genrule(
    name = "three-externs",
    srcs = ["three.d.ts"],
    outs = ["three.ext.js"],
    cmd = "tsd2cee $< $@",
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
    externs = [":three.ext.js"],
    visibility = ["//webapp/static/js:__subpackages__"],
)

closure_js_library(
    name = "scene",
    srcs = [
        "ruler.js",
        "scene.js",
        "scene_container.js",
    ],
    deps = [
        ":event_handler",
        ":globals",
        ":pattern",
        ":person",
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
    deps = [":event_handler"],
)

closure_js_library(
    name = "fabric",
    srcs = ["fabric.js"],
    visibility = ["//webapp/static/js:__subpackages__"],
)

closure_js_library(
    name = "event_handler",
    srcs = [
        "event_handler.js",
    ],
    visibility = ["//webapp/static/js:__subpackages__"],
    deps = [
        ":globals",
        "//webapp/static/js/events",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "mesh-wrapper",
    srcs = ["mesh_wrapper.js"],
    visibility = ["//webapp/static/js:__subpackages__"],
    deps = [
        ":event_handler",
        ":globals",
    ],
)
