/**
 * tslintFixer parses the output of tslint and automatically fixes the issues
 */
var fs = require('fs');
var execSync = require('child_process').execSync;
var c = console;
var help = function () {
    c.log("Usage: In v4 run tslint recursively");
    c.log("> tslint -c tslint.json **/*.ts > tslintout.txt");
    c.log("Then run the fixer");
    c.log("> coffee tslintFixer.coffee tslintout.txt");
    process.exit(0);
};
var exec = function (cmd) {
    c.log(cmd);
    execSync(cmd);
};
var fixSingleLineIssue = function (line, issue, colNum, tslintLine) {
    var matches = null;
    if (line === undefined) {
        c.error("UNDEFINED LINE", tslintLine);
        process.exit(1);
    }
    if (issue === "trailing whitespace") {
        line = line.replace(/\s+$/, "");
    }
    else if (issue === "space indentation expected") {
        var indent = line.match(/^\s+/)[0].replace(/\t/g, "    ");
        line = line.replace(/^\s+/, indent);
    }
    else if (issue === "trailing comma") {
        if (line[colNum] === ",") {
            line = line.substr(0, colNum) + line.substr(colNum + 1);
        }
    }
    else if (issue === "comment must start with a space") {
        if (line.substr(colNum - 2, 2) === "//") {
            line = line.substr(0, colNum) + " " + line.substr(colNum);
        }
    }
    else if (matches = issue.match(/^missing (semicolon|whitespace)$/)) {
        var char = { semicolon: ";", whitespace: " " }[matches[1]];
        line = line.substr(0, colNum) + char + line.substr(colNum);
    }
    else if (matches = issue.match(/^expected nospace in (call-signature|index-signature|variable-declaration|property-declaration|parameter)$/)) {
        if (line[colNum] === " ") {
            line = line.substr(0, colNum) + line.substr(colNum + 1);
        }
    }
    else if (matches = issue.match(/^(==|!=) should be (===|!==)$/)) {
        _ = matches[0], findStr = matches[1], replaceStr = matches[2];
        if (line.substr(colNum, findStr.length) == findStr) {
            line = line.substr(0, colNum) + replaceStr + line.substr(colNum + findStr.length);
        }
    }
    else if (matches = issue === "' should be \"") {
        if (line[colNum] === "'") {
            endIndex = line.indexOf("'", colNum + 1);
            line = line.substr(0, colNum) + '"' + line.substr(colNum + 1);
            line = line.substr(0, endIndex) + '"' + line.substr(endIndex + 1);
        }
    }
    return line;
};
var fixMultiLineIssue = function (fileLines, issue, lineNum, tslintLine) {
    if (issue === "consecutive blank lines are disallowed") 
    // loop to find all consecutive blank lines
    {
        endLineNum = lineNum;
        while (endLineNum < fileLines.length && fileLines[endLineNum].match(/^\s*$/)) {
            endLineNum += 1;
        }
        // ensure that there are more than one blank lines before doing the splice
        if ((endLineNum - lineNum) >= 1) {
            c.log("\n", tslintLine);
            c.log(fileLines.slice(lineNum - 2, endLineNum + 1).join("\n"));
            fileLines.splice(lineNum, endLineNum - lineNum);
            c.log("\t\t\t^^^ Before ^^^ | vvv After vvv");
            c.log(fileLines.slice(lineNum - 2, lineNum + 1).join("\n"));
        }
    }
    return fileLines;
};
var processTslintOutput = function (tslintOutFile) {
    issueMap = {};
    tslintLines = fs.readFileSync(tslintOutFile, "utf-8").trim().split("\n");
    // group isues by filePath and lineNum
    for (tslintLine in tslintLines) {
        matches = tslintLine.match(/^(.*\.ts)\[(\d+), (\d+)\]: (.*)/);
        if (!matches) {
            throw new Error("Unrecognized line: " + tslintLine);
        }
        _ = matches[0], filePath = matches[1], lineNum = matches[2], colNum = matches[3], issue = matches[4];
        lineNum = parseInt(lineNum) - 1; // -1 for array index access
        colNum = parseInt(colNum) - 1;
        if (!issueMap[filePath]) {
            issueMap[filePath] = {};
        }
        if (!issueMap[filePath][lineNum]) {
            issueMap[filePath][lineNum] = [];
        }
        issueMap[filePath][lineNum].push({ colNum: colNum, issue: issue, tslintLine: tslintLine });
    }
    // for each file, reverse-sort issues by lineNum and then by colNum
    for (var _i = 0, issueMap_1 = issueMap; _i < issueMap_1.length; _i++) {
        filePath, issueLines = issueMap_1[_i];
        fileEdited = false;
        fileLines = fs.readFileSync(filePath, 'utf-8').split(/\r?\n/);
        lineNums = Object.keys(issueLines).map(function (x) { return parseInt(x); }).sort().reverse();
        for (lineNum in lineNums) {
            lineEdited = false;
            lineBefore = lineAfter = fileLines[lineNum];
            issues = issueLines[lineNum];
            issues.sort(function (a, b) { return b.colNum - a.colNum; });
            // reverse sorted edits are safe because we only make edits after an index
            for (issue in issues) {
                lineAfter = fixSingleLineIssue(lineAfter, issue.issue, issue.colNum, issue.tslintLine);
                if (lineBefore !== lineAfter) {
                    lineEdited = true;
                }
            }
            // print before/after for every edited line
            if (lineEdited) {
                fileEdited = true;
                fileLines[lineNum] = lineAfter;
                c.log("\n", issue.tslintLine, "\nBefore: ", lineBefore.trim(), "\nAfter:  ", lineAfter.trim());
            }
            // multiline issues change line numbers so we only apply if they are the only issue
            if (issues.length == 1 && issues[0].issue === "consecutive blank lines are disallowed") {
                numLinesBefore = fileLines.length;
                fileLines = fixMultiLineIssue(fileLines, issues[0].issue, lineNum, issues[0].tslintLine);
                if (numLinesBefore !== fileLines.length) {
                    fileEdited = true;
                }
            }
        }
        // if file is not writable, mark for edit and save
        if (fileEdited) {
            try {
                fs.accessSync(filePath, fs.W_OK);
            }
            catch (e) {
                exec("sd edit #{filePath}");
            }
            contents = fileLines.join("\r\n"); // windows format
            fs.writeFileSync(filePath, contents, 'utf-8');
        }
    }
    // ### main ###
};
// ### main ###
if (process.argv.length < 3)
    help();
processTslintOutput(process.argv[2]);
