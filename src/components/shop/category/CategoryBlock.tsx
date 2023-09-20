import React from "react"
import { Box, Pressable, Text } from "native-base"
import Svg, { Path } from "react-native-svg"
import { fetchGet } from "../../../utils/helper.util"
import { config } from "../../../utils/config.util"
import { EHome, ICategory } from "../../../__types__"
import { useNavigation } from "@react-navigation/native"

const CategoryBlock: React.FC<any> = () => {
  const navigation = useNavigation<any>()
  const [categories, setCategories] = React.useState<ICategory[]>([])
  const getCategories = async () => {
    const res = await fetchGet(`${config.endpoint}/categories`)
    if (res.success) setCategories(res.data.categories)
  }

  React.useEffect(() => {
    getCategories()
  }, [])

  return (
    <Box
      minH={120}
      flexDir="row"
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="center"
    >
      {categories.length > 0 && (
        <>
          {categories.map((item, index) => (
            <Box
              key={index}
              flexDir="column"
              w="24%"
              overflow="hidden"
              alignItems="center"
              my={2}
              gap={2}
            >
              <Pressable
                onPress={() =>
                  navigation.navigate(EHome.Category, { title: item.name, slug: item.slug })
                }
              >
                <Box size={24} bgColor="yellow.300" rounded="lg" />
              </Pressable>
              <Text fontSize="xs">{item.name}</Text>
            </Box>
          ))}
          <Box
            flexDir="column"
            w="24%"
            overflow="hidden"
            justifyContent="flex-end"
            alignItems="center"
            gap={2}
          >
            <Pressable>
              <Box
                size={24}
                justifyContent="center"
                alignItems="center"
                bgColor="zuno"
                rounded="lg"
              >
                <Svg width={70} height={70} viewBox="0 0 24 24" fill="none">
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.2855 2H19.5521C20.9036 2 22 3.1059 22 4.47018V7.7641C22 9.12735 20.9036 10.2343 19.5521 10.2343H16.2855C14.9329 10.2343 13.8365 9.12735 13.8365 7.7641V4.47018C13.8365 3.1059 14.9329 2 16.2855 2Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.44892 2H7.71449C9.06703 2 10.1634 3.1059 10.1634 4.47018V7.7641C10.1634 9.12735 9.06703 10.2343 7.71449 10.2343H4.44892C3.09638 10.2343 2 9.12735 2 7.7641V4.47018C2 3.1059 3.09638 2 4.44892 2Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.44892 13.7656H7.71449C9.06703 13.7656 10.1634 14.8715 10.1634 16.2368V19.5297C10.1634 20.894 9.06703 21.9999 7.71449 21.9999H4.44892C3.09638 21.9999 2 20.894 2 19.5297V16.2368C2 14.8715 3.09638 13.7656 4.44892 13.7656Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.2855 13.7656H19.5521C20.9036 13.7656 22 14.8715 22 16.2368V19.5297C22 20.894 20.9036 21.9999 19.5521 21.9999H16.2855C14.9329 21.9999 13.8365 20.894 13.8365 19.5297V16.2368C13.8365 14.8715 14.9329 13.7656 16.2855 13.7656Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </Box>
            </Pressable>
            <Text fontSize="xs">Tất cả</Text>
          </Box>
        </>
      )}
    </Box>
  )
}
export default CategoryBlock
