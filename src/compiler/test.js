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
    }
    Yo.prototype.yo = function () {
        //this.varTwo = "yay!";
        this.var2 = 10;
        var b;
        var a = {
            this: "nice"
        };
        if (this.var2 === 10 || this.var2 !== 20 && this.varTwo === "blah") {
            if (!a || !this.var2) {
            }
        }
        if (this.var2 === 20) {
        }
        var i = 0;
        while (i < 20 && i > 40) {
        }
        var array = [1, 2, 3, 4];
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var elem = array_1[_i];
        }
        for (var i_1 = 0; i_1 < 10; ++i_1) {
        }
        if (b === "orange") {
        }
    };
    return Yo;
}());
