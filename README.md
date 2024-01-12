# Mobile app for criminal management

# Guide

Sau khi clone về, tại thư mục này, gõ lệnh:
**npm install**
để tải các node_modules cần thiết

Tiếp đến bật android emulator lên (hoặc mở điện thoại mình),
sau đó npx expo start (hoặc npm start) để chạy chương trình, trong màn hình console sẽ hiển thị menu các ký tự với các chức năng tương ứng

    + Android emulator: bấm 'a' để chạy app trên android

    + Điện thoại: tải expo go về, sau đó đối với iphone thì mở camera quét QR trên màn hình console ->
    mở bằng expo, còn đối với android thì dùng camera của expo go để quét QR để chạy app

\*Nếu trên android đang chạy 1 app nào đó hoặc muốn reload lại app thì bấm thêm 'r'

Nếu muốn cài một package nào đó trong project hiện tại thì gõ 'npm install <package_name>', nếu muốn cài cho global thì gõ 'npm install -g <package_name>'

Lưu package 'react-native-gesture-handler' vào project bằng lệnh 'npm install --save react-native-gesture-handler'

# Về việc viết css

Trong thư mục Pages chứa các trang của app, mỗi trang là 1 thư mục bao gồm file index và file styles tương ứng

> note: nếu không rõ về các react component thì mở react native tutorial lên mà học :v

> note-2: nên tạo 1 branch để tránh bị conflict nếu commit css
