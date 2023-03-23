import { Errors } from 'components/CreateUserForm';

const checkValidation = (
  name: string,
  date: string,
  country: string,
  checkedMale: boolean,
  checkedFemale: boolean,
  consent: boolean,
  file: string
): [boolean, Errors] => {
  let isValid = true;
  const newErrors: Errors = {};
  if (!name.trim()) {
    isValid = false;
    newErrors.name = 'Name is required';
  } else {
    isValid = true;
  }
  if (!date) {
    isValid = false;
    newErrors.date = 'Date is required';
  } else {
    isValid = true;
  }
  if (!country) {
    isValid = false;
    newErrors.country = 'Country is not selected ';
  } else {
    isValid = true;
  }
  if (!checkedMale && !checkedFemale) {
    isValid = false;
    newErrors.gender = 'Gender is not selected';
  } else {
    isValid = true;
  }
  if (!consent) {
    isValid = false;
    newErrors.consent = 'Check the consent!';
  } else {
    isValid = true;
  }
  if (!file) {
    isValid = false;
    newErrors.file = 'Upload the file';
  } else {
    isValid = true;
  }
  return [isValid, newErrors];
};

export default checkValidation;
