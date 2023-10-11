import React from "react"
import { Box, Center, HStack, Heading, Icon, Image, ScrollView, Text, VStack } from "native-base"
import CartIcon from "../shop/cart/CartIcon"
import { Circle, Defs, Ellipse, LinearGradient, Path, Rect, Stop, Svg } from "react-native-svg"
import FooterMenu from "../home/FooterMenu"
import { fetchGet } from "../../utils/helper.util"
import { config } from "../../utils/config.util"
import LoadingBtn from "../useable/LoadingBtn"

const Rank: React.FC<any> = ({ route }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [ranks, setRanks] = React.useState([])
  const getRanks = async () => {
    setIsLoading(true)
    const res = await fetchGet(`${config.endpoint}/users/ranking`)
    if (res.success) setRanks(res.data.users)
    setIsLoading(false)
  }
  React.useEffect(() => {
    getRanks()
  }, [])

  // console.log(ranks)
  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" m={4} safeAreaTop>
        <Text></Text>
        <Text fontSize="3xl" fontWeight="bold">
          Xếp hạng
        </Text>
        <CartIcon />
      </HStack>

      <ScrollView bgColor="white">
        <Center mt={5} gap={2}>
          <Icon as={cupSvg} size={30} />
          <Heading>Bảng xếp hạng</Heading>
          <Text>Top 5 khách hàng có doanh số cao nhất</Text>
        </Center>
        {isLoading ? (
          <LoadingBtn />
        ) : (
          ranks.length > 0 &&
          ranks.map((rank: any, index) => (
            <Box
              key={index}
              mx={4}
              mt={2}
              mb={5}
              px={6}
              py={1}
              rounded="xl"
              shadow={9}
              flexDir="row"
              bgColor={
                index === 0
                  ? "yellow.200"
                  : index === 1
                  ? "yellow.100"
                  : index === 2
                  ? "yellow.50"
                  : "muted.100"
              }
              alignItems="center"
              gap={10}
            >
              {index === 0 || index === 1 || index === 2 ? (
                <Icon as={() => medal(index)} size={30} />
              ) : index === 3 ? (
                <Image source={require(`../../../public/rank4.png`)} alt="rank" size={16} />
              ) : (
                <Image source={require(`../../../public/rank5.png`)} alt="rank" size={16} />
              )}
              <VStack justifyContent="space-between">
                <Heading fontSize="lg">{rank.name}</Heading>
                <Text>
                  Đã nạp: <Text color="red.500">{rank.bought}</Text>
                </Text>
                <Text>Doanh số: {rank.bought}</Text>
                <Text>Tổng: {rank.bought}</Text>
              </VStack>
            </Box>
          ))
        )}
      </ScrollView>

      <FooterMenu currentScreen={route.name} />
    </>
  )
}

