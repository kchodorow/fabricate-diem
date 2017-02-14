def _idl_impl(ctx):
    # This tries to write to ~/.escripten_cache.lock, so it has to be run with
    # --spawn_strategy=standalone.
    ctx.action(
        inputs = [
            ctx.file._webidl_binder,
            ctx.file.idl,
            ctx.file._version,
        ] + ctx.files._pylib,
        outputs = [
            ctx.outputs.cpp,
            ctx.outputs.js,
        ],
        command = "python {binder} {idl} {out}".format(
            binder = ctx.file._webidl_binder.path,
            idl = ctx.file.idl.path,
            out = ctx.outputs.js.path[0:-3]),
        progress_message = "Generating %s" % ctx.outputs.js.short_path,
    )

def _bc_impl(ctx):
    hdrs = []
    for d in ctx.attr.deps:
        hdrs += d.hdrs

    includes = []
    for i in ctx.attr.includes:
        if i == '.':
            includes += [ctx.label.package]
        else:
            includes += ["%s/%s" % (ctx.label.package, i)]

    ctx.action(
        inputs = [
            ctx.file._emcc,
            ctx.file._version,
        ] + ctx.files._pylib + ctx.files.srcs + hdrs,
        outputs = [ctx.outputs.emcc_out],
        command = "{emcc} {includes} {srcs} {deps} -o {bc}".format(
            emcc = ctx.file._emcc.path,
            includes = " ".join(["-I%s" % i for i in includes]),
            srcs = " ".join([f.path for f in ctx.files.srcs]),
            deps = " ".join([dep.path for dep in ctx.files.deps]),
            bc = ctx.outputs.emcc_out.path,
        ),
        progress_message = "Generating %s with em++" % ctx.outputs.emcc_out.path,
    )
    return struct(hdrs = hdrs)

idl = rule(
    implementation = _idl_impl,
    attrs = {
        'idl' : attr.label(
            single_file = True,
            allow_files = [".idl"],
        ),
        '_webidl_binder' : attr.label(
            default = Label('@emscripten//:tools/webidl_binder.py'),
            allow_files = True,
            single_file = True,
        ),
        '_pylib' : attr.label(default = Label('@emscripten//:pylib')),
        '_version' : attr.label(
            default = Label('@emscripten//:emscripten-version.txt'),
            allow_files = True,
            single_file = True,
        ),
    },
    outputs = {
        'cpp' : '%{name}.cpp',
        'js' : '%{name}.js',
    },
)

emcc_attrs = {
    'srcs' : attr.label_list(allow_files = [".cpp"]),
    'hdrs' : attr.label_list(allow_files = [".h"]),
    'deps' : attr.label_list(allow_files = [".bc"]),
    'includes' : attr.string_list(),
    '_emcc' : attr.label(
        default = Label('@emscripten//:em++'),
        allow_files = True,
        single_file = True,
    ),
    '_pylib' : attr.label(default = Label('@emscripten//:pylib')),
    '_version' : attr.label(
        default = Label('@emscripten//:emscripten-version.txt'),
        allow_files = True,
        single_file = True,
    ),
}

emcc_bc = rule(
    implementation = _bc_impl,
    attrs = emcc_attrs,
    outputs = {'emcc_out' : '%{name}.bc'},
)

emcc_js = rule(
    implementation = _bc_impl,
    attrs = emcc_attrs,
    outputs = {'emcc_out' : '%{name}.js'},
)
