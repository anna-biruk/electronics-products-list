import React, { useState } from 'react';
import { UsersList } from './UsersList';
import { useForm, SubmitHandler } from 'react-hook-form';
import readFileAsBase64 from '../helpers/readFileBase64';
import { useDispatch, useSelector } from 'react-redux';
import { addFormData, selectFormData } from 'features/charactersSlice';

export type Inputs = {
  name: string;
  date: string;
  country: string;
  consent: boolean;
  gender: string;
  file: string;
};

export const CreateUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState('');
  const [base64File, setBase64File] = useState<string>('');
  const formData = useSelector(selectFormData);

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files) {
        return null;
      }
      const file = event.target.files[0];
      const base64 = await readFileAsBase64(file);
      setBase64File(base64);
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newData = { ...data, file: base64File };
    dispatch(addFormData(newData));
    reset();
    setSuccessMessage('Form submitted successfully!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 2000);
  };

  return (
    <div className="mb-4">
      <form
        className="w-full max-w-lg m-auto py-10 mt-10 px-10 border"
        onSubmit={handleSubmit(onSubmit)}
        id="my-form"
        data-testid
      >
        <h2 className="text-lg text-gray-800 font-medium mb-4 flex justify-center">
          Create user card
        </h2>
        <label htmlFor="name-input" className="text-gray-600 font-medium">
          {' '}
          Your Name:
        </label>
        <input
          {...register('name', { required: true, maxLength: 20 })}
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700 mt-2"
          name="name"
          id="name-input"
          placeholder="Name"
          autoFocus
        />
        {errors.name && <div className="text-red-600">Name field is required</div>}
        <label htmlFor="date" className="text-gray-600 font-medium">
          Date of birth:
        </label>
        <input
          {...register('date', { required: true })}
          type="date"
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700 mt-2"
          name="date"
          id="date"
          placeholder="Date"
          autoFocus
        />
        {errors.date && <div className="text-red-600">Date field is required</div>}
        <label htmlFor="country-select" className="text-gray-600 font-medium mt-2">
          Country:
        </label>
        <select
          {...register('country', { required: true })}
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700 mt-2"
          name="country"
          id="country-select"
          autoFocus
        >
          <option value="">Choose a country</option>
          <option value="Belarus">Belarus</option>
          <option value="Russia">Russia</option>
          <option value="Poland">Poland</option>
          <option value="Germany">Germany</option>
        </select>
        {errors.country && <div className="text-red-600">Country field is not selected</div>}
        <div className="flex items-center mt-6">
          <input
            {...register('consent', { required: true })}
            id="my-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-gray-700 bg-gray-100 border-gray-300 rounded focus:gray-500 dark:focus:gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="my-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I consent to my personal data
          </label>
        </div>
        {errors.consent && <div className="text-red-600">Check the consent!</div>}
        <div className="text-gray-600 font-medium mt-4">Choose a gender:</div>
        <div className="flex gap-2 mt-2">
          <label htmlFor="radio-one">
            <input {...register('gender')} type="radio" name="gender" value="Male" id="radio-one" />
            Male
          </label>
          <label htmlFor="radio-two">
            <input
              {...register('gender', { required: true })}
              type="radio"
              name="gender"
              value="Female"
              id="radio-two"
            />
            Female
          </label>
        </div>
        {errors.gender && <div className="text-red-600">The gender field is not selected</div>}
        <div className="mt-4">
          <label htmlFor="file" className="text-gray-600 font-medium mt-2">
            Choose a profile picture:
          </label>
          <input
            {...register('file', { required: true })}
            type="file"
            id="file"
            onChange={handleFileInputChange}
          />
        </div>
        {errors.file && <div className="text-red-600">File is not uploaded</div>}
        {successMessage && <div className="text-green-600">{successMessage}</div>}
        <button
          className=" flex mt-4 w-[100px] bg-gray-600 hover:bg-gray-800 text-white border py-3 px-6 font-semibold text-md rounded mx-auto"
          type="submit"
        >
          Submit
        </button>
      </form>
      <UsersList items={formData} />
    </div>
  );
};
