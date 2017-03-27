import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {validateSync, ValidationError} from 'class-validator';

import {Author} from './../book/model/author.model';
import {Book} from './../book/model/book.model';
import {PropertyUtils} from './../shared/property.utils';
import {DynaMetaUtils} from './dyna-meta.utils';

/**
 * Custom angular validator for pleerock class-validator decorators.
 */
export class DynaValidator {
  /**
   * Validate the value of the specified AbstractControl
   *
   * @param fieldControl Control to validate
   */
  public static validateControl(fieldControl: AbstractControl) {
    let valid = null;
    const controlName = DynaValidator.getControlName(fieldControl);
    if (controlName) {
      const classConstructor = DynaMetaUtils.getMetaConstructor(fieldControl.parent);

      const obj = new classConstructor();

      const transformedValue =
          PropertyUtils.transformPropertyValue(classConstructor, controlName, fieldControl.value);

      PropertyUtils.setProperty(obj, controlName, transformedValue);

      const valResult: ValidationError[] = validateSync(obj, { skipMissingProperties: true });

      if (valResult.length > 0) {
        const msgs: Array<String> =
            DynaValidator.convertValidationErrorToMsgsArray(valResult, controlName);
        if (msgs && msgs.length > 0) {
          valid = { customErr: { noValid: true, messages: msgs } };
        }
      }
    }


    return valid;
  }


  private static convertValidationErrorToMsgsArray(
      result: ValidationError[], propertyName: string, msgs: Array<String> = []): Array<String> {
    for (const valid of result) {  // iterate list
      if (valid.property === propertyName && valid.constraints) {
        for (const constr in valid.constraints) {  // iterate object properties
          if (valid.constraints.hasOwnProperty(constr)) {
            msgs.push(valid.constraints[constr]);
          }
        }
      }
      if (valid.children && valid.children.length > 0) {
        this.convertValidationErrorToMsgsArray(
            valid.children, propertyName, msgs);  // find constraints in children
      }
    }

    return msgs;
  }


  private static getControlName(control: AbstractControl) {
    let controlName = null;
    const parent = control['parent'];

    if (parent instanceof FormGroup) {  // iterate only if parent is a FormGroup
      Object.keys(parent.controls).forEach((name) => {
        // compare passed control with child control
        if (control === parent.controls[name]) {  // if same references
          controlName = name;
        }
      });
    }
    return controlName;  // return the name or null if not found
  }
}
