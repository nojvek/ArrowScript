var hello;
(function (hello) {
    function a() {
        return "yay";
    }
    hello.a = a;
})(hello || (hello = {}));
var Yo = (function () {
    function Yo() {
        this.var2 = 2;
        this.varTwo = "two";
        this.props = {};
    }
    Yo.prototype.yo = function () {
        //this.varTwo = "yay!";
        this.var2 = 10;
        var b;
        if (b < -3) {
        }
        var func = function () {
            return <hello></hello>;
        };
        return <div className="result">
            Hello
        </div>;
    };
    return Yo;
}());
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
