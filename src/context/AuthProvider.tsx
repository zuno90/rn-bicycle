import React, { createContext } from "react"
import { localGet, localSet } from "../utils/storage.util"
import { config } from "../utils/config.util"
import { fetchGet, fetchPost } from "../utils/helper.util"

type TAuth = {
  isAuth: boolean
  user: any
}

export const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [auth, setAuth] = React.useState<TAuth | null>({
    isAuth: false,
    user: null,
  })

  const checkAuth = async () => {
    try {
      const accessToken = localGet(config.cache.accessToken)
      if (!accessToken) throw new Error("Have no permission!")
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
            throw new Error("Can not renew access token!")
        }
      }
      setAuth({ isAuth: true, user: data.user })
    } catch (error) {
      setAuth({ isAuth: false, user: null })
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
