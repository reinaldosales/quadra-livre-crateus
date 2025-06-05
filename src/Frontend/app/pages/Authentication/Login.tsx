import FormRow from "~/components/FormRow";

const Login = () => {
  return (
    <div>
      <FormRow
        type="email"
        name="name"
        labelText="Email"
        defaultValue="teste@gmaio.net"
      />
      <FormRow
        type="password"
        name="password"
        labelText="Senha"
        defaultValue="123"
      />
    </div>
  );
};
export default Login;
