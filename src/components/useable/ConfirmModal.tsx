import { Modal, Text, Button, Heading, Box, HStack } from "native-base"
import MateIcon from "react-native-vector-icons/MaterialIcons"

type TConfirmModal = {
  isOpen: boolean
  onClose: () => void
  action: () => void
  title?: string
  desc?: string
  body?: React.ReactNode
  confirm?: string
}

const ConfirmModal: React.FC<TConfirmModal> = ({
  isOpen,
  onClose,
  action,
  title,
  desc,
  body,
  confirm,
  ...props
}) => {
  return (
    <Modal isOpen={isOpen} size="md">
      <Modal.Content>
        <Modal.CloseButton as={MateIcon} name="highlight-remove" onPress={onClose} />
        <Modal.Body>
          <Box alignItems="center" py={4} gap={4}>
            <Heading>{title}</Heading>
            {desc && <Text>{desc}</Text>}
            {body}
            {confirm && <Text>{confirm}</Text>}
            <HStack justifyContent="space-between" px={2} space={2}>
              <Button
                w="50%"
                rounded="full"
                variant="outline"
                borderColor="zuno"
                _text={{ color: "zuno",fontWeight: "semibold" }}
                onPress={onClose}
              >
                Không
              </Button>
              <Button
                w="50%"
                rounded="full"
                bgColor="zuno"
                _text={{ fontWeight: "semibold" }}
                onPress={() => {
                  action()
                  onClose()
                }}
              >
                Có
              </Button>
            </HStack>
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default ConfirmModal
