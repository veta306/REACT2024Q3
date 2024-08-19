import * as yup from "yup";
import { FC, FormEvent, RefObject, createRef, useRef, useState } from "react";
import { formSchema } from "../../utils/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { submitForm } from "../../store/features/submissions";
import { useNavigate } from "react-router-dom";
import { imageToBase64 } from "../../utils/functions";
import { RawData } from "../../utils/types";
import PasswordStrength from "../../components/PasswordStrength/PasswordStrength";
import styles from "./UncontrolledForm.module.scss";

interface Errors {
  [key: string]: string | undefined;
}

const UncontrolledForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<Errors>({});

  const refs = useRef<{
    [key: string]: RefObject<HTMLInputElement>;
  }>({
    name: createRef(),
    age: createRef(),
    email: createRef(),
    password: createRef(),
    confirm: createRef(),
    files: createRef(),
    country: createRef(),
    terms: createRef(),
  });
  const genderRef = useRef<{
    [key: string]: RefObject<HTMLSelectElement>;
  }>({
    gender: createRef(),
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data: RawData = {
      name: refs.current.name.current?.value || "",
      age: Number(refs.current.age.current?.value) || 0,
      email: refs.current.email.current?.value || "",
      password: refs.current.password.current?.value || "",
      confirm: refs.current.confirm.current?.value || "",
      gender: genderRef.current.gender.current?.value ?? "",
      files: refs.current.files.current?.files || ({} as FileList),
      country: refs.current.country.current?.value || "",
      terms: refs.current.terms.current?.checked || false,
    };

    try {
      setErrors({});
      await formSchema.validate(data, { abortEarly: false });
      const imageBase64 = await imageToBase64(
        data.files instanceof FileList ? data.files[0] : data.files,
      );
      const convertedData = { ...data, files: imageBase64 };
      dispatch(submitForm(convertedData));
      navigate("/");
    } catch (errors) {
      if (errors instanceof yup.ValidationError) {
        const formErrors: Errors = {};
        errors.inner.forEach((error) => {
          if (error.path) {
            formErrors[error.path] = error.message;
          }
        });
        setErrors(formErrors);
      }
    }
  };
  const countries = useSelector(
    (state: RootState) => state.countries.countries,
  );

  return (
    <>
      <div className={styles.backArrow} onClick={() => navigate("/")}>
        <span className={styles.arrowIcon}>←</span>
        <span>Back to Home</span>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input ref={refs.current.name} id="name" />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input ref={refs.current.age} id="age" type="number" />
          {errors.age && <p>{errors.age}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input ref={refs.current.email} id="email" />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input ref={refs.current.password} id="password" type="password" />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <PasswordStrength
          password={refs.current.password.current?.value || ""}
        />
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            ref={refs.current.confirm}
            id="confirmPassword"
            type="password"
          />
          {errors.confirm && <p>{errors.confirm}</p>}
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select ref={genderRef.current.gender} id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p>{errors.gender}</p>}
        </div>
        <div>
          <label htmlFor="picture">Upload Picture</label>
          <input ref={refs.current.files} id="picture" type="file" />
          {errors.files && <p>{errors.files}</p>}
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input ref={refs.current.country} id="country" list="country-list" />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {errors.country && <p>{errors.country}</p>}
        </div>
        <div>
          <label style={{ display: "inline-block" }} htmlFor="terms">
            Accept Terms and Conditions
          </label>
          <input
            ref={refs.current.terms}
            style={{ width: "auto" }}
            id="terms"
            type="checkbox"
          />
          {errors.terms && <p>{errors.terms}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UncontrolledForm;
