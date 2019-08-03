# ArrowScript

ArrowScript is built on top of Typescript to support additional like language syntax inspired from coffeescript.

ArrowScript = TypeScript + Syntatic Sugar
TypeScript = JavaScript + Types

# Why? Why not?

TypeScript bundled with Language Service server offers a great development environment.
Excellent intellisense and error checking as you type is possible because TypeScript has an architecture built for long lived compilations.


## Installing

```
npm install -g arrowscript
```

## Features

#### Indented blocks work as curlys. Optional parens around if, for, while, switch

```
namespace somelib
	interface INode
    	str: string
        nums: number[]
        node: INode

	class SomeClass
    	private hello:string = ""
    	constructor(greetings: string)
            if greetings isnt "arrg!"
            	console.log(greetings)
                #.hello = greetings // # is an alias of 'this'

            for let i = 0; i < 10; i++
            	console.log(i, greetings)

        public get node(): INode
        	-< // -< is an alias of return
            	str: #.hello
                num: [10, 11, 12]
                node:
                    str: "yo"
                    nums: [
                    	13
                        14
                        15
                    ]
                    node: unll

```


#### Thin, fat and feather arrows

Thin Arrows (->) are an alias of Fat arrows (=>). They behave exactly the same way.
The empty parenthesis for arrow functions are not needed.

Note: arrows only auto return if they are on the same line

'-<' is an alias of 'return'.

```
let a = () => console.log("aye")
let b = () -> console.log("aye")
let c = => console.log("aye")
let d = -> console.log("aye")
// a, b, c, d are all the same

let func = x ->
	doSomething(x)
    let z = doSomethingMore(y)
    z = z * z
    -< z
```

#### is, isnt, #

```
if (x is 5 || x === 5) // is is an alias of ===
if (y isnt 5 || y !== 5) // isnt is an alis of !===
if (this is #) // # is an alias of 'this'

```

#### optional parens in first function invocation in a line

```
$ ->
	console.log "Jquery Started"
    let arr = []
    arr.push 1
    arr.push 2, 3, 4
    arr.push 2,3,4 $ window // Error, parenthesis needed like $(window)

    $(".row").on 'click', e ->
    	console.log e.clientX, e.clientY

```
