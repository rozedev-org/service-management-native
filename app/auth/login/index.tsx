import React, { useEffect } from "react";
import { useLoginForm } from "./hooks/useLogin";
import {
  AddIcon,
  Button,
  ButtonIcon,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  View,
} from "@gluestack-ui/themed";
import { useUserSession } from "@/states/useUserSession";
import { router } from "expo-router";
const loginPage = () => {
  const { LoginForm } = useLoginForm();
  const { isLoggedIn } = useUserSession();
  const handleSubmitLogin = async () => {
    console.log("submit");
    await LoginForm.handleSubmit();
    router.replace(`/`);
  };
  useEffect(() => {
    if (isLoggedIn === true) {
      router.replace(`/`);
    }
  }, []);

  return (
    <View>
      {LoginForm.Field({
        name: "username",
        children: (field) => (
          <FormControl
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText>Username</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                onChangeText={field.handleChange}
                value={field.getValue()}
                type="text"
                defaultValue=""
                placeholder="username"
              />
            </Input>
          </FormControl>
        ),
      })}
      {LoginForm.Field({
        name: "password",
        children: (field) => (
          <FormControl
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                onChangeText={field.handleChange}
                value={field.getValue()}
                type="password"
                defaultValue=""
                placeholder="Password"
              />
            </Input>
          </FormControl>
        ),
      })}
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        onPress={handleSubmitLogin}
      >
        <ButtonText>Login</ButtonText>
        <ButtonIcon as={AddIcon} />
      </Button>
    </View>
  );
};

export default loginPage;
