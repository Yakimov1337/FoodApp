import { ValidatorFn, AbstractControl } from '@angular/forms';

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      // If there's no value, don't apply URL validation (consider it optional)
      return null;
    }

    try {
      new URL(control.value);
      return null; // Valid URL
    } catch {
      return { invalidUrl: true }; // Invalid URL
    }
  };
}
