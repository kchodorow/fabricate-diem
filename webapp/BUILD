filegroup(
    name = "webapp",
    srcs = [
        ":xml",
        "//webapp/static",
        "//webapp/templates",
    ],
    visibility = ["//:__pkg__"],
)

filegroup(
    name = "xml",
    srcs = glob(["WEB-INF/*.xml"]),
)
