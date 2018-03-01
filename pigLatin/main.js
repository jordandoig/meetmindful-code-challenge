function pigLatinTranslator (str) {
  let res;
  let input = str;

  // Input type validation
  if (!input || typeof input !== 'string') {
    return "Invalid input. pigLatinTranslator takes a single non-empty string parameter.";
  }

  // Break string up into blocks at each non-letter character, save non-letters for reincorporation before return
  // Does not break on spaces
  let stringBlocks = [];
  let searchingForNonLetters = true;
  while (searchingForNonLetters) {
    let nonLetterIndex = findNonLetters(input);
    if (nonLetterIndex >= 0) {
      stringBlocks.push(input.slice(0, nonLetterIndex));
      stringBlocks.push(input.slice(nonLetterIndex, nonLetterIndex + 1));
      input = input.slice(nonLetterIndex + 1);
    } else {
      stringBlocks.push(input);
      searchingForNonLetters = false;
    }
  }

  // Break word strings up at spaces, then send each word to pig latin translator function
  stringBlocks.forEach((block, index) => {
    if (findNonLetters(block) === -1 && block.length > 1) {
      let words = block.split(" ");
      let alteredWords = [];

      words.forEach((word) => {
        alteredWords.push(translateWord(word));
      });

      stringBlocks[index] = alteredWords.join(" ");
    }
  });

  res = stringBlocks.join("");
  return res;
}

// Function that translates a single word to pig latin
function translateWord (str) {
  let res;
  // Ignore the rare case where 'y' is a vowel at the beginning of a word
  let vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];

  if (vowels.includes(str.charAt(0))) {
    // Deal with simple case of words beginning with vowel
    res = str + "way";
  } else {
    // check for capitalization
    let isCaps = false;
    if (str.charAt(0) == str.charAt(0).toUpperCase()) {
      isCaps = true;
      str = str.charAt(0).toLowerCase() + str.slice(1);
    }

    // Find consonants at beginning of word
    let cons = true;
    let leadingCons = "";
    while (cons && str.length) {
      if (!vowels.includes(str.charAt(0))) {
        leadingCons += str.slice(0, 1);
        str = str.slice(1);
      } else {
        cons = false;
      }
    }

    // recapitalize word if necessary
    if (isCaps) {
      str = str.charAt(0).toUpperCase() + str.slice(1);
    }

    res = str + leadingCons + "ay";
  }
  return res;
}

function findNonLetters (str) {
  return str.search(/[^A-Za-z_]/g);
}
