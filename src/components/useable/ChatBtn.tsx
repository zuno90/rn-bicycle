import { useNavigation } from "@react-navigation/native"
import MateComIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { EHome } from "../../__types__"
import { Icon } from "native-base"

const ChatBtn: React.FC = () => {
  const navigation = useNavigation<any>()
  return (
    <Icon
      as={MateComIcon}
      name="facebook-messenger"
      color="zuno"
      size={54}
      onPress={() => navigation.navigate(EHome.PrivateChat)}
    />
  )
}

export default ChatBtn
