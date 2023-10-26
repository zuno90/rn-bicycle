import { Alert, Share } from "react-native"
import { Icon } from "native-base"
import EviIcon from "react-native-vector-icons/EvilIcons"

const urlScheme = "zunobicycle://product"

type TProductShare = { id: number; slug: string; title: string }

const ShareBtn: React.FC<TProductShare> = ({ id, slug, title }) => {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        title,
        message: `${title}\n\n${urlScheme}/${id}/${slug}`,
        url: `${urlScheme}/${id}/${slug}`,
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message)
    }
  }

  return <Icon as={EviIcon} name="share-google" size={10} onPress={handleShare} />
}

export default ShareBtn
