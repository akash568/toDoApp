import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formDetail } from '../models/form.model';

/**
 * Service to reuse form related operations b/w components
 * 
 */
@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  /**
   * Generate form based on given values and return
   * 
   * @remarks This method is currently limited to required validaton only
   * 
   * @param formDetails Form details to generate form
   * @returns Generated FormGroup
   */
  formGenerator(formDetails: formDetail[]) {
    const group: any = {};

    for(let detail of formDetails) {
        group[detail.key] = detail.required
        ? new FormControl(detail.value || '', Validators.required)
        : new FormControl(detail.value || '');
    }
    return new FormGroup(group);
  }
}
