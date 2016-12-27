SOY_FILES = [
    "pattern.soy",
    "errors.soy",
    "main.soy",
    "user.soy",
]

filegroup(
    name = "templates",
    srcs = SOY_FILES,
    visibility = ["//webapp:__pkg__"],
)

load("@io_bazel_rules_closure//closure:defs.bzl", "closure_java_template_library")

closure_java_template_library(
    name = "soy-template",
    srcs = SOY_FILES,
    java_package = "com.fabdm.editor",
)

RUNTIME_DEPS = [
    "@guava//:guava",
    "@guice_assistedinject//:guice_assistedinject",
    "@guice_multibindings//:guice_multibindings",
    "@icu4j//:icu4j",
    "@jsr305//:jsr305",
    "@jsr330_inject//:jsr330_inject",
    "@org_aopalliance//jar",
]

DEPS = [
    "@guava//:guava",
    "@guice//:guice",
    "@soy//:soy",
]

java_library(
    name = "java-template",
    srcs = [
        ":ErrorsSoyInfo.java",
        ":MainSoyInfo.java",
        ":PatternSoyInfo.java",
        ":UserSoyInfo.java",
    ],
    visibility = ["//src/main/java/com/fabdm/template:__pkg__"],
    runtime_deps = RUNTIME_DEPS,
    deps = DEPS,
)
