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
  Text,
  View,
} from "@gluestack-ui/themed";
import { Field, useForm } from "@tanstack/react-form";

const index = () => {
  const { loginForm } = useLoginForm();
  const { handleSubmit } = useForm();

  const handleSubmitLogin = async () => {
    await handleSubmit();
    console.log("submit");
  };
  return (
    <View>
      <loginForm.Field name="username">
        {(Field) => (
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
              <InputField type="text" defaultValue="" placeholder="username" />
            </Input>
          </FormControl>
        )}
      </loginForm.Field>
      <loginForm.Field name="password">
        {(Field) => (
          <FormControl
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText>password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="password"
                defaultValue=""
                placeholder="password"
              />
            </Input>
          </FormControl>
        )}
      </loginForm.Field>
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

export default index;
