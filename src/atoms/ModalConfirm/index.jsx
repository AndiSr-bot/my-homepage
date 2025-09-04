/* eslint-disable react/prop-types */
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ModalConfirm = ({
    openModal: openModal,
    setOpenModal: setOpenModal,
    handleLogoutClick: handleLogoutClick,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, seIsLoading] = useState(false);
    useEffect(() => {
        if (openModal) {
            onOpen();
        }
    }, [openModal, onOpen]);
    return (
        <>
            <Modal
                isCentered
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
                motionPreset="scale"
                autoFocus={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Konfirmasi keluar</ModalHeader>
                    <ModalBody pb={6}>
                        <Text>Apakah anda yakin keluar aplikasi?</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            isLoading={isLoading}
                            colorScheme="red"
                            mr={3}
                            onClick={() => {
                                seIsLoading(true);
                                setTimeout(() => {
                                    seIsLoading(false);
                                    handleLogoutClick();
                                    setOpenModal(false);
                                    onClose();
                                }, 1000);
                            }}>
                            Logout
                        </Button>
                        <Button
                            onClick={() => {
                                onClose();
                                setOpenModal(false);
                            }}>
                            Batal
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
export default ModalConfirm;
