import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  console.log(control);
  
  //const password         = control.get('password');
  // const confirmPassword  = control.get('confirmPassword');

  // if (!password || !confirmPassword) {
  //   return null;
  // }

 // return password!.value === confirmPassword!.value ? null : { 'passwordMismatch': true };
 return null;
}



// export const checkEquality = (source: string, target: string) => {
//     return (group: AbstractControl): ValidationErrors | null =>{
//         const sourceVal = group.get(source)?.value;
//         const targetVal = group.get(target)?.value;
//         if (sourceVal !== targetVal) {
//             return {notEqual: true}
//         }
//         return null;
//     }
// }