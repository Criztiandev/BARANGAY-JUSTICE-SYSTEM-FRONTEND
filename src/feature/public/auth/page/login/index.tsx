import { Button } from "@/common/components/atoms/ui/button";
import { Checkbox } from "@/common/components/atoms/ui/checkbox";
import { FormBase } from "@/common/components/atoms/ui/form";
import { XStack } from "@/common/components/atoms/ui/stack";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/use-login";
import FormBuilder from "@/utils/form/form-builder";
import loginFormConfig from "./login-form.config";
import AuthLayout from "@/common/components/template/layout/auth-layout";

const LoginPage = () => {
  const { form } = useLogin();

  const onSubmit = () => {};

  return (
    <AuthLayout
      title="Login in to your Account"
      description="Welcome back! Please enter your details"
    >
      <FormBase {...form}>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormBuilder fields={loginFormConfig} className="mb-4" />

          <XStack className="justify-between items-center">
            <XStack className="gap-2 items-center">
              <Checkbox />
              <span>Remember me</span>
            </XStack>

            <Link to="/forgot-password">Forgot password</Link>
          </XStack>

          <Button className="mb-8">Login</Button>
          <XStack className="gap-2 items-center justify-center">
            <span>Don't have an account</span>
            <Link
              to="/register"
              className="text-blue-500 underline underline-offset-2"
            >
              Create an account
            </Link>
          </XStack>
        </form>
      </FormBase>
    </AuthLayout>
  );
};

export default LoginPage;
