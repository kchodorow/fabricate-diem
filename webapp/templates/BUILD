filegroup(
    name = "templates",
    srcs = [
        "editor.soy",
        "main.soy",
        "user.soy",
    ],
    visibility = ["//webapp:__pkg__"],
)

load("@io_bazel_rules_closure//closure:defs.bzl", "closure_java_template_library")

closure_java_template_library(
    name = "editor-template",
    srcs = [
        "editor.soy",
        "main.soy",
        "user.soy",
    ],
    java_package = "com.kchodorow.diem.editor",
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
    name = "main",
    srcs = [":MainSoyInfo.java"],
    visibility = ["//src/main/java/com/kchodorow/diem:__pkg__"],
    runtime_deps = RUNTIME_DEPS,
    deps = DEPS,
)

java_library(
    name = "editor",
    srcs = [":EditorSoyInfo.java"],
    visibility = ["//src/main/java/com/kchodorow/diem/editor:__pkg__"],
    runtime_deps = RUNTIME_DEPS,
    deps = [":main"] + DEPS,
)

java_library(
    name = "user",
    srcs = [":UserSoyInfo.java"],
    visibility = ["//src/main/java/com/kchodorow/diem/account:__pkg__"],
    runtime_deps = RUNTIME_DEPS,
    deps = [":main"] + DEPS,
)
