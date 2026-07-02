import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";

const LoginPage = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div>
      <h1>Login</h1>
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
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default LoginPage;
