import React from "react"
import { HStack, Box, Divider, Text, Button, ScrollView } from "native-base"
import CartIcon from "../shop/cart/CartIcon"
import NotificationList from "./NotificationList"
import FooterMenu from "../home/FooterMenu"
import { useIsFocused } from "@react-navigation/native"

const tabs = [
  { value: "notification", title: "Thông báo của tôi" },
  { value: "voucher", title: "Khuyến mãi" },
]

const Notification: React.FC<any> = ({ route, navigation }) => {
  const [selected, setSelected] = React.useState<string>(tabs[0].value)

  React.useEffect(() => {}, [useIsFocused()])

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" mx={5} safeAreaTop>
        <Text></Text>
        <Text fontSize="3xl" fontWeight="bold">
          Thông báo
        </Text>
        <CartIcon />
      </HStack>
      <HStack justifyContent="space-evenly" m={4}>
        {tabs.map((tab, index) => (
          <Button
            key={index}
            onPress={() => setSelected(tab.value)}
            rounded="full"
            px={6}
            variant="outline"
            borderColor="#966216"
            bgColor={selected === tab.value ? "#966216" : "transparent"}
            _text={{
              color: selected === tab.value ? "white" : "#966216",
              fontWeight: selected === tab.value ? "semibold" : "medium",
            }}
          >
            {tab.title}
          </Button>
        ))}
      </HStack>
      <Divider />
      <ScrollView bgColor="white">
        <NotificationList type={selected} />
      </ScrollView>
      <FooterMenu currentScreen={route.name} />
    </>
  )
}

export default Notification
