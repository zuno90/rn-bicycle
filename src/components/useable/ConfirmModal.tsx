import { Modal, Text, Button, Heading, Box, HStack } from "native-base"
import { Dispatch, SetStateAction } from "react"
import MateIcon from "react-native-vector-icons/MaterialIcons"

type TModal = {
  isOpen: boolean
  onClose: Dispatch<SetStateAction<any>>
  action: () => void
  title?: string
  desc?: string
}

const ConfirmModal: React.FC<TModal> = ({ isOpen, onClose, action, title, desc, ...props }) => {
  return (
    <Modal isOpen={isOpen} size="md">
      <Modal.Content>
        <Modal.CloseButton as={MateIcon} name="highlight-remove" onPress={() => onClose(false)} />
        <Modal.Body>
          <Box alignItems="center" py={2} gap={4}>
            <Heading>{title}</Heading>
            <Text>{desc}</Text>
            <HStack justifyContent="space-between" px={2} space={2}>
              <Button
                w="50%"
                rounded="full"
                variant="outline"
                borderColor="zuno"
                _text={{ color: "zuno", fontWeight: "semibold" }}
                onPress={() => {
                  action()
                  onClose(false)
                }}
              >
                Có
              </Button>
              <Button
                w="50%"
                rounded="full"
                bgColor="zuno"
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
