import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import type { LoginRegisterRequest } from "../../models/User";
import { useLoginMutation } from "../../mutations";

const LoginPage = () => {
  const { mutate: login, isPending, error } = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as LoginRegisterRequest,
    onSubmit: async ({ value }) => {
      login(value, {
        onSuccess: () => navigate({ to: "/user", replace: true })
      })
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
        <button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
      <Link to="/register">Register</Link>
      <p>{error?.message}</p>
    </div>
  );
};

export default LoginPage;
