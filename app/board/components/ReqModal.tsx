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
} from "@gluestack-ui/themed";
import { useState } from "react";
import { RequirementEntity } from "@/app/requirements/types/requirements.types";
import { MenuStateOptions } from "./MenuStateOptions";
import { useReqActions } from "@/app/requirements/hooks/useRequirementActions";
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
        <AlertDialogContent h={800} w={400}>
          <AlertDialogHeader>
            <Heading size="lg">Detalle de Requerimiento {id}</Heading>
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
            <Text>{title}</Text>

            <MenuStateOptions id={id} title={title} />

            <Text>Descripcion: {title}</Text>

            <Text>Responsable : {user?.userName}</Text>
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
