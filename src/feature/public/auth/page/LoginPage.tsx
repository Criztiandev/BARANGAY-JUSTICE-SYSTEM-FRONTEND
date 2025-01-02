import InputField from "@/common/components/form/InputField";
import { Button } from "@/common/components/ui/button";
import { Checkbox } from "@/common/components/ui/checkbox";
import { FormBase } from "@/common/components/ui/form";
import { XStack, YStack } from "@/common/components/ui/stack";
import { useLogin } from "../hooks/mutation";

const LoginPage = () => {
  const { form } = useLogin();

  const onSubmit = () => {};

  return (
    <div className="h-screen border ">
      <div className="h-full grid grid-cols-2 gap-4">
        <div className="bg-black"></div>
        <div className="flex justify-center items-center  p-4">
          <div className="flex justify-center items-center   p-4 rounded-md">
            <div className="  p-4 min-w-[350px] rounded-md">
              <YStack className="gap-2 mb-8">
                <h1 className="text-3xl font-bold">Login in to your Account</h1>
                <span>Welcome back, Select method to login</span>
              </YStack>
              <FormBase {...form}>
                <form
                  className="flex flex-col gap-4 w-full"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <InputField
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Enter your Email"
                  />

                  <InputField
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="Enter your Password"
                  />

                  <XStack className="justify-between items-center">
                    <XStack className="gap-2 items-center">
                      <Checkbox />
                      <span>Remember me</span>
                    </XStack>

                    <a href="#">Forgot password</a>
                  </XStack>

                  <Button className="mb-8">Login</Button>
                  <XStack className="gap-2 items-center justify-center">
                    <span>Don't have an account</span>
                    <a
                      href="/register"
                      className="text-blue-500 underline underline-offset-2"
                    >
                      Create an account
                    </a>
                  </XStack>
                </form>
              </FormBase>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
