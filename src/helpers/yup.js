import * as Yup from 'yup';

export const DisplayingErrorMessagesSchema = Yup.object().shape({
  address: Yup.string()
    .min(3, 'Field is required and must be contains minimum 3 Symbols!')
    .max(40, 'Field is required and must be contains maximum 40 Symbols!')
    .required('Required'),
  
  terms: Yup.boolean()
    .required("The terms and conditions must be accepted.")
    .oneOf([true], "The terms and conditions must be accepted.")
  });