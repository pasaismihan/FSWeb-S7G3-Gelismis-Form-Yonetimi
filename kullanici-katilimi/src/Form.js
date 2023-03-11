import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FormFeedback,
} from "reactstrap";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    user: "",
    email: "",
    password: "",
    confirmPass: "",
    keepMe: false,
  });
  const [userLoginErrors, setUserLoginErrors] = useState({
    user: "",
    email: "",
    password: "",
    confirmPass: "",
    keepMe: false,
  });
  const [disableButton, setDisableButton] = useState(true);

  const userFormSchema = Yup.object().shape({
    user: Yup.string().required("isim alani zorunludur"),
    email: Yup.string()
      .email("gecerli bir email adresi girin")
      .required("bu alani bos birakmayin"),
    password: Yup.string()
      .required("password alani zorunludur")
      .min(6, "password must be at least 6 characters long"),
    confirmPass: Yup.string()
      .required("password alani zorunludur")
      .min(6, "password must be at least 6 characters long"),
    keepMe: Yup.boolean()
      .oneOf([true])
      .required(["you must be check that button "]),
  });

  useEffect(() => {
    userFormSchema.isValid(userLogin).then((valid) => setDisableButton(!valid));
  }, [userLogin]);

  const changeHandler = (e) => {
    Yup.reach(userFormSchema, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setUserLoginErrors({ ...userLoginErrors, [e.target.name]: "" });
      })
      .catch((err) => {
        setUserLoginErrors({
          ...userLoginErrors,
          [e.target.name]: err.errors[0],
        });
      });

    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const keepmeChangeHandler = (e) => {
    Yup.reach(userFormSchema, e.target.name)
      .validate(e.target.checked)
      .then(() => {
        setUserLoginErrors({ ...userLoginErrors, [e.target.name]: "" });
      })
      .catch((err) => {
        setUserLoginErrors({
          ...userLoginErrors,
          [e.target.name]: err.errors[0],
        });
      });
    setUserLogin({ ...userLogin, keepMe: e.target.checked });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("https://mockworker.com/login", userLogin).then((res) => {
      console.log("login res data > ", res.data);
    });
  };
  const resetForm = () => {
    setUserLogin({
      user: "",
      email: "",
      password: "",
      confirmPass: "",
      keepMe: false,
    });
  };

  useEffect(() => console.log(userLogin), [userLogin]);
  return (
    <div className="login-form p-3 border border-primary-subtle rounded shadow ">
      <h2 className="text-primary">Login Form</h2>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Label for="user">User</Label>
          <Input
            type="text"
            name="user"
            id="user"
            placeholder="user"
            onChange={changeHandler}
            value={userLogin.user}
            required
            invalid={userLoginErrors.user}
          />
          <FormFeedback>{userLoginErrors.user}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="user-mail">Email</Label>
          <Input
            type="email"
            name="email"
            id="user-mail"
            placeholder="abc@abc.com"
            onChange={changeHandler}
            value={userLogin.email}
            invalid={userLoginErrors.email}
          />
          <FormFeedback>{userLoginErrors.email}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="user-pass">Password</Label>
          <Input
            type="password"
            name="password"
            id="user-pass"
            onChange={changeHandler}
            value={userLogin.password}
            invalid={userLoginErrors.password}
          />
          <FormFeedback>{userLoginErrors.password}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="confirmPass">Confirm Password</Label>
          <Input
            type="password"
            name="confirmPass"
            id="confirmPass"
            onChange={changeHandler}
            value={userLogin.confirmPass}
            invalid={userLoginErrors.confirmPass}
          />
          <FormFeedback>{userLoginErrors.confirmPass}</FormFeedback>
        </FormGroup>
        <FormGroup check>
          <Label check> Keep me signed in </Label>
          <Input
            type="checkbox"
            id="user-keepme"
            name="keepMe"
            onChange={keepmeChangeHandler}
            checked={userLogin.keepMe}
            invalid={userLoginErrors.keepMe}
          />
          <FormFeedback>{userLoginErrors.keepMe}</FormFeedback>
        </FormGroup>

        <Button type="button" onClick={resetForm}>
          Reset Form
        </Button>
        <Button type="submit" color="primary" disabled={disableButton}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
