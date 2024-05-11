import parsePythonScript from './python_parser';

const sqlReservedWordsUpper = require('./reserved_words');
const shortWords = require('./shorter_word_list');

const debug = false;

function printDebugInfo(someName, someVar, debug) {
    if (!debug) {
        return;
    }
    console.log("\n\<<<<<<<<<<<<<<<<< In anonymizer.js <<<<<<<<<<<<<<<<<<<<<<<<");
    console.log(someName, ":");
    console.log(someVar);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n");
}

class Anonymizer {
    constructor(tokenMode = 'dictionary') {
        this.mapping = {}; // Dictionary from original tokens to sanitized tokens
        this.tokenMode = tokenMode; // 'random' for random strings, 'dictionary' for dictionary words
        if (tokenMode === 'dictionary') {
            this.wordList = shortWords;
            // TODO the above is not very elegant, would be better to read from json file
            // let rawData = fs.readFileSync('word_list.json', 'utf8');
            // this.wordList = JSON.parse(rawData);
            this.shuffleArray(this.wordList);
        }
    }

    generateRandomString(length = 8) {
        // TODO this is not as rigourous as in python!! Need to define a word exactly
        if (this.tokenMode === 'random') {
            let letters = 'abcdefghijklmnopqrstuvwxyz';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += letters.charAt(Math.floor(Math.random() * letters.length));
            }
            return result;
        } else if (this.tokenMode === 'dictionary') {
            if (!this.wordList.length) {
                throw new Error("The word list has been exhausted.");
            }
            return this.wordList.pop().toLowerCase();
        } else {
            throw new Error(`Unexpected token mode: ${this.tokenMode}`);
        }
    }

    anonymize(query) {
        const tokens = query.match(/\b\w+\b/g);
        
        // TODO need to figure out why Anonymizer can't be instnatiated anymore in extension.js
        // TODO the argument of parsePythonScript shoud NOT be query, but the entire script!
        // TODO need to decide on a solution to parse entire script. It must read it either when copy is called, or before whenever the session is opened. 
        // TODO Also need to think what will happen to .mapping. For example, what if new stuff gets discovered as the tool sees more scripts, etc..  
        let wordsFromPythonScript = parsePythonScript();
        let upperCasePythonWords = wordsFromPythonScript.map(word => word.toUpperCase());
        let reservedWords = [...sqlReservedWordsUpper, ...upperCasePythonWords];

        

        // parsePythonScript(query, debug)

        tokens.forEach(token => {
            const upperToken = token.toUpperCase();
            // If the token is not reserved and if it's not yet in mapping, add a mapping for that token
            if (!sqlReservedWordsUpper.includes(upperToken)) {
                if (!this.mapping.hasOwnProperty(token)) {
                    this.mapping[token] = this.generateRandomString();
                }
                query = this.replaceInString(token, this.mapping[token], query);
            }
        });
        return query;
    }

    unanonymize(query) {
        printDebugInfo("trying to unanonymize this query", query, debug);
        if (debug) {
            console.log("mapping:");
            // Iterate over the mapping object and print each key-value pair
            Object.entries(this.mapping).forEach(([key, value]) => {
                console.log(`${key}: ${value}`);
            });
        }
        Object.entries(this.mapping).forEach(([originalToken, sanitizedToken]) => {
            query = this.replaceInString(sanitizedToken, originalToken, query);
        });
        printDebugInfo("returning this query", query, debug);
        return query;
    }

    replaceInString(token, replacement, string) {
        const regex = new RegExp(`\\b${token.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'g');
        return string.replace(regex, replacement);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
    }
}

module.exports = Anonymizer;
