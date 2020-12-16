import { AbstractControl } from '@angular/forms';

export function disablePrefixSpace(control: AbstractControl) {
    if (control && control.value && !control.value.replace(/\s+/g, '').length) {
        control.setValue(null);
        control.setErrors({ "invalid": true });
        return { "invalid": true };
    }
    return null;
}

export function disablePrefixSpaceForNM(control: AbstractControl) {
    if (control && control.value && !control.value.replace(/\s+/g, '').length) {
        control.setValue(null);
    }
    return null;
}