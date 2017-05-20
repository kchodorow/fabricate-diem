load("//bazel:emscripten.bzl", "idl")

idl(
    name = "other-ammo",
    idl = "@ammo//:ammo.idl",
)

filegroup(
    name = "vendor",
    srcs = [
        "SubdivisionModifier.js",
        "ammo.js",
        "bootstrap.min.js",
        "jquery-3.1.1.min.js",
        "three.js",
        "//third_party/ammo.js",
    ],
    visibility = ["//webapp/static/js:__subpackages__"],
)