const cupSvg = () => (
  <Svg width="89" height="120" viewBox="0 0 89 120" fill="none">
    <Rect
      x="41.5691"
      y="63.3633"
      width="5.38942"
      height="19.0048"
      fill="url(#paint0_linear_1114_3377)"
    />
    <Path
      d="M21.1218 23.2441H4.5C4.50001 36.1339 5.4885 43.5484 23.8535 43.5484"
      stroke="#FFDD66"
      strokeWidth="9"
    />
    <Path
      d="M68.5682 40.1256C68.5682 53.6073 57.6392 64.5363 44.1575 64.5363C30.6759 64.5363 19.7468 53.6073 19.7468 40.1256C19.7468 26.6439 30.6759 15.7149 44.1575 15.7149C57.6392 15.7149 68.5682 26.6439 68.5682 40.1256Z"
      fill="#FFDD66"
    />
    <Path
      d="M44.1575 81.4185C34.2038 81.4185 26.1347 84.3295 26.1347 87.9204H62.1804C62.1804 84.3295 54.1113 81.4185 44.1575 81.4185Z"
      fill="#FFDD66"
    />
    <Path d="M19.7468 11.0234H68.5682V38.9849H19.7468V11.0234Z" fill="#FFDD66" />
    <Path d="M62.1804 89.1752H26.1347V87.8063H62.1804V89.1752Z" fill="#FFDD66" />
    <Path
      d="M67.8782 23.2441H84.5C84.5 36.1339 83.5115 43.5484 65.1465 43.5484"
      stroke="#DE9300"
      strokeWidth="9"
    />
    <Path
      d="M68.5686 40.1257C68.5686 53.6074 57.6396 64.5364 44.1579 64.5364C44.1579 64.5364 44.1579 53.6074 44.1579 40.1257C44.1579 26.6441 44.1579 15.715 44.1579 15.715C57.6396 15.715 68.5686 26.6441 68.5686 40.1257Z"
      fill="url(#paint1_linear_1114_3377)"
    />
    <Path
      d="M44.1579 81.4186C44.1579 81.4186 44.1579 84.3296 44.1579 87.9205H62.1807C62.1807 84.3296 54.1116 81.4186 44.1579 81.4186Z"
      fill="url(#paint2_linear_1114_3377)"
    />
    <Path
      d="M44.1579 11.0254H68.5686V38.985H44.1579V11.0254Z"
      fill="url(#paint3_linear_1114_3377)"
    />
    <Path
      d="M62.1807 89.1753H44.1579C44.1579 89.1753 44.1174 88.3395 44.1579 87.8065C44.6909 80.7883 62.1807 87.8065 62.1807 87.8065V89.1753Z"
      fill="url(#paint4_linear_1114_3377)"
    />
    <Ellipse cx="44.6371" cy="37.409" rx="14.6082" ry="14.6082" fill="#DCAE0C" />
    <Circle
      cx="44.6079"
      cy="37.2274"
      r="16.0772"
      fill="#DE9300"
      stroke="#FFE176"
      strokeWidth="4.55437"
    />
    <Path
      d="M44.6076 25.2188L48.3086 32.6209L55.7108 33.5462L50.628 39.2459L52.0097 47.4253L44.6076 43.7242L37.2054 47.4253L38.5994 39.2459L33.5043 33.5462L40.9065 32.6209L44.6076 25.2188Z"
      fill="#FFF4BC"
    />
    <Path
      d="M45.502 24.7715L44.6076 22.9827L43.7131 24.7715L40.2514 31.695L33.3802 32.5539L31.4874 32.7905L32.7587 34.2127L37.5327 39.553L36.2196 47.2573L35.8881 49.202L37.6526 48.3197L44.6076 44.8423L51.5625 48.3197L53.3238 49.2004L52.9958 47.2587L51.694 39.553L56.4572 34.2118L57.7249 32.7902L55.8349 32.5539L48.9637 31.695L45.502 24.7715Z"
      stroke="#C98500"
      strokeOpacity="0.7"
      strokeWidth="2"
    />
    <Path
      d="M14.4042 16.9948L16.9782 11.3299L14.4042 5.66494L20.0691 8.23895L25.734 5.66494L23.16 11.3299L25.734 16.9948L20.0691 14.4208L14.4042 16.9948Z"
      fill="white"
    />
    <Path
      d="M18.7477 103.259C18.7477 94.875 25.5445 88.0781 33.9289 88.0781H54.6976C63.082 88.0781 69.8788 94.875 69.8788 103.259V114.27H18.7477V103.259Z"
      fill="#243B6D"
    />
    <Rect
      x="27.7588"
      y="96.5154"
      width="34.1509"
      height="10.1316"
      fill="#F9B50E"
      stroke="#FFEC86"
      strokeWidth="3.91749"
    />
    <Path d="M28.5192 94.5566H45.7406L59.3364 108.606H42.115L28.5192 94.5566Z" fill="#FFEC86" />
    <Rect x="15.9066" y="114.27" width="56.8124" height="5.43834" fill="#DE9300" />
    <Defs>
      <LinearGradient
        id="paint0_linear_1114_3377"
        x1="44.2638"
        y1="63.3633"
        x2="44.2638"
        y2="82.3681"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#C07F00" />
        <Stop offset="1" stopColor="#DE9300" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_1114_3377"
        x1="68.4006"
        y1="35.6422"
        x2="43.928"
        y2="35.6422"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DE9300" />
        <Stop offset="1" stopColor="#FFBC11" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_1114_3377"
        x1="68.4006"
        y1="35.6422"
        x2="43.928"
        y2="35.6422"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DE9300" />
        <Stop offset="1" stopColor="#FFBC11" />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_1114_3377"
        x1="68.4006"
        y1="35.6422"
        x2="43.928"
        y2="35.6422"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DE9300" />
        <Stop offset="1" stopColor="#FFBC11" />
      </LinearGradient>
      <LinearGradient
        id="paint4_linear_1114_3377"
        x1="68.4006"
        y1="35.6422"
        x2="43.928"
        y2="35.6422"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DE9300" />
        <Stop offset="1" stopColor="#FFBC11" />
      </LinearGradient>
    </Defs>
  </Svg>
)

