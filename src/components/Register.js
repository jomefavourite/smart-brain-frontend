import { useState } from "react";

const Register = ({ onRouteChange, loadUser }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: ""
  });

  let onNameChange = (e) => {
    setState((state) => {
      return { ...state, name: e.target.value };
    });
  };

  let onEmailChange = (e) => {
    setState((state) => {
      return { ...state, email: e.target.value };
    });
  };

  let onPasswordChange = (e) => {
    setState((state) => {
      return { ...state, password: e.target.value };
    });
  };

  const onSubmit = () => {
    fetch("https://immense-hamlet-18637.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: state.email,
        password: state.password,
        name: state.name
      })
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        }
      });
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" forhtml="email-address">
                Name
              </label>
              <input
                onChange={(e) => onNameChange(e)}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" forhtml="email-address">
                Email
              </label>
              <input
                onChange={(e) => onEmailChange(e)}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" forhtml="password">
                Password
              </label>
              <input
                onChange={(e) => onPasswordChange(e)}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={() => onSubmit()}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
            />
          </div>
        </div>
      </main>
    </article>
  );
};

export default Register;
