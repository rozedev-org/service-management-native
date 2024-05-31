import { View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ButtonText,
  MenuItem,
  MenuItemLabel,
  Text,
  Button,
  Menu,
  FormControl,
  HStack,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { useUpdateReqForm } from "@/app/requirements/hooks/useRequirements";
import { RequirementEntity } from "@/app/requirements/types/requirements.types";
import { useUsers } from "@/app/users/hook/useUser";
import { PaginationParams } from "@/types/response.interface";
import { ChevronDown } from "lucide-react-native";

export const MenuUsersOptions = (props: { requirement: RequirementEntity }) => {
  const { title, id, updatedAt, createdAt, user } = props.requirement;
  const { users: usersData, fetchUsers } = useUsers();
  const [selectedUser, setSelectedUser] = useState<UserEntity | null>(user);
  const { updateReqForm } = useUpdateReqForm(props.requirement);
  const handleSubmit = () => {};
  useEffect(() => {
    const queryPamas: PaginationParams = {
      page: 1,
      take: 5,
      getAll: true,
    };
    fetchUsers(queryPamas);
  }, []);
  return (
    <View>
      <FormControl>
        {updateReqForm.Field({
          name: "userId",
          children: (field) => (
            <HStack>
              <Menu
                placement="bottom right"
                trigger={({ ...triggerProps }) => {
                  return (
                    <Button
                      {...triggerProps}
                      variant="outline"
                      borderWidth={0}
                      p={0}
                    >
                      <ButtonText>{selectedUser?.userName}</ButtonText>
                      <ButtonIcon as={ChevronDown} />
                    </Button>
                  );
                }}
              >
                {usersData.map((data) => (
                  <MenuItem
                    key={`menu-item-req-${data.id}`}
                    textValue={`${data.id}`}
                    onPress={(e) => {
                      field.handleChange(data.id);
                      setSelectedUser(data);
                    }}
                  >
                    <MenuItemLabel>{data.userName}</MenuItemLabel>
                  </MenuItem>
                ))}
              </Menu>
            </HStack>
          ),
        })}
      </FormControl>
    </View>
  );
};
