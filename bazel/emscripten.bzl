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
    }
)
