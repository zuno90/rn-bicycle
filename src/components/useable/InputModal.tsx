import { Box, Heading, HStack, Modal, Text, Button } from "native-base"
import LinearGradient from "react-native-linear-gradient"
import MateIcon from "react-native-vector-icons/MaterialIcons"

type TInputModal = {
  isOpen: boolean
  onClose: () => void
  action: () => void
  title?: string
  desc?: string
  body?: React.ReactNode
  confirm?: string
}

const InputModal: React.FC<TInputModal> = ({
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
          <Box alignItems="center" py={10} gap={5}>
            <Heading>{title}</Heading>
            {desc && <Text>{desc}</Text>}
            {body}
            {confirm && <Text>{confirm}</Text>}
            <LinearGradient
              colors={["#F7E98B", "#FFF9A3", "#E2AD3B"]}
              style={{ borderRadius: 100 }}
            >
              <Button
                variant="unstyled"
                h={50}
                _pressed={{ bgColor: "yellow.400" }}
                onPress={action}
              >
                <Text fontSize="lg" fontWeight="semibold">
                  Nạp tiền
                </Text>
              </Button>
            </LinearGradient>
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default InputModal
