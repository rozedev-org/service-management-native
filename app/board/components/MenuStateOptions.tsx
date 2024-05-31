import { View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  AddIcon,
  Button,
  ButtonText,
  GlobeIcon,
  Icon,
  Menu,
  MenuItem,
  MenuItemLabel,
  SettingsIcon,
  Text,
} from "@gluestack-ui/themed";
import { PuzzleIcon, PaintBucket } from "lucide-react-native";
import { useReqActions } from "@/app/requirements/hooks/useRequirementActions";
interface MenuStateOptionsProps {
  id: number;
  title?: string;
}
export const MenuStateOptions = (props: MenuStateOptionsProps) => {
  const { reqActions, fetchReqActions, updateReqAction } = useReqActions(
    props.id
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    fetchReqActions();
  }, [isOpen]);

  return (
    <View>
      <Menu
        placement="bottom"
        trigger={({ ...triggerProps }) => {
          return (
            <Button {...triggerProps}>
              <ButtonText>{reqActions.current.title}</ButtonText>
            </Button>
          );
        }}
      >
        {reqActions.remaining.map((state) => (
          <MenuItem
            key={`menu-item-req-${props.id}-state-${state.id}`}
            textValue={state.title}
            onPress={async () => {
              await updateReqAction(state.id);
            }}
          >
            <MenuItemLabel>{state.title}</MenuItemLabel>
          </MenuItem>
        ))}
      </Menu>
    </View>
  );
};
