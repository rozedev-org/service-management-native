import { View } from "react-native";
import React from "react";
import {
  ButtonText,
  Heading,
  Icon,
  CloseIcon,
  ButtonGroup,
  Text,
  Button,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Menu,
  ButtonIcon,
  MenuItem,
  MenuItemLabel,
  HStack,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { RequirementEntity } from "@/app/requirements/types/requirements.types";
import { MenuStateOptions } from "./MenuStateOptions";
import { useReqActions } from "@/app/requirements/hooks/useRequirementActions";
import { MenuUsersOptions } from "./MenuUsersOptions";
import { EllipsisVertical } from "lucide-react-native";

export const ReqModal = (props: { requirement: RequirementEntity }) => {
  const { fetchReqActions, updateReqAction } = useReqActions(
    props.requirement.id
  );
  const { title, id, updatedAt, createdAt, user } = props.requirement;
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  return (
    <View>
      <Button
        variant="link"
        onPress={async () => {
          await fetchReqActions();
          setShowAlertDialog(true);
        }}
      >
        <ButtonText>{title}</ButtonText>
      </Button>
      <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => {
          setShowAlertDialog(false);
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent h={400} w={400}>
          <AlertDialogHeader>
            <Heading size="lg">Detalle de Requerimiento {id}</Heading>
            <Menu
              placement="bottom"
              trigger={({ ...triggerProps }) => {
                return (
                  <Button
                    variant="outline"
                    size="xs"
                    borderColor="$backgroundLight300"
                    $dark-borderColor="$backgroundDark70"
                    {...triggerProps}
                  >
                    <ButtonIcon
                      as={EllipsisVertical}
                      color="$textLight900"
                      $dark-color="$textDark300"
                    />
                  </Button>
                );
              }}
            >
              <MenuItem textValue="Detalle">
                <MenuItemLabel>Detalle</MenuItemLabel>
              </MenuItem>
              <MenuItem textValue="Editar">
                <MenuItemLabel>Editar</MenuItemLabel>
              </MenuItem>
              <MenuItem textValue="Eliminar">
                <MenuItemLabel>Eliminar</MenuItemLabel>
              </MenuItem>
            </Menu>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">
              Fecha de Creacion: {new Date(createdAt).toLocaleString()}
            </Text>
            <Text size="sm">
              Fecha de Creacion: {new Date(updatedAt).toLocaleString()}
            </Text>

            <HStack alignItems="center" justifyContent="space-between" pt={10}>
              <Text>Descripcion: {title}</Text>
              <MenuStateOptions id={id} title={title} />
            </HStack>
            {user === null ? null : (
              <HStack alignItems="center" pt={10}>
                <Text>Responsable :</Text>
                <MenuUsersOptions requirement={props.requirement} />
              </HStack>
            )}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              bg="$error600"
              action="negative"
              onPress={() => {
                setShowAlertDialog(false);
              }}
            >
              <ButtonText>Cerrar</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
};
