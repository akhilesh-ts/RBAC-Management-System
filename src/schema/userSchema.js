import * as Yup from 'yup'


   export const userValidation = Yup.object({
      email: Yup.string()
        .matches(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          'Invalid email format'
        )
        .required('Email is required'),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          'Password must be at least 8 characters long, include one uppercase, one lowercase, one number, and one special character'
        )
        .required('Password is required'),
      name: Yup.string()
        .matches(
          /^[a-zA-Z0-9]{3,15}$/,
          'Username must be 3-15 characters and alphanumeric'
        )
        .required('Username is required'),
        role: Yup.string()
        .test(
          'not-default',
          'Please select a valid role',
          (value) => value && value !== 'default' // Ensure the value isn't "default"
        )
        .required('Role is required'),
    })


    export const loginValidation=Yup.object({
      email: Yup.string()
        .matches(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          'Invalid email format'
        )
        .required('Email is required'),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          'Password must be at least 8 characters long, include one uppercase, one lowercase, one number, and one special character'
        )
        .required('Password is required'),
    })