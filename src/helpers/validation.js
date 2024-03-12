export function validateEmail(value) {
    let error;
    if (value.length>0 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
}
  
export function validateFirstname(value) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[A-Za-zА-Яа-яЁёІіЇїЄє\-]+$/i.test(value)) {
      error = 'Field is required and must be contain only letters and -';
    }
    return error;
}
  
export function validateLastname(value) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[A-Za-zА-Яа-яЁёІіЇїЄє\-]+$/i.test(value)) {
      error = 'Field is required and must be contains only letters and -';
    }
    return error;
}
  
export function validateCVV2(value) {
    let error;
    if (!value) {
        error = 'Required';
    } else if (String(value).length<3) {
        error = 'Field is required and must be contains 3 digits';
    }
    return error;
}