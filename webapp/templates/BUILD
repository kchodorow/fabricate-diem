filegroup(
    name = "templates",
    srcs = ["editor.soy"],
    visibility = ["//webapp:__pkg__"],
)

load("@io_bazel_rules_closure//closure:defs.bzl", "closure_java_template_library")

closure_java_template_library(
    name = "editor-template",
    srcs = ["editor.soy"],
    java_package = "com.kchodorow.diem.editor",
)

java_library(
    name = "editor",
    srcs = [":EditorSoyInfo.java"],
    data = ["editor.soy"],
    visibility = ["//src/main/java/com/kchodorow/diem/editor:__pkg__"],
    runtime_deps = [
        "@guava//jar",
        "@guice_assistedinject//jar",
        "@guice_multibindings//jar",
        "@icu4j//jar",
        "@jsr305//jar",
        "@jsr330_inject//jar",
        "@org_aopalliance//jar",
    ],
    deps = [
        "@guava//jar",
        "@guice//jar",
        "@soy//jar",
    ],
)
