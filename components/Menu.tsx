import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Button,
  HStack,
  VStack,
  Icon,
  ButtonText,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  CloseIcon,
  Text,
  ButtonIcon,
} from "@gluestack-ui/themed";
import React from "react";
import { useState } from "react";
import { Link } from "expo-router";
import { router } from "expo-router";
import { useUserSession } from "@/states/useUserSession";
export const MenuSidebar = () => {
  const { setIsLoggedIn } = useUserSession();
  const [showModal, setShowModal] = useState(false);
  const ref = React.useRef(null);
  const handelClose = (href: string) => {
    setShowModal(false);
    router.replace(href);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    router.replace(`/auth/login`);
  };
  return (
    <View>
      <HStack>
        <Button onPress={() => setShowModal(true)} ref={ref} variant="link">
          <AntDesign name="bars" size={24} color="black" />
        </Button>
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          finalFocusRef={ref}
        >
          <ModalBackdrop />
          <ModalContent width={"90%"} h={"75%"}>
            <ModalHeader>
              <Heading size="lg">Service Management</Heading>
              <ModalCloseButton>
                <Icon as={CloseIcon} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <VStack gap={"$1"}>
                <Button
                  size="xs"
                  variant="outline"
                  bg="$darkBlue500"
                  marginRight={"auto"}
                  onPress={() => handelClose("/")}
                >
                  <ButtonIcon>
                    <AntDesign name="home" color="white" />
                  </ButtonIcon>
                  <ButtonText color="white" ml={"$2"}>
                    Dashboard
                  </ButtonText>
                </Button>
                <Button
                  size="xs"
                  variant="outline"
                  bg="$darkBlue500"
                  marginRight={"auto"}
                  onPress={() => handelClose("/requirements")}
                >
                  <ButtonIcon>
                    <AntDesign name="home" color="white" />
                  </ButtonIcon>
                  <ButtonText color="white" ml={"$2"}>
                    Requerimientos
                  </ButtonText>
                </Button>
                <Button
                  size="xs"
                  variant="outline"
                  bg="$darkBlue500"
                  marginRight={"auto"}
                  onPress={() => handelClose("/users")}
                >
                  <ButtonIcon>
                    <AntDesign name="home" color="white" />
                  </ButtonIcon>
                  <ButtonText color="white" ml={"$2"}>
                    Usuarios
                  </ButtonText>
                </Button>
                <Button
                  size="xs"
                  variant="outline"
                  bg="$darkBlue500"
                  marginRight={"auto"}
                  onPress={() => handelClose("/auth/login")}
                >
                  <ButtonIcon>
                    <AntDesign name="home" color="white" />
                  </ButtonIcon>
                  <ButtonText color="white" ml={"$2"}>
                    Login
                  </ButtonText>
                </Button>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                size="xs"
                variant="outline"
                bg="$red500"
                marginRight={"auto"}
                onPress={handleLogout}
              >
                <ButtonIcon>
                  <AntDesign name="home" color="white" />
                </ButtonIcon>
                <ButtonText color="white" ml={"$2"}>
                  Cerrar Sesion
                </ButtonText>
              </Button>
              <Button
                variant="outline"
                size="sm"
                action="secondary"
                mr="$3"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <ButtonText>Cerrar</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </HStack>
    </View>
  );
};
