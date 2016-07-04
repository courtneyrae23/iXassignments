function average(numbers_list) {
    var sum = 0;
    for (var i = 0; i < numbers_list.length; i++) {
        sum += numbers_list[i];
    }
    return sum / numbers_list.length;
}

function assignGrade(grade) {
    if (grade < 60) {
        return 'F';
    } else if (60 <= grade && grade < 70) {
        return 'D';
    }
    else if(70 <= grade && grade < 80) {
        return 'C';
    }
    else if(80 <= grade && grade < 90) {
        return 'B';
    }
    else if(grade >= 90) {
        return 'A';
    }
}

function pluralize(num, noun) {
    if(num > 1) {
        return num + " " + noun + "s";
    } else
        return num + " " + noun;
}

function longestWord(sentence) {
    var splitSentence = sentence.split(" ");
    var currLongestWord = " ";
    var currLongestLength = 0;
    for (var i = 0; i < splitSentence.length; i++) {
        var tempLength = splitSentence[i].length;
        if(tempLength > currLongestLength) {
            currLongestLength = tempLength;
            currLongestWord = splitSentence[i];
        }
    }
    return currLongestWord;
}

function palindrome(word) {
    // if (palindrome)
    //     return 'yes'
    // else 
    //     return 'no'
    for (var i = 0; i < word.length/2; i++) {
        if (word[i] !== word[word.length-1-i]) {
            return 'no';
        }
    }
    return 'yes';
}

function letterCounter(phrase, letter) {
    var currCount = 0;
    for(var i = 0; i < phrase.length; i++) {
        if(phrase[i] === letter)
            currCount++;
    }
    return currCount;
}

function longestPalindrome(sentence) {
    // if (longest word in sentence is a palindrome) {
    //     return longest + " is a palindrome";
    // }
    // else {
    //     return longest + " is not a palindrome";
    // }
    if (palindrome(longestWord(sentence)) === 'yes') {
        return longestWord(sentence) + " is a palindrome"; 
    }
    return longestWord(sentence) + " is not a palindrome";
}

function areAnagrams (sentence1, sentence2) {
    // if (sentence1 and sentence2 are anagrams)
    //     return 'yes'
    // else
    //     return 'no'
    for (var i=0; i < sentence1.length; i++) {
        var letter = sentence1[i];
        
        if (letter === " ") {
            continue;
        } else if (letterCounter(sentence1, letter) !== letterCounter(sentence2, letter)) {
            return 'no';
        }
    }

    for (var j=0; j < sentence2.length; j++) {
        var letter = sentence2[j];
        
        if (letter === " ") {
            continue;
        } else if (letterCounter(sentence2, letter) !== letterCounter(sentence1, letter)) {
            return 'no';
        }
    }
    
    return 'yes';
}
