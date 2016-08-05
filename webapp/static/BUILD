filegroup(
    name = "static",
    srcs = [
        "index.html",
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
