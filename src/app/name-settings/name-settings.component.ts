import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { getCharacters, handleCombineName, } from '../utils/settingsUtils';
import { letters } from '../commons/commons';

@Component({
  selector: 'app-name-settings',
  templateUrl: './name-settings.component.html',
  styleUrls: ['./name-settings.component.css']
})
export class NameSettingsComponent {
  // @Output() notify = new EventEmitter();
  settingsForm = this.fb.group({
    lengthOptions: 'random',
    lengthSettings: this.fb.group({
      minLength: 3,
      maxLength: 3,
    }),
    duplicateSettings: this.fb.group({
      allowDuplicateConsonants: true,
      allowDuplicateVowels: true,
      allowLimitDuplicateVowels: true,
      allowLimitDuplicateConsonants: true,
      totalDuplicateVowels: 2,
      totalDuplicateConsonants: 2,
      consecutiveDuplicateConsonants: 2,
      consecutiveDuplicateVowels: 2,
    }),
    advancedSettings: this.fb.group({
      yOptions: 'both',
      useMaxVowels: true,
      useMaxConsonants: true,
      maxConsonants: 2,
      maxVowels: 2,
      iterations: 5,
      allowDuplicates: true,
      allowConsecutiveDuplicates: true,
    }),
    exactLength: null,
    specificCharacterSettings: this.fb.group({
      characterSettings: this.fb.array([]),
      specificCharacters: this.fb.array([]),
      includeExcludeOptions: this.fb.array([])
    }),
  });
  shouldShowspecificCharacterSettings: boolean = false;
  shoudShowAdvancedSettings: boolean = false;
  results: string[] = []

  constructor(private fb: FormBuilder) { }

  get addCharacterSettings() {
    return this.settingsForm.get('specificCharacterSettings.characterSettings') as FormArray
  }

  get addSpecificCharaters() {
    return this.settingsForm.get('specificCharacterSettings.specificCharacters') as FormArray
  }

  get addExcludeCharacters() {
    return this.settingsForm.get('specificCharacterSettings.includeExcludeOptions') as FormArray
  }

  handleIterationsChange(event: Event) {
    const e: number = parseInt((event.target as HTMLInputElement).value);
    const test = this.addCharacterSettings
    if (e < this.addCharacterSettings.length) {
      for (let i = 0; i <= test.length; i++) {
        if (i + 1 > e) {
          this.addCharacterSettings.removeAt(i)
          this.addSpecificCharaters.removeAt(i)
          this.addExcludeCharacters.removeAt(i)
        }
      }
    } else if (e > this.addCharacterSettings.length) {
      for (let i = 0; i <= e - this.addCharacterSettings.length; i++) {
        this.addCharacterSettings.push(this.fb.control(''))
        this.addSpecificCharaters.push(this.fb.control(''))
        this.addExcludeCharacters.push(this.fb.control(''))
      } 
    } else return
  }

  onShowAdvancedSettings = () => this.shoudShowAdvancedSettings = !this.shoudShowAdvancedSettings
  onShowspecificCharacterSettings = () => this.shouldShowspecificCharacterSettings = !this.shouldShowspecificCharacterSettings
  onSubmit = () => {
    const values = this.settingsForm.value 
    const iterations: number = values?.advancedSettings?.iterations || 5
    const nameArray: string[] = []
    const minLength: number = values?.lengthSettings?.minLength || 3  
    const maxLength: number = values?.lengthSettings?.maxLength || 3
    for (let i: number = 0; i < iterations; i++) {
      let letterArray: letters = []
      if (values.lengthOptions === 'exact') {
        letterArray = getCharacters(values.exactLength || 5, values?.advancedSettings, values?.specificCharacterSettings)
    } else if (values.lengthOptions === 'range') {
      const rangeInteration =  Math.floor(Math.random() * (maxLength - minLength) + minLength);
      letterArray = getCharacters(rangeInteration, values?.advancedSettings, values?.specificCharacterSettings?.characterSettings)
    } else {
      const randomInteration =  Math.floor(Math.random() * (8 - 3) + 3);
      letterArray = getCharacters(randomInteration, values?.advancedSettings, values?.specificCharacterSettings?.characterSettings)
    }
      nameArray.push(handleCombineName(letterArray))
    }

    this.results = nameArray
  }
  check = (val: any) => console.log('val', val)
}
