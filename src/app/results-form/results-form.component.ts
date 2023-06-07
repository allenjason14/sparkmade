import { AnimationStyleMetadata } from '@angular/animations';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-results-form',
  templateUrl: './results-form.component.html',
  styleUrls: ['./results-form.component.css']
})
export class ResultsFormComponent {
  @Input() results: string[] | undefined;
  @Input() iterations: any;

  test = () => console.log(this.results) 
  resultsForm = this.fb.group({
    originalName: this.fb.array([]),
    newName: this.fb.array([]),
    isSelected: this.fb.array([])
  });
  shouldShow: number[] = []
  touched: boolean = false
  onSubmit = () => console.log('values', this.resultsForm.value)
  
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const change = changes[propName]
      if (propName === 'results') {
        if (change?.previousValue?.length === 0 && !this.touched) {
          this.buildForm()
          this.touched = true
        }
      } else if (propName === 'iterations') {
        const iterations = change?.currentValue - change?.previousValue
        if (iterations > 0) {
          for (let i = 0; i < iterations; i++) {
            this.addNewName.push(this.fb.control(''))
            this.addOriginalName.push(this.fb.control(''))
            this.addIsSelected.push(this.fb.control(false))
          }
        }
      } else {
        for (let i = change?.currentValue; i < this.addNewName.length; i++) {
          this.addOriginalName.removeAt(i)
          this.addNewName.removeAt(i)
        }
      }
    }
  }

  buildForm() {
    this.results?.map((res: any) => { 
      this.addNewName.push(this.fb.control(''))
      this.addOriginalName.push(this.fb.control(res))  
      this.addIsSelected.push(this.fb.control(false))
    })
  }
  
  nameSettings = () => {
      this.results?.map((res: any) => { 
        this.addNewName.push(this.fb.control(res))  
      })
    }

  constructor(private fb: FormBuilder) {}

  get addOriginalName() {
    return this.resultsForm.get('originalName') as FormArray
  }

  get addNewName() {
    return this.resultsForm.get('newName') as FormArray
  }

  get addIsSelected() {
    return this.resultsForm.get('isSelected') as FormArray
  }
}

