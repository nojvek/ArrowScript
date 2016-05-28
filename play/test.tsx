const c = console

let f = ->
    if true
        "asfasdf"
        c.log("asdfasdfasdf")
        "Asdf"
        -< "whoop 			"

        while true
            c.log("asdf")


let help = ->
    c.log("Usage: In v4 run tslint recursively")
    c.log("> tslint -c tslint.json **/*.ts > tslintout.txt")
    c.log("Then run the fixer")
    c.log("> coffee tslintFixer.coffee tslintout.txt")
    process.exit(0)

