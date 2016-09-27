load("@io_bazel_rules_closure//closure:defs.bzl", "closure_java_template_library")

closure_java_template_library(
    name = "editor-template",
    srcs = ["editor.soy"],
    java_package = "com.kchodorow.diem.editor",
)

java_library(
    name = "wrapper",
    srcs = [":EditorSoyInfo.java"],
    data = ["editor.soy"],
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

java_binary(
    name = "editor",
    main_class = "com.kchodorow.diem.editor.EditorServlet",
    srcs = ["EditorServlet.java"],
    data = ["editor.soy"],
    deps = [
        ":wrapper",
        "@guice//jar",
        "@javax_servlet_api//jar",
        "@soy//jar",
    ],
)