const medal = (no: number) => {
  switch (no) {
    case 0:
      return (
        <Svg width={60} height={84} viewBox="0 0 60 84" fill="none">
          <Path d="M40.263 30.31H19.737L7.105.31h20.526l12.632 30z" fill="#FEFEFE" />
          <Path
            d="M26.578 29.258L20 30.838 7.105.31h6.842l12.631 28.947zM40.263 29.258H33.42L20.789.311h6.842l12.632 28.947z"
            fill="#F95511"
          />
          <Path d="M18.158 30.31h20.526l12.632-30H30.789l-12.631 30z" fill="#FEFEFE" />
          <Path
            d="M31.842 29.258l6.579 1.58L51.316.31h-6.843L31.843 29.258zM18.158 29.258H25L37.63.311H30.79L18.158 29.258z"
            fill="#F95511"
          />
          <Path
            d="M52.127 36.345C42.069 35.675 30 30.311 30 30.311s-12.07 5.364-22.128 6.034c0 0-5.364 20.786 7.376 32.185 0 0 3.353 3.353 14.752 10.728C41.398 71.882 44.75 68.53 44.75 68.53c12.74-11.399 7.377-32.185 7.377-32.185z"
            fill="url(#paint0_linear_29_294)"
          />
          <Path
            d="M58.553 30.99C45.575 30.125 30 23.203 30 23.203S14.425 30.125 1.447 30.99c0 0-1.28 4.967-1.431 11.796.201 8.693 2.463 19.513 10.948 27.105 0 0 4.327 4.327 19.036 13.845C44.71 74.218 49.036 69.89 49.036 69.89 57.522 62.3 59.783 51.48 59.984 42.786c-.15-6.83-1.43-11.796-1.43-11.796zM44.565 66.034S41.255 69.344 30 76.627c-11.255-7.282-14.565-10.593-14.565-10.593-6.493-5.809-8.223-14.088-8.377-20.74.115-5.224 1.095-9.025 1.095-9.025C18.083 35.607 30 30.311 30 30.311s11.917 5.296 21.847 5.958c0 0 .98 3.8 1.096 9.026-.155 6.651-1.885 14.93-8.378 20.74z"
            fill="url(#paint1_linear_29_294)"
          />
          <Path
            d="M23.117 56.499h-.4V61.477H37.15V56.5h-3.887V39.098H28.95l-.096.06c-1.461.898-2.923 1.461-5.203 1.89l-.326.062V45.032H27.3V56.5h-4.182z"
            fill="#fff"
            stroke="#74560F"
            strokeWidth={0.8}
          />
          <Defs>
            <LinearGradient
              id="paint0_linear_29_294"
              x1={29.9996}
              y1={79.2582}
              x2={29.9996}
              y2={30.3107}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#B89445" />
              <Stop offset={0.463542} stopColor="#FBF59B" />
              <Stop offset={1} stopColor="#BE9C4D" />
            </LinearGradient>
            <LinearGradient
              id="paint1_linear_29_294"
              x1={30}
              y1={83.7351}
              x2={30}
              y2={23.2029}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset={0.0104167} stopColor="#B79E1D" />
              <Stop offset={0.307292} stopColor="#EEDA73" />
              <Stop offset={0.59375} stopColor="#FFFEAA" />
              <Stop offset={1} stopColor="#AD8436" />
            </LinearGradient>
          </Defs>
        </Svg>
      )
    case 1:
      return (
        <Svg
          width="60"
          height="87"
          viewBox="0 0 60 87"
          fill="none"
          xmlns="http://www.w3.org/2000/Svg"
        >
          <Path
            d="M29.9996 24.7612C29.9996 24.7612 45.7354 31.7532 58.9182 32.677C58.7096 31.6035 58.5529 30.9903 58.5529 30.9903C45.5744 30.125 29.9996 23.2031 29.9996 23.2031C29.9996 23.2031 14.4249 30.125 1.44636 30.9903C1.44636 30.9903 1.28974 31.6039 1.08105 32.677C14.2639 31.7532 29.9996 24.7612 29.9996 24.7612Z"
            fill="#E3E3E3"
          />
          <Path
            d="M32.9282 39.2587V38.7324H29.1306C27.6216 39.6605 26.1122 40.2393 23.793 40.676V41.2022C26.1122 40.7651 27.6212 40.1868 29.1306 39.2587H32.9282Z"
            fill="#E3E3E3"
          />
          <Path
            d="M40.2627 30.3104H19.7367L7.10498 0.310547H27.6314L40.2627 30.3104Z"
            fill="#FEFEFE"
          />
          <Path
            d="M26.5785 29.258L19.9996 30.8371L7.10498 0.310547H13.9468L26.5785 29.258Z"
            fill="#F95511"
          />
          <Path
            d="M40.2627 29.258H33.4209L20.7892 0.310547H27.6315L40.2627 29.258Z"
            fill="#F95511"
          />
          <Path
            d="M18.1576 30.3104H38.684L51.3157 0.310547H30.7893L18.1576 30.3104Z"
            fill="#FEFEFE"
          />
          <Path
            d="M31.8418 29.258L38.4208 30.8371L51.3158 0.310547H44.4735L31.8418 29.258Z"
            fill="#F95511"
          />
          <Path
            d="M18.1576 29.258H24.9999L37.6311 0.310547H30.7893L18.1576 29.258Z"
            fill="#F95511"
          />
          <Path
            d="M58.5535 30.9903C45.5746 30.125 29.9998 23.2031 29.9998 23.2031C29.9998 23.2031 14.425 30.125 1.44652 30.9903C1.44652 30.9903 -5.47537 57.8134 10.9643 72.5225C10.9643 72.5225 15.2907 76.849 29.9998 86.3667C44.7093 76.849 49.0353 72.5225 49.0353 72.5225C65.4754 57.813 58.5535 30.9903 58.5535 30.9903Z"
            fill="url(#paint0_linear_1114_3103)"
          />
          <Path
            d="M52.1267 36.3452C42.0689 35.6748 29.9996 30.3105 29.9996 30.3105C29.9996 30.3105 17.9303 35.6748 7.8725 36.3452C7.8725 36.3452 2.50821 57.1311 15.2483 68.53C15.2483 68.53 18.6011 71.8828 29.9996 79.2582C41.3985 71.8823 44.7508 68.53 44.7508 68.53C57.4905 57.1311 52.1267 36.3452 52.1267 36.3452Z"
            fill="url(#paint1_linear_1114_3103)"
          />
          <Path
            d="M58.5533 30.9903C45.5748 30.125 30 23.2031 30 23.2031C30 23.2031 14.4252 30.125 1.44673 30.9903C1.44673 30.9903 0.166653 35.957 0.015625 42.786C0.217426 51.4789 2.47854 62.2987 10.9645 69.8914C10.9645 69.8914 15.2909 74.2178 30 83.7356C44.7095 74.2178 49.0356 69.8914 49.0356 69.8914C57.5215 62.2987 59.7826 51.4789 59.9844 42.786C59.8338 35.9566 58.5533 30.9903 58.5533 30.9903ZM44.565 66.0343C44.565 66.0343 41.2548 69.3445 30 76.6269C18.7452 69.3445 15.4351 66.0343 15.4351 66.0343C8.94219 60.2252 7.21204 51.9462 7.05757 45.2949C7.17288 40.0696 8.15262 36.2694 8.15262 36.2694C18.083 35.6072 30 30.3109 30 30.3109C30 30.3109 41.917 35.6072 51.8474 36.2694C51.8474 36.2694 52.8267 40.0696 52.9425 45.2949C52.788 51.9462 51.0579 60.2247 44.565 66.0343Z"
            fill="url(#paint2_linear_1114_3103)"
          />
          <Path
            d="M22.972 57.5058L22.841 57.6249V57.8019V60.5222V60.9222H23.241H37H37.4V60.5222V56.5227V56.1227H37H33.3458C32.7502 56.1227 31.9499 56.1812 31.189 56.2597C32.4428 54.9316 33.6435 53.4916 34.5833 52.0144C35.7149 50.236 36.4924 48.3664 36.4924 46.5505C36.4924 44.5593 35.7889 42.8903 34.5546 41.7203C33.3224 40.5524 31.5922 39.9105 29.5873 39.9105C28.1228 39.9105 26.9015 40.174 25.7891 40.7142C24.6807 41.2525 23.7026 42.055 22.7099 43.1009L22.4401 43.3851L22.7187 43.6607L25.3069 46.2206L25.6019 46.5125L25.8827 46.2069C26.8095 45.1983 27.7732 44.4171 28.9469 44.4171C29.6489 44.4171 30.1813 44.6348 30.5401 45.0122C30.901 45.3918 31.1327 45.9821 31.1327 46.8156C31.1327 48.1131 30.3754 49.6414 28.9337 51.4504C27.502 53.2469 25.4494 55.2551 22.972 57.5058Z"
            fill="white"
            stroke="#666666"
            strokeWidth="0.8"
          />
          <Defs>
            <LinearGradient
              id="paint0_linear_1114_3103"
              x1="29.9998"
              y1="86.3667"
              x2="29.9998"
              y2="23.2029"
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#828282" />
              <Stop offset="0.322917" stopColor="#AEB2B5" />
              <Stop offset="0.9998" stopColor="#E1EFFB" />
            </LinearGradient>
            <LinearGradient
              id="paint1_linear_1114_3103"
              x1="29.9996"
              y1="79.2582"
              x2="29.9996"
              y2="30.3107"
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#AEAEAE" />
              <Stop offset="0.505208" stopColor="#E9E9EA" />
              <Stop offset="1" stopColor="#A0A0A0" />
            </LinearGradient>
            <LinearGradient
              id="paint2_linear_1114_3103"
              x1="30"
              y1="83.7351"
              x2="30"
              y2="23.2029"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0.0104167" stopColor="#B3B6B6" />
              <Stop offset="0.307292" stopColor="#EAEAEA" />
              <Stop offset="0.59375" stopColor="#E6E7E7" />
              <Stop offset="1" stopColor="#C2C2C2" />
            </LinearGradient>
          </Defs>
        </Svg>
      )
    case 2:
      return (
        <Svg width={60} height={87} viewBox="0 0 60 87" fill="none">
          <Path
            d="M30 24.761s15.735 6.992 28.918 7.916c-.208-1.073-.365-1.687-.365-1.687C45.574 30.125 30 23.203 30 23.203S14.425 30.125 1.446 30.99c0 0-.156.614-.365 1.687C14.264 31.753 30 24.761 30 24.761zM32.928 39.259v-.527h-3.797c-1.51.928-3.019 1.507-5.338 1.944v.526c2.32-.437 3.828-1.015 5.338-1.943h3.797z"
            fill="#FFF6B3"
          />
          <Path d="M40.263 30.31H19.737L7.105.31h20.526l12.632 30z" fill="#FEFEFE" />
          <Path
            d="M26.578 29.258L20 30.838 7.105.31h6.842l12.631 28.947zM40.263 29.258H33.42L20.789.311h6.842l12.632 28.947z"
            fill="#F95511"
          />
          <Path d="M18.158 30.31h20.526l12.632-30H30.789l-12.631 30z" fill="#FEFEFE" />
          <Path
            d="M31.842 29.258l6.579 1.58L51.316.31h-6.843L31.843 29.258zM18.158 29.258H25L37.63.311H30.79L18.158 29.258z"
            fill="#F95511"
          />
          <Path
            d="M58.553 30.99C45.575 30.125 30 23.203 30 23.203S14.425 30.125 1.447 30.99c0 0-6.922 26.823 9.517 41.532 0 0 4.327 4.327 19.036 13.845 14.71-9.518 19.035-13.845 19.035-13.845 16.44-14.709 9.519-41.532 9.519-41.532z"
            fill="url(#paint0_linear_1114_3143)"
          />
          <Path
            d="M52.127 36.345C42.07 35.675 30 30.311 30 30.311s-12.07 5.364-22.127 6.034c0 0-5.364 20.786 7.376 32.185 0 0 3.353 3.353 14.751 10.728C41.4 71.882 44.751 68.53 44.751 68.53c12.74-11.399 7.376-32.185 7.376-32.185z"
            fill="url(#paint1_linear_1114_3143)"
          />
          <Path
            d="M58.553 30.99C45.575 30.125 30 23.203 30 23.203S14.425 30.125 1.447 30.99c0 0-1.28 4.967-1.431 11.796.201 8.693 2.463 19.513 10.948 27.105 0 0 4.327 4.327 19.036 13.845C44.71 74.218 49.036 69.89 49.036 69.89 57.522 62.3 59.783 51.48 59.984 42.786c-.15-6.83-1.43-11.796-1.43-11.796zM44.565 66.034S41.255 69.344 30 76.627c-11.255-7.282-14.565-10.593-14.565-10.593-6.493-5.809-8.223-14.088-8.377-20.74.115-5.224 1.095-9.025 1.095-9.025C18.083 35.607 30 30.311 30 30.311s11.917 5.296 21.847 5.958c0 0 .98 3.8 1.096 9.026-.155 6.651-1.885 14.93-8.378 20.74z"
            fill="url(#paint2_linear_1114_3143)"
          />
          <Path
            d="M22.49 59.237l.187-.256 2.32-3.171.27-.369.33.316c1.23 1.177 2.61 1.926 4.109 1.926.93 0 1.643-.196 2.113-.533.452-.324.713-.801.713-1.47 0-.42-.056-.766-.184-1.053a1.636 1.636 0 00-.66-.731c-.69-.432-1.934-.704-4.132-.704h-.4v-4.338h.4c1.772 0 2.857-.274 3.49-.694.599-.396.837-.95.837-1.68 0-.642-.187-1.082-.492-1.366-.309-.288-.799-.47-1.514-.47-1.268 0-2.251.572-3.501 1.656l-.31.269-.26-.316-2.55-3.084-.252-.305.304-.256c2.007-1.687 4.19-2.697 6.795-2.697 2.236 0 4.137.521 5.49 1.573 1.364 1.062 2.127 2.633 2.127 4.627 0 1.122-.304 2.14-.924 3.001-.484.672-1.15 1.235-1.987 1.675.915.382 1.721.931 2.339 1.657.79.928 1.252 2.125 1.252 3.574 0 2.105-.968 3.756-2.484 4.868-1.506 1.105-3.54 1.673-5.7 1.673l-7.726-3.322zm0 0l.206.24m-.206-.24l.206.24m0 0c1.614 1.882 4.079 3.083 7.52 3.083l-7.52-3.083z"
            fill="#fff"
            stroke="#B76105"
            strokeWidth={0.8}
          />
          <Defs>
            <LinearGradient
              id="paint0_linear_1114_3143"
              x1={29.9998}
              y1={86.3667}
              x2={29.9998}
              y2={23.2029}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset={0.15625} stopColor="#B46510" />
              <Stop offset={0.526042} stopColor="#E39D52" />
              <Stop offset={0.9997} stopColor="#FDFAA6" />
              <Stop offset={0.9998} stopColor="#FFCD97" />
            </LinearGradient>
            <LinearGradient
              id="paint1_linear_1114_3143"
              x1={30.0001}
              y1={79.2582}
              x2={30.0001}
              y2={30.3107}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset={0.0989583} stopColor="#C56600" />
              <Stop offset={0.463542} stopColor="#FFCE9A" />
              <Stop offset={0.911458} stopColor="#BB6202" />
            </LinearGradient>
            <LinearGradient
              id="paint2_linear_1114_3143"
              x1={30}
              y1={83.7351}
              x2={30}
              y2={23.2029}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset={0.15625} stopColor="#CD7110" />
              <Stop offset={0.463542} stopColor="#FFC98E" />
              <Stop offset={0.859375} stopColor="#CD7110" />
            </LinearGradient>
          </Defs>
        </Svg>
      )
    default:
      break
  }
}

export default Rank
