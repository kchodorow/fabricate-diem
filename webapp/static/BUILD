filegroup(
    name = "static",
    srcs = [
        "index.html",
        ":assets",
        "//webapp/static/js",
    ],
    visibility = ["//:__pkg__"],
)

genrule(
    name = "mv-html",
    srcs = ["release.html"],
    outs = ["index.html"],
    cmd = "cp $< $@",
)

filegroup(
    name = "assets",
    srcs = ["assets/standard-female-figure.json"],
)
