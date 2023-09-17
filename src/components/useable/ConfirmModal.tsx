import { Modal, ScrollView, Text, Button, Heading, Box, Stack, VStack, HStack } from "native-base"
import { Dispatch, SetStateAction } from "react"

type TModal = {
  isOpen: boolean
  onClose: Dispatch<SetStateAction<any>>
  removeItem: () => void
  title?: string
  desc?: string
}

const ConfirmModal: React.FC<TModal> = ({ isOpen, onClose, removeItem, title, desc, ...props }) => {
  return (
    <Modal isOpen={isOpen} size="md">
      <Modal.Content>
        <Modal.CloseButton onPress={() => onClose(false)} />
        <Modal.Body>
          <Box alignItems="center" py={2} gap={4}>
            <Heading>{title}</Heading>
            <Text>{desc}</Text>
            <HStack justifyContent="space-between" px={2} space={2}>
              <Button
                w="50%"
                rounded="full"
                variant="outline"
                borderColor="yellow.400"
                _text={{ color: "yellow.400", fontWeight: "semibold" }}
                onPress={() => {
                  removeItem()
                  onClose(false)
                }}
              >
                Có
              </Button>
              <Button
                w="50%"
                rounded="full"
                bgColor="yellow.400"
                _text={{ fontWeight: "semibold" }}
                onPress={() => onClose(false)}
              >
                Không
              </Button>
            </HStack>
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default ConfirmModal
