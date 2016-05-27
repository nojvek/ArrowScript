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

// Ypescript
/**
# = this, @ is reserved for decorators
is, isnt, or, and, not as keywords aliases for binary comparators
optional parens in control statements
optional curlys in blocks (tab/space based) - compiler will complain if used interchangeably
() parens not needed in empty arrow functions =>
<- is alias for return
unlike coffee everything is not an expression. returns have to be explicit in blocks
commas optional in array separators if multiline
commas optional in object separators if multiline

// JSX
 <#id> = emmet style jsx declaration # = id, . = class, default div
 ending tags auto created




$ =>
    c.log "hello"
    print "no"


 */

