import React, { Component, createRef, SyntheticEvent, RefObject } from 'react';
import { UsersList } from './UsersList';
import checkValidation from 'helpers/checkValidation';
import getBase64 from 'helpers/getBase64';

export type Item = {
  name: string;
  date: string;
  country: string;
  consent: boolean;
  gender: string;
  file: string;
};

type State = {
  items: Item[];
  errors: Errors;
};

export type Errors = {
  [key: string]: string;
};
export class CreateUserForm extends Component<object, State> {
  private nameRef: RefObject<HTMLInputElement>;
  private dateRef: RefObject<HTMLInputElement>;
  private selectRef: RefObject<HTMLSelectElement>;
  private checkboxRef: RefObject<HTMLInputElement>;
  private radioRef: RefObject<HTMLInputElement>;
  private radioMale: RefObject<HTMLInputElement>;
  private radioFemale: RefObject<HTMLInputElement>;
  private fileRef: RefObject<HTMLInputElement>;

  initialState = { name: '' };
  state = {
    items: [],
    errors: {} as Errors,
  };
  constructor(props: object) {
    super(props);
    this.nameRef = createRef();
    this.dateRef = createRef();
    this.selectRef = createRef();
    this.checkboxRef = createRef();
    this.radioRef = createRef();
    this.radioMale = createRef();
    this.radioFemale = createRef();
    this.fileRef = createRef();
  }

  handleSubmitForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    const name = this.nameRef.current!.value;
    const date = this.dateRef.current!.value;
    const selectedIndex = this.selectRef.current!.selectedIndex;
    const selectedCountry = this.selectRef.current!.options[selectedIndex].value;
    const selectedRadio = this.radioMale.current!.checked
      ? this.radioMale.current!.value
      : this.radioFemale.current!.value;
    const checkbox = this.checkboxRef.current!.checked;
    const file = await getBase64(this.fileRef.current!.files);

    const [isValid, newErrors] = checkValidation(
      name,
      date,
      selectedCountry,
      this.radioMale.current!.checked,
      this.radioFemale.current!.checked,
      checkbox,
      file
    );
    if (!isValid) {
      this.setState({
        errors: newErrors,
      });
    }

    const newItem = {
      name: name,
      date: date,
      country: selectedCountry,
      consent: checkbox,
      gender: selectedRadio,
      file: file,
    };
    if (isValid) {
      this.setState((prevState) => {
        return {
          ...prevState,
          items: [...prevState.items, newItem],
          errors: { successful: 'Card created successful' },
        };
      });
    }
    this.nameRef.current!.value = '';
    this.dateRef.current!.value = '';
    this.selectRef.current!.value = '';
    this.checkboxRef.current!.checked = false;
    this.fileRef.current!.value = '';
    this.radioMale.current!.checked = false;
    this.radioFemale.current!.checked = false;
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="mb-4">
        <form
          className="w-full max-w-lg m-auto py-10 mt-10 px-10 border"
          onSubmit={this.handleSubmitForm}
        >
          <h2 className="text-lg text-gray-800 font-medium mb-4 flex justify-center">
            Create user card
          </h2>
          <label className="text-gray-600 font-medium"> Your Name:</label>
          <input
            ref={this.nameRef}
            className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700 mt-2"
            name="name"
            placeholder="Name"
            autoFocus
          />
          {errors.name && <div className="text-red-600">{errors.name}</div>}

          <label className="text-gray-600 font-medium">Date of birth:</label>
          <input
            ref={this.dateRef}
            type="date"
            className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700 mt-2"
            name="date"
            placeholder="Date"
            autoFocus
          />
          {errors.date && <div className="text-red-600">{errors.date}</div>}
          <label className="text-gray-600 font-medium mt-2">Country:</label>
          <select
            ref={this.selectRef}
            className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700 mt-2"
            name="name"
            placeholder="Name"
            autoFocus
          >
            <option value="">Choose a country</option>
            <option value="Belarus">Belarus</option>
            <option value="Russia">Russia</option>
            <option value="Poland">Poland</option>
            <option value="Germany">Germany</option>
          </select>
          {errors.country && <div className="text-red-600">{errors.country}</div>}
          <div className="flex items-center mt-6">
            <input
              ref={this.checkboxRef}
              id="checked-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-gray-700 bg-gray-100 border-gray-300 rounded focus:gray-500 dark:focus:gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              I consent to my personal data
            </label>
          </div>
          {errors.consent && <div className="text-red-600">{errors.consent}</div>}
          <div className="text-gray-600 font-medium mt-4">Choose a gender:</div>
          <div className="flex gap-2 mt-2">
            <label htmlFor="radio-one">
              <input ref={this.radioMale} type="radio" name="gender" value="Male" id="radio-one" />
              Male
            </label>
            <label htmlFor="radio-two">
              <input
                ref={this.radioFemale}
                type="radio"
                name="gender"
                value="Female"
                id="radio-two"
              />
              Female
            </label>
          </div>
          {errors.gender && <div className="text-red-600">{errors.gender}</div>}
          <div className="mt-4">
            <label className="text-gray-600 font-medium mt-2">Choose a profile picture:</label>
            <input ref={this.fileRef} type="file" />
          </div>
          {errors.file && <div className="text-red-600">{errors.file}</div>}
          {errors.successful && <div className="text-green-600">{errors.successful}</div>}
          <button
            className=" flex mt-4 w-[100px] bg-gray-600 hover:bg-gray-800 text-white border py-3 px-6 font-semibold text-md rounded mx-auto"
            type="submit"
          >
            Submit
          </button>
        </form>
        <UsersList items={this.state.items} />
      </div>
    );
  }
}
