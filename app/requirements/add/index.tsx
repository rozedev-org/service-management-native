import { View } from "react-native";
import React, { useEffect } from "react";
import { useCreateReqForm } from "../hooks/useRequirements";
import {
  Button,
  ButtonText,
  ButtonIcon,
  ChevronDownIcon,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Icon,
  Input,
  InputField,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  AddIcon,
  Spinner,
  VStack,
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@gluestack-ui/themed";
import { useUsers } from "@/app/users/hook/useUser";
import {
  useRequirementType,
  useRequirementsTypes,
} from "../req-types/hook/useRequirementsTypes";
import { PaginationParams } from "@/types/response.interface";
import { router } from "expo-router";

export default function AddReqPage() {
  const { ReqForm } = useCreateReqForm();
  const { users, fetchUsers } = useUsers();
  const {
    fetchReqTypes,
    reqTypes,
    isLoading: isLoadingReqTypes,
  } = useRequirementsTypes();
  const {
    fetchReqType,
    reqType,
    isLoading: isLoadingReqType,
  } = useRequirementType();
  useEffect(() => {
    const queryPamas: PaginationParams = {
      page: 1,
      take: 5,
      getAll: true,
    };
    fetchUsers(queryPamas);
    fetchReqTypes(queryPamas);
  }, []);
  useEffect(() => {
    if (reqType) {
      const fieldsValues = reqType.requirementTypeField.map((field) => {
        return {
          requirementTypeFieldId: field.id,
          value: "",
        };
      });
      ReqForm.setFieldValue("requirementFieldValue", fieldsValues);
    }
  }, [reqType]);
  const handleSubmit = async () => {
    await ReqForm.handleSubmit();
    router.replace("/requirements");
  };
  return (
    <View>
      {ReqForm.Field({
        name: "userId",
        children: (field) => (
          <FormControl size="md">
            <FormControlLabel>
              <FormControlLabelText>Responsable</FormControlLabelText>
            </FormControlLabel>
            <Select>
              <SelectTrigger variant="outline" size="md">
                <SelectInput placeholder="Select option" />
                <SelectIcon>
                  <Icon as={ChevronDownIcon} />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {users.map((user) => (
                    <SelectItem
                      key={`select-form-id-${user.id}`}
                      label={user.userName}
                      value={`${user.id}`}
                      onPressOut={() => {
                        field.handleChange(user.id);
                      }}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormControl>
        ),
      })}
      {ReqForm.Field({
        name: "title",
        children: (field) => (
          <FormControl size="md">
            <FormControlLabel>
              <FormControlLabelText>Titulo</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                onChangeText={field.handleChange}
                value={field.getValue()}
                defaultValue=""
                placeholder="Titulo"
              />
            </Input>
          </FormControl>
        ),
      })}
      {ReqForm.Field({
        name: "requirementTypeId",
        children: (field) => (
          <FormControl size="md">
            <FormControlLabel>
              <FormControlLabelText>Tipo de Requerimiento</FormControlLabelText>
            </FormControlLabel>
            <Select>
              <SelectTrigger variant="outline" size="md">
                <SelectInput placeholder="Select option" />
                <SelectIcon>
                  <Icon as={ChevronDownIcon} />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {reqTypes.map((types) => (
                    <SelectItem
                      key={`select-form-id-${types.id}`}
                      label={types.name}
                      value={`${types.id}`}
                      onPressOut={async () => {
                        field.handleChange(types.id);
                        await fetchReqType(types.id);
                      }}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormControl>
        ),
      })}
      {isLoadingReqType && <Spinner />}
      {reqType && <Text>Detalle de requerimiento</Text>}
      <ReqForm.Field name="requirementFieldValue" mode="array">
        {(field) => {
          return (
            <VStack>
              {field.state.value.map((_, i) => (
                <VStack key={i}>
                  <Text>Campo {i + 1}</Text>
                  <ReqForm.Field name={`requirementFieldValue[${i}].value`}>
                    {(subField) => {
                      const reqTypeField = reqType?.requirementTypeField.find(
                        (value) =>
                          value.id ===
                          field.state.value[i].requirementTypeFieldId
                      );

                      const inputType = reqTypeField?.type || "text";
                      return (
                        <FormControl size="md">
                          <FormControlLabel>
                            <FormControlLabelText>
                              {reqTypeField?.title}
                            </FormControlLabelText>
                          </FormControlLabel>
                          {inputType === "checkbox" && (
                            <Checkbox
                              aria-label="Descripcion"
                              defaultIsChecked={false}
                              value={subField.state.value}
                              onChange={(e) => {
                                subField.handleChange(String(e));
                              }}
                              size="md"
                            >
                              <CheckboxIndicator mr="$2">
                                <CheckboxIcon as={CheckIcon} />
                              </CheckboxIndicator>
                            </Checkbox>
                          )}
                          {inputType === "text" && (
                            <Input>
                              <InputField
                                onChangeText={subField.handleChange}
                                value={subField.getValue()}
                                type="text"
                                defaultValue=""
                              />
                            </Input>
                          )}
                          {inputType === "email" && (
                            <Input>
                              <InputField
                                onChangeText={subField.handleChange}
                                value={subField.getValue()}
                                type="text"
                                defaultValue=""
                              />
                            </Input>
                          )}
                          {inputType === "number" && (
                            <Input>
                              <InputField
                                onChangeText={subField.handleChange}
                                value={subField.getValue()}
                                type="text"
                                defaultValue=""
                              />
                            </Input>
                          )}
                          {inputType === "date" && (
                            <Input>
                              <InputField
                                onChangeText={subField.handleChange}
                                value={subField.getValue()}
                                type="text"
                                defaultValue=""
                              />
                            </Input>
                          )}
                        </FormControl>
                      );
                    }}
                  </ReqForm.Field>
                </VStack>
              ))}
            </VStack>
          );
        }}
      </ReqForm.Field>
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        onPress={handleSubmit}
      >
        <ButtonText>Crear</ButtonText>
        <ButtonIcon as={AddIcon} />
      </Button>
    </View>
  );
}
