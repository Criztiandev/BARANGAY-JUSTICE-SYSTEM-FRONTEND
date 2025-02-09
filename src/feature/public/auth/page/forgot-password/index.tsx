import { Button } from "@/common/components/atoms/ui/button";
import { FormBase } from "@/common/components/atoms/ui/form";
import { XStack } from "@/common/components/atoms/ui/stack";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/use-login";
import FormBuilder from "@/utils/form/form-builder";
import forgotPasswordFormConfig from "./forgot-password.config";
import AuthLayout from "@/common/components/template/layout/auth-layout";

const ForgotPasswordPage = () => {
  const { form } = useLogin();

  const onSubmit = () => {};

  return (
    <AuthLayout
      title="Forgot Password"
      description="Enter your email address and we will send you a link to reset your password"
    >
      <FormBase {...form}>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormBuilder fields={forgotPasswordFormConfig} className="mb-4" />

          <Button className="mb-8">Submit</Button>
          <XStack className="gap-2 items-center justify-center">
            <span>Don't have an account</span>
            <Link
              to="/login"
              className="text-blue-500 underline underline-offset-2"
            >
              Back to login
            </Link>
          </XStack>
        </form>
      </FormBase>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
