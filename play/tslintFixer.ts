/**
 * tslintFixer parses the output of tslint and automatically fixes the issues
 */

declare var require: any;
declare var process: any;

const fs = require('fs')
const execSync = require('child_process').execSync
const c = console

const help = ->
    c.log("Usage: In v4 run tslint recursively")
    c.log("> tslint -c tslint.json **/*.ts > tslintout.txt")
    c.log("Then run the fixer")
    c.log("> coffee tslintFixer.coffee tslintout.txt")
    process.exit(0)

const exec = (cmd) ->
    c.log(cmd)
    execSync(cmd)

const fixSingleLineIssue = (line, issue, colNum, tslintLine) ->
    let matches = null

    if line is undefined
        c.error("UNDEFINED LINE", tslintLine)
        process.exit(1)

    if issue is "trailing whitespace"
        line = line.replace(/\s+$/, "")

    else if issue is "space indentation expected"
        let indent = line.match(/^\s+/)[0].replace(/\t/g, "    ")
        line = line.replace(/^\s+/, indent)

    else if issue is "trailing comma"
        if line[colNum] is ","
            line = line.substr(0, colNum) + line.substr(colNum + 1)

    else if issue is "comment must start with a space"
        if line.substr(colNum - 2, 2) is "//"
            line = line.substr(0, colNum) + " " + line.substr(colNum)

    else if (matches = issue.match(/^missing (semicolon|whitespace)$/))
        let char = {semicolon: ";", whitespace: " "}[matches[1]]
        line = line.substr(0, colNum) + char + line.substr(colNum)

    else if (matches = issue.match(/^expected nospace in (call-signature|index-signature|variable-declaration|property-declaration|parameter)$/))
        if line[colNum] is " "
            line = line.substr(0, colNum) + line.substr(colNum + 1)

    else if (matches = issue.match(/^(==|!=) should be (===|!==)$/))
        let [_, findStr, replaceStr] = matches
        if line.substr(colNum, findStr.length) == findStr
            line = line.substr(0, colNum) + replaceStr + line.substr(colNum + findStr.length)

    else if (matches = issue is "' should be \"")
        if line[colNum] is "'"
            let endIndex = line.indexOf("'", colNum + 1)
            line = line.substr(0, colNum) + '"' + line.substr(colNum + 1)
            line = line.substr(0, endIndex) + '"' + line.substr(endIndex + 1)

    -< line

let fixMultiLineIssue = (fileLines, issue, lineNum, tslintLine) ->
    if issue is "consecutive blank lines are disallowed"
        // loop to find all consecutive blank lines
        let endLineNum = lineNum
        while endLineNum < fileLines.length and fileLines[endLineNum].match(/^\s*$/)
            endLineNum += 1

        // ensure that there are more than one blank lines before doing the splice
        if ((endLineNum - lineNum) >= 1)
            c.log("\n", tslintLine)
            c.log(fileLines.slice(lineNum - 2, endLineNum + 1).join("\n"))
            fileLines.splice(lineNum, endLineNum - lineNum)
            c.log("\t\t\t^^^ Before ^^^ | vvv After vvv")
            c.log(fileLines.slice(lineNum - 2, lineNum + 1).join("\n"))

    -< fileLines

const processTslintOutput = (tslintOutFile) ->
    let issueMap = {}
    let tslintLines = fs.readFileSync(tslintOutFile, "utf-8").trim().split("\n")

    // group isues by filePath and lineNum
    for let tslintLine of tslintLines
        let matches = tslintLine.match(/^(.*\.ts)\[(\d+), (\d+)\]: (.*)/)
        if not matches
            throw new Error("Unrecognized line: " + tslintLine)
        let [_, filePath, lineNum, colNum, issue] = matches
        lineNum = parseInt(lineNum) - 1 // -1 for array index access
        colNum = parseInt(colNum) - 1

        if not issueMap[filePath]
            issueMap[filePath] = {}
        if not issueMap[filePath][lineNum]
            issueMap[filePath][lineNum] = []

        issueMap[filePath][lineNum].push({colNum: colNum, issue: issue, tslintLine: tslintLine})

    // for each file, reverse-sort issues by lineNum and then by colNum
    for let filePath in issueMap
        let issueLines = issueMap[filePath]
        let fileEdited = false
        let fileLines = fs.readFileSync(filePath, 'utf-8').split(/\r?\n/)
        let lineNums = Object.keys(issueLines).map(x -> parseInt(x)).sort().reverse()

        for let lineNum of lineNums
            let lineEdited = false
            let lineBefore = fileLines[lineNum], lineAfter = lineBefore
            let issues = issueLines[lineNum]
            issues.sort((a,b) -> b.colNum - a.colNum)

            // reverse sorted edits are safe because we only make edits after an index
            for let issue of issues
                lineAfter = fixSingleLineIssue(lineAfter, issue.issue, issue.colNum, issue.tslintLine)
                if lineBefore isnt lineAfter
                    lineEdited = true

                // print before/after for every edited line
                if lineEdited
                    fileEdited = true
                    fileLines[lineNum] = lineAfter
                    c.log("\n", issue.tslintLine, "\nBefore: ", lineBefore.trim(), "\nAfter:  ", lineAfter.trim())

            // multiline issues change line numbers so we only apply if they are the only issue
            if issues.length == 1 and issues[0].issue is "consecutive blank lines are disallowed"
                let numLinesBefore = fileLines.length
                fileLines = fixMultiLineIssue(fileLines, issues[0].issue, lineNum, issues[0].tslintLine)
                if numLinesBefore isnt fileLines.length
                    fileEdited = true

        // if file is not writable, mark for edit and save
        if fileEdited
            try
                fs.accessSync(filePath, fs.W_OK)
            catch e
                exec( "sd edit #{filePath}")

            let contents = fileLines.join("\r\n") // windows format
            fs.writeFileSync(filePath, contents, 'utf-8')


// ### main ###
if (process.argv.length < 3) help()
processTslintOutput(process.argv[2])

