import React, { createContext } from "react"
import { localGet, localSet } from "../utils/storage.util"
import { config } from "../utils/config.util"
import { fetchGet, fetchPost } from "../utils/helper.util"
import { useToast } from "native-base"
import { EToastType } from "../__types__"
import Toast from "../components/useable/Toast"

type TAuth = { isAuth: boolean; user: any }

export const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [auth, setAuth] = React.useState<TAuth | null>({ isAuth: false, user: null })
  const toast = useToast()
  const showToast = (type: EToastType, msg: string) => {
    if (!toast.isActive("err-login"))
      toast.show({
        id: "err-login",
        placement: "top",
        duration: 1500,
        render: () => <Toast type={type} content={msg} close={() => toast.close("err-login")} />,
      })
  }

  const checkAuth = async (action?: string) => {
    try {
      const accessToken = localGet(config.cache.accessToken)
      if (!accessToken) {
        if (action === "logout") showToast(EToastType.noti, "Bạn đã đăng xuất tài khoản!")
        return setAuth({ isAuth: false, user: null })
      }
      const res = await fetchGet(`${config.endpoint}/fetch-me`, {
        Authorization: `Bearer ${accessToken}`,
      })
      const { success, data, message } = res
      if (!success) {
        switch (message) {
          case "jwt expired":
            const refreshToken = localGet(config.cache.refreshToken)
            // call api re-take accesstoken
            const result = await fetchPost(
              `${config.endpoint}/renew-token`,
              JSON.stringify({ accessToken, refreshToken }),
              { Authorization: `Bearer ${accessToken}` }
            )
            if (!result.success) throw new Error("Can not renew access token!")
            localSet(config.cache.accessToken, result.data.accessToken)
            localSet(config.cache.refreshToken, result.data.refreshToken)
            await checkAuth()
          default:
            throw new Error("Lỗi mạng, Vui lòng thử lại sau!")
        }
      }
      setAuth({ isAuth: true, user: data.user })
    } catch (error: any) {
      setAuth({ isAuth: false, user: null })
      showToast(EToastType.err, error.message)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    checkAuth()
  }, [])

  const authValue = { isLoading, auth, setAuth, checkAuth }

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
}

const useAuth = () => React.useContext(AuthContext)

export default useAuth
