import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {DynaMetaUtils} from './dyna-meta.utils';
import {DynaValidator} from './dyna.validator';


@Injectable()
export class DynaFormBuilder {
  constructor(public fb: FormBuilder) {}

  public buildFormFromClass(classConstructor: new() => Object): FormGroup {
    const classInstance = new classConstructor();

    console.log('create form based on model: ' + (classInstance.constructor.name));

    const formControls = {};
    const formFieldList: any = [];
    Object.keys(classInstance).forEach(key => {
      formControls[key] = new FormControl(null, DynaValidator.validateControl);
      formFieldList.push(key);
    });

    const formInstance = this.fb.group(formControls);
    DynaMetaUtils.setMetaConstructor(classConstructor, formInstance);
    formInstance['formFields'] = formFieldList;

    return formInstance;
  }
}
