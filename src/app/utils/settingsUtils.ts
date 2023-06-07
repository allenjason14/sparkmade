import { vowels, consonants, letters, vowelsWithY, alphabet } from '../commons/commons';


const includeExcludeCharacters = (letters: letters, characterList: any, char: string) => {
    const newLetters = letters
    const splitCharacterList = characterList.split('')
    let finalLetters = []
    if (char === 'exclude') {
        finalLetters = newLetters.filter(letter => !splitCharacterList.includes(letter.value))
    } else {
        finalLetters = newLetters.filter(letter => splitCharacterList.includes(letter.value))
    }
    console.log('newLetters', { newLetters, characterList, splitCharacterList, finalLetters })
    return finalLetters
}

export const getRandomCharacter = (initialArr: letters, advancedSettings: any, characterSettings: any, letterArray: letters, index: number, char?: string) => {
    const { useMaxConsonants, useMaxVowels } = advancedSettings
    const { specificCharacters, includeExcludeOptions } = characterSettings
    const charSettings = characterSettings?.characterSettings
    let typeToUse: letters = initialArr
    if ((useMaxConsonants || useMaxVowels && letterArray.length > 0) && (charSettings?.[index] !== 'vowel' && charSettings?.[index] !== 'consonant')) {
        console.log('are we hitting inside the specific type')
        typeToUse = handleNeedsSpecificType(advancedSettings, letterArray)
    } 
    if (includeExcludeOptions?.[index] === 'exclude' && specificCharacters[index].length > 0) {
        typeToUse = includeExcludeCharacters(typeToUse, specificCharacters[index], 'exclude')
    } else if (includeExcludeOptions?.[index] === 'specific' && specificCharacters[index].length > 0) {
        typeToUse = includeExcludeCharacters(typeToUse, specificCharacters[index], 'include')
    }
    return getCharacter(typeToUse)
}


const handleNeedsSpecificType = (advancedSettings: any, letterArray: letters) => {
    const { maxVowels, maxConsonants } = advancedSettings
    const firstType = letterArray[letterArray.length - 1]?.type
    const steps: number = firstType === 'consonant' ? maxConsonants : maxVowels
    const arrToCheck = letterArray.slice(-steps)
    const arrToTest = arrToCheck[0]
    if (arrToCheck.length < steps) {
        return alphabet
    }
    const newArr = arrToCheck.filter(arr => arr.type !== arrToTest.type)
    if (newArr.length > 0) { 
        return alphabet         
    }
    return firstType === 'consonant' ? 
        ( advancedSettings.yOptions === 'include' ? vowelsWithY : vowels)
        : consonants
}

export const getCharacter = (arr: letters) => {
    const potentialLetter = arr[Math.floor(Math.random() * arr.length)]
    return potentialLetter
}

export const handleCombineName = (arr: letters): string => {
    const newArr = arr.map(val => val.value)
    return newArr.join('')
}


export const getCharacters = (letterLength: number, advancedSettings: any, characterSettings: any) => {
    let letterArray = [];

    for (let i = 0; i < letterLength; i++) {
        let letter; 
        const char = characterSettings?.characterSettings?.[i] || ''
        switch(char) {
          case 'vowel': letter = getRandomCharacter(vowels, advancedSettings, characterSettings, letterArray, i)
          break;
          case 'consonant': letter = getRandomCharacter(consonants, advancedSettings, characterSettings, letterArray, i)
          break;
          case 'random': letter = getRandomCharacter(alphabet, advancedSettings, characterSettings, letterArray, i)
          break;
          default: letter = getRandomCharacter(alphabet, advancedSettings, characterSettings, letterArray, i)
        } 
        letterArray.push(letter)       
    }
    return letterArray    
}
