java_binary(
    name = "exporter",
    srcs = ["Exporter.java"],
    main_class = "com.fabdm.editor.pdf.Exporter",
    deps = [
        "//src/main/java/com/fabdm/editor:model",
        "@itext//:jar",
        "@guava//jar"
    ],
)

java_library(
    name = "servlet",
    srcs = ["PdfServlet.java"],
    deps = [
        "@javax_servlet_api//jar",
    ],
    visibility = ["//src/main/java/com/fabdm/editor:__pkg__"],
)
