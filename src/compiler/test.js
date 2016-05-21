var l = function () { return 1 + 2; };
var y = function () {
    return l() + 2;
};
y();
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
