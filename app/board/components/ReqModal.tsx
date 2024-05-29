import { View } from "react-native";
import React from "react";
import {
  Popover,
  ButtonText,
  PopoverBackdrop,
  PopoverContent,
  PopoverHeader,
  Heading,
  PopoverCloseButton,
  Icon,
  CloseIcon,
  PopoverBody,
  PopoverFooter,
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
  Center,
} from "@gluestack-ui/themed";
import { useState } from "react";

export const ReqModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  return (
    <Center h={300}>
      <Button onPress={() => setShowAlertDialog(true)}>
        <ButtonText>Click me</ButtonText>
      </Button>
      <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => {
          setShowAlertDialog(false);
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">Deactivate account</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">
              Are you sure you want to deactivate your account? Your data will
              be permanently removed and cannot be undone.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowAlertDialog(false);
                }}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                bg="$error600"
                action="negative"
                onPress={() => {
                  setShowAlertDialog(false);
                }}
              >
                <ButtonText>Deactivate</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Center>
  );
};
