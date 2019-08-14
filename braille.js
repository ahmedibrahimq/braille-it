var u28xx = "x28";
var braille = { 'a': '01', 'b': '03', 'c': '09', 'd': '19', 'e': '11', 'f': '0b',  'g': '1b', 'h': '13', 'i': '0a', 'j': '1a',
'k': '05', 'l': '07', 'm': '0d', 'n': '1d', 'o': '15', 'p': '0f', 'q': '1f', 'r': '17', 's': '0e', 't': '1e',
'u': '25', 'v': '27', 'w': '3a', 'x': '2d', 'y': '3d', 'z': '35',
',': '02', ';': '06', ':': '12', '.': '32', '!': '16', '(': '36', '*': '14', '"': '34', "'": '04', '-': '24',
'^': "20", //capital letter
'#': "3c", //number affix
' ': '00' //white space
};

var map_09_aj = {'1': 'a', '2': 'b', '3': 'c', '4': 'd', '5': 'e', '6': 'f', '7': 'g', '8': 'h', '9': 'i', '0': 'j'}

function fromEn() {
    var textEN = document.getElementById("text-en").value;
    var TextB = [];
    var i = 0;

    textEN = normalize(textEN);

    textEN.split('').forEach(c => {
        TextB[i++] = '&#' + u28xx + braille[c];
    });

    document.getElementById("braille-code").innerHTML = TextB.join(" ");
}

function normalize(texten) {
    var vocabs = texten.split(" ");
    for (let i = 0; i < vocabs.length; i++) {
        const vocab = vocabs[i];
        if (/\b\d+\b/.test(vocab)) { // If the word contains numbers only
            vocabs[i] = '#' + numtochars(vocab); // put a flag to know that
        } else {
            vocabs[i] = normalizeChars(vocab);
        }
        
    }
    return vocabs.join(" ");
}

function normalizeChars(word){
    var tokens = word.split("");
    for (let j = 0; j < tokens.length; j++) {
        const c = tokens[j];
        if (/[A-Z]/.test(c)) {tokens[j] = '^' + c.toLowerCase();} //Capital letter, put capital affix
        else if (/\d/.test(c)) {tokens[j] = '#' + map_09_aj[c];} // number, put number sign affix & map nums to letters
        else if (/\*/.test(c)) {tokens[j] = c + c;} // asterisk* duplicate its symbol
    }
    return tokens.join("");
    }

function numtochars(num) {
    var nums = num.split("");
    for (let i = 0; i < nums.length; i++) {
        const n = nums[i];
        nums[i] = map_09_aj[n];
    }
    return nums.join("");
}

window.onload = function () {
	document.getElementById("braille-it").addEventListener("click", fromEn);
}
