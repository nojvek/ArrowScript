module hello {
    export function a() {
        return "yay";
    }
}

interface Ifacey {
    prop: string
    hello: string
}

class Yo {
    private var2 = 2
    private varTwo = "two"

    public yo() {
        //this.varTwo = "yay!";
        #.var2 = 10;
        let b:string;

        let a = {
            this: "nice"
        }

        if (#.var2 is 10 or #.var2 isnt 20 and #.varTwo is "blah") {
            if(not a or not #.var2){

            }
        }

        if #.var2 is 20 {

        }

        let i =0;
        while i < 20 and i > 40 {

        }

        let array = [1,2,3,4]
        for let elem of array {

        }

        for let i = 0; i < 10; ++i {

        }


        if b is "orange" {

        }
    }
}

// Ypescript
/**
# = this, @ is reserved for decorators
is, isnt, or, and, not as keywords
optional parens in control statements
optional curlys in blocks (tab/space based) - compiler will complain if used interchangeably
<- is alias for return
() parens not needed in empty arrow functions =>
unlike coffee everything is not an expression. returns have to be explicit
commas not needed in arrays



$ =>
    c.log "hello"
    print "no"


 */

