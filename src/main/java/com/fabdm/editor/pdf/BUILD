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
        "@guava//:guava",
        "@itext//:jar",
    ],
)

java_library(
    name = "servlet",
    srcs = [
        "PdfServlet.java",
    ],
    visibility = ["//src/main/java/com/fabdm/editor:__pkg__"],
    deps = [
        ":pdf",
        "//src/main/java/com/fabdm/editor",
        "//src/main/java/com/fabdm/project",
        "@com_google_gson//jar",
        "@guava//:guava",
        "@itext//:jar",
        "@javax_servlet_api//jar",
    ],
)
