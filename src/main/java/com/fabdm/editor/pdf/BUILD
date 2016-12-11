java_library(
    name = "pdf",
    srcs = [
        "Expander.java",
        "Exporter.java",
        "PdfPieceIterator.java",
        "PixelPiece.java",
    ],
    deps = [
        "//src/main/java/com/fabdm/project",
        "@auto_value//:processor",
        "@itext//:jar",
        "@guava//jar",
    ],
)

java_library(
    name = "servlet",
    srcs = [
        "PdfServlet.java",
    ],
    deps = [
        ":pdf",
        "//src/main/java/com/fabdm/editor",
        "//src/main/java/com/fabdm/project",
        "@com_google_gson//jar",
        "@itext//:jar",
        "@guava//jar",
        "@javax_servlet_api//jar",
    ],
    visibility = ["//src/main/java/com/fabdm/editor:__pkg__"],
)
