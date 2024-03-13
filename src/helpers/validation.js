export async function validateEmail(value) {
  const percent = Math.floor(Math.random() * 101);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value.length > 0 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        reject('Invalid email address');
      } else if(value.length > 0){
        if(value.length > 0 && percent <= 25){
          reject('25% email is not valid');
        }else{
          resolve('');
        }
      }

    }, 1000)
  })
    .then(result => result)
    .catch(err => err)
}
  
export function validateName(value) {
  let error = '';
  if (!value) {
      error = 'Required';
  } else if(!/^[A-Za-zА-Яа-яЁёІіЇїЄє\-]+$/i.test(value)) {
      error = 'Field must be contain only letters and -';
  }
  return error;
}

export function validatePhone(value, phones = []) {
  let hasPhone = false;

  phones.forEach((phone)=>{
    if(phone && phone.length === 15){
      hasPhone = true;
    }else if(phone && phone.length > 0){
      hasPhone = false
    }
    return hasPhone;
  });
  

  let error = '';
  
  if (!hasPhone && value.length < 15) {
    error = 'Field is required and must be contain 9 Symbols!';
  } 
  return error;
}

export function validateCountry(value) {
  let error = '';
  if (value === 'Сhoose a country') {
    error = 'Please selected country';
  } 
  return error;
}

export function validateAddress(value) {
  let error = '';
  if (value.length <3) {
    error = 'Field is required and must be contain min 3 Symbols!';
  } else if (value.length > 40){
    error = 'Field must be contain max 40 Symbols!';
  }
  return error;
}
  
export function validateCVV2(value) {
    let error = '';
    if (!value) {
        error = 'Required';
    } else if (String(value).length<3) {
        error = 'Field must be contains 3 digits';
    }
    return error;
}

export function validateCreditCard(value) {
  let error = '';
  if (!value) {
      error = 'Required';
  } else if (value.length !== 19) {
      error = 'Field must be contains 16 digits';
  }
  return error;
}

export function validateTerms(value) {
  let error;
  if (!value) {
      error = 'The terms and conditions must be accepted';
  } 
  return error;
}
