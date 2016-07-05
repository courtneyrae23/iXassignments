// Return 'yes' if the sentence contains only unique characters, 'no' otherwise
function allUniqueCharacters(sentence) {
	for (var i = 0; i < sentence.length; i++) {
		for (var j = i+1; j < sentence.length; j++) {
			if (sentence[i] === sentence[j] && sentence[i] !== " ") {
				return 'no';
			}
		}
	}
	return 'yes';  
}

// One number 1-10 is missing. Return it!
function missingNum(numbers) {
	var sum = 0;
	var numTotal = 0;
	// Sum is what 1 + 2 + 3 + ... + 10 should be. NumTotal is what the collection of numbers adds to.
	for (var i=0; i < numbers.length; i++) {
		sum += (i+1);
		numTotal += numbers[i];
	}

	console.log(numTotal, sum);
	sum += numbers.length+1;
	return sum-numTotal;
}

// Return 'yes' if array1 and array2 are rotated versions of each other, 'no' otherwise
// e.g. [1,2,3,6,7,8] and [3,6,7,8,1,2] are rotated versions of each other
function areRotatedVersions(array1, array2) {
	// Simple case
	if (array1.length !== array2.length) {
		return 'no';
	}
	// Two same-length arrays
	for (var i = 0; i < array2.length; i++) {
		// Only need to check the first item of array1 because that should be a pivot point
		// in the second array.
		if (array1[0] == array2[i]) {
			// Rotate array2 on the pivot we found
			array2rotate = array2.slice(i, array2.length).concat(array2.slice(0, i));
			// Compare array1 with the newly rotated array
			var equalArrays = true;
			for (var j = 0; j < array1.length; j++) {
				// Maybe this is just the wrong pivot so don't return 'no' just yet
				//Ex: [1,2,1,5,6] and [1,5,6,1,2]. The rotate wouldn't actually rotate
				//the second array, but if we keep going, we'll get to the true pivot.
				if (array1[j] !== array2rotate[j]) {
					equalArrays = false;
				}
			}
			if (equalArrays) {
				return 'yes';
			}
		}
	}
	return 'no';
}

// Return a string of the first n prime numbers, separated by commas
// e.g. "1,2,3,4"
function nPrimeNums(n) {
	// Array of the first n primes
	primes = [];
	// First prime to consider
	k = 2;
	while (primes.length < n) {
		// Checks if it's divisible by any smaller prime
		isPrime = true;
		for (var i = 0; i < primes.length; i++) {
			if (k % primes[i] === 0) {
				isPrime = false;
			}
		}
		// k wasn't divisible by any smaller prime so it must be prime.
		if (isPrime) {
			primes.push(k);
		}
		// Let's check the next largest number
		k++;
	}
	return primes.join();
}

// Return the output of running the function f twice
// e.g. doitTwice(function f() {return 1;}) === 2
function doItTwice(f) {
	return f() + f();
}

// Return an object that has the properties: first name, last name, age, email, and favorite color
function objectFun(first, last, age, email, color) {
    var person = {
    	first_name: first,
    	last_name: last,
    	age: age,
    	email: email,
    	fav_color: color
    };
    return person;
}

// Return the number of "children" obj has
function numChildren(obj) {
	return obj.children.length;
}

function greeting(name) {
    return "Hello, " + name + "!";
}

// Say hello! This function takes a function as a parameter (greet should be a function)
function sayHello(first, last, greet) {
	return greet(first + " " + last);
}