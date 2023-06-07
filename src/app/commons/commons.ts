export type letter = {value: string, type: 'consonant' | 'vowel' | 'fluid' }
export type letters = letter[]

export const consonants: letters = [
    { value: 'b', type: 'consonant'}, 
    { value: 'c', type: 'consonant'},
    { value: 'd', type: 'consonant'},
    { value: 'f', type: 'consonant'},
    { value: 'g', type: 'consonant'},
    { value: 'h', type: 'consonant'},
    { value: 'j', type: 'consonant'},
    { value: 'k', type: 'consonant'},
    { value: 'l', type: 'consonant'},
    { value: 'm', type: 'consonant'},
    { value: 'n', type: 'consonant'},
    { value: 'p', type: 'consonant'},
    { value: 'q', type: 'consonant'},
    { value: 'r', type: 'consonant'},
    { value: 's', type: 'consonant'},
    { value: 't', type: 'consonant'},
    { value: 'v', type: 'consonant'},
    { value: 'w', type: 'consonant'},
    { value: 'x', type: 'consonant'},
    { value: 'z', type: 'consonant'},
]
export const vowels: letters = [
    { value: 'a', type: 'vowel'}, 
    { value: 'e', type: 'vowel'},
    { value: 'i', type: 'vowel'},
    { value: 'o', type: 'vowel'},
    { value: 'u', type: 'vowel'},
];

export const vowelsWithY: letters = [
    ...vowels,
    { value: 'y', type: 'vowel' }
]

export const alphabet: letters = [
    ...vowelsWithY, ...consonants,
]