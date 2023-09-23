import { Button } from "native-base"
import { fetchPost } from "../../utils/helper.util"
import { config } from "../../utils/config.util"
import { localDel } from "../../utils/storage.util"
import { EScreen } from "../../__types__"
import useAuth from "../../context/AuthProvider"

const Profile: React.FC<any> = ({ navigation }) => {
  const { checkAuth } = useAuth()

  const handleLogout = async () => {
    const res = await fetchPost(`${config.endpoint}/logout`, JSON.stringify({}))
    console.log(res, "logout")
    localDel(config.cache.accessToken)
    localDel(config.cache.refreshToken)
    await checkAuth()
    return navigation.navigate(EScreen.Auth)
    // if (res.success) {
    //   localDel(config.cache.accessToken)
    //   localDel(config.cache.refreshToken)
    //   return navigation.navigate(EScreen.Auth)
    // }
  }

  return <Button onPress={handleLogout}>LOG OUT</Button>
}

export default Profile
