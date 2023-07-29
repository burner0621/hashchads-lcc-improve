import * as Yup from 'yup';
// utils
import { fData } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

export const defaultValues = {
  fullName: '',
  email: '',
  age: '',
  startDate: null,
  endDate: null,
  password: '',
  confirmPassword: '',
  editor: '',
  photo: null,
  terms: false,
};

const MAX_FILE_SIZE = 2 * 1000 * 1000; // 2 Mb
const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

export const FormSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is required')
    .min(8, 'Mininum 6 characters')
    .max(24, 'Maximum 15 characters'),
  email: Yup.string().required('Email is required').email('That is not an email'),
  age: Yup.number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer()
    .moreThan(18, 'Age must be greater than or equal to 18')
    .lessThan(120, 'Age must be less than or equal to 120'),
  startDate: Yup.date().nullable().required('Start date is required'),
  endDate: Yup.date()
    .required('End date is required')
    .nullable()
    .min(Yup.ref('startDate'), 'End date must be later than start date'),
  password: Yup.string().required('Password is required').min(6, 'Password should be of minimum 6 characters length'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], "Password's not match"),
  editor: Yup.string().required('Editor is required'),
  terms: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
  photo: Yup.mixed()
    .required('Photo is is required')
    .test('fileFormat', 'Unsupported Format', (value) => value && FILE_FORMATS.includes(value.type))
    .test(
      'fileSize',
      `File must be less than or equal to ${fData(MAX_FILE_SIZE)}`,
      (value) => value && value.size <= MAX_FILE_SIZE
    ),
});

export { default as ReactHookForm } from './ReactHookForm';
