SOY_FILES = [
    "editor.soy",
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
    "@guava//jar",
    "@guice_assistedinject//jar",
    "@guice_multibindings//jar",
    "@icu4j//jar",
    "@jsr305//jar",
    "@jsr330_inject//jar",
    "@org_aopalliance//jar",
]

DEPS = [
    "@guava//jar",
    "@guice//jar",
    "@soy//jar",
]

java_library(
    name = "java-template",
    srcs = [
        ":EditorSoyInfo.java",
        ":ErrorsSoyInfo.java",
        ":MainSoyInfo.java",
        ":UserSoyInfo.java",
    ],
    visibility = ["//src/main/java/com/fabdm/template:__pkg__"],
    runtime_deps = RUNTIME_DEPS,
    deps = DEPS,
)

