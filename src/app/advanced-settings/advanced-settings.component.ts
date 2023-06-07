import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-advanced-settings',
  templateUrl: './advanced-settings.component.html',
  styleUrls: ['./advanced-settings.component.css']
})
export class AdvancedSettingsComponent {
  advancedSettingsForm = this.fb.group({
    type: [''],
    letter: [''],
  });

  constructor(private fb: FormBuilder) { }

}
