java_binary(
    name = "exporter",
    srcs = ["Exporter.java"],
    main_class = "com.fabdm.editor.pdf.Exporter",
    deps = [
        "//src/main/java/com/fabdm/project",
        "@itext//:jar",
        "@guava//jar",
    ],
)

java_library(
    name = "servlet",
    srcs = [
        "Exporter.java",
        "PdfServlet.java",
    ],
    deps = [
        "//src/main/java/com/fabdm/editor",
        "//src/main/java/com/fabdm/project",
        "@com_google_gson//jar",
        "@itext//:jar",
        "@guava//jar",
        "@javax_servlet_api//jar",
    ],
    visibility = ["//src/main/java/com/fabdm/editor:__pkg__"],
)
