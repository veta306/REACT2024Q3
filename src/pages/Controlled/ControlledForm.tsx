import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "../../utils/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { submitForm } from "../../store/features/submissions";
import { useNavigate } from "react-router-dom";
import { imageToBase64 } from "../../utils/functions";
import { RawData } from "../../utils/types";
import PasswordStrength from "../../components/PasswordStrength/PasswordStrength";
import styles from "./ControlledForm.module.scss";

const ControlledForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(formSchema), mode: "onChange" });

  const onSubmit = async (data: RawData) => {
    const imageBase64 = await imageToBase64(
      data.files instanceof FileList ? data.files[0] : data.files,
    );
    const convertedData = { ...data, files: imageBase64 };

    dispatch(submitForm(convertedData));
    reset();
    navigate("/");
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input id="age" type="number" {...register("age")} />
          {errors.age && <p>{errors.age.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <PasswordStrength password={watch("password")} />
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirm")}
          />
          {errors.confirm && <p>{errors.confirm.message}</p>}
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select id="gender" {...register("gender")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>

        <div>
          <label htmlFor="picture">Upload Picture</label>
          <input id="picture" type="file" {...register("files")} />
          {errors.files && <p>{errors.files.message}</p>}
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input id="country" list="country-list" {...register("country")} />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {errors.country && <p>{errors.country.message}</p>}
        </div>
        <div>
          <label style={{ display: "inline-block" }} htmlFor="terms">
            Accept Terms and Conditions
          </label>
          <input
            style={{ width: "auto" }}
            id="terms"
            type="checkbox"
            {...register("terms")}
          />
          {errors.terms && <p>{errors.terms.message}</p>}
        </div>
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </>
  );
};

export default ControlledForm;
