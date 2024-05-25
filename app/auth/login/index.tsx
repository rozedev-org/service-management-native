import React from "react";
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

const loginPage = () => {
  const { LoginForm } = useLoginForm();

  const handleSubmitLogin = async () => {
    await LoginForm.handleSubmit();
    console.log("submit");
  };
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
