const c = console;

let f = ->
    if true
        while false
            c.log("shouldn't get here")
            -< true


let help = ->
    c.log("Usage: In v4 run tslint recursively")
    c.log("Then run the fixer")
    c.log("> coffee tslintFixer.coffee tslintout.txt")
    process.exit(0)

