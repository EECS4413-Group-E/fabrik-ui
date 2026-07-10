import { useForm } from "@tanstack/react-form";
import { useRegisterMutation } from "../../mutations";
import { Link, useNavigate } from "@tanstack/react-router";

const RegisterPage = () => {
  const { mutate: register, isPending, error } = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      register(value, {
        onSuccess: () => navigate({ to: "/user", replace: true })
      })
    },
  });

  return (
    <div>
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field name="email">
          {(field) => (
            <div>
              <label htmlFor={field.name}>Email:</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              ></input>
            </div>
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <div>
              <label htmlFor={field.name}>Password:</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="password"
              ></input>
            </div>
          )}
        </form.Field>
        <form.Field
          name="confirmPassword"
          validators={{
            onChangeListenTo: ["password"],
            onChange: ({ value, fieldApi }) => {
              if (value !== fieldApi.form.getFieldValue("password")) {
                return "Passwords do not match";
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <div>
              <label htmlFor={field.name}>Confirm Password:</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="password"
              ></input>
              {field.state.meta.errors.map((err) => (
                <div key={err}>{err}</div>
              ))}
            </div>
          )}
        </form.Field>
        <button type="submit" disabled={isPending}>
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>
      <Link to="/login">Login</Link>
      <p>{error?.message}</p>
    </div>
  );
};

export default RegisterPage;
