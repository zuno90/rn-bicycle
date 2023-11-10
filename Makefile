start:
	yarn start --reset-cache
android:
	yarn android
pi:
	npx pod-install

dl-ios:
	npx uri-scheme open "zunobicycle://product/2/Xe-dap-gap-nhap-khau-tu-Nhat-Ban-ma-san-pham-H2JF2A4S9N" --ios
dl-android:
	npx uri-scheme open "zunobicycle://product/2/Xe-dap-gap-nhap-khau-tu-Nhat-Ban-ma-san-pham-H2JF2A4S9N" --android