// export const API_URL = "http://192.168.1.5:5678/api/"; //local host server
export const API_URL = "https://webapi20231201090531.azurewebsites.net/api/";
//Note: if demo aspnet backend at localhost, change this API_URL and applicationUrl field
//in launchSettings.json file of aspnet to your wifi ip on computer (only http (not https) that working at localhost)
//(keep port 5678)
//else aspnet deployed then change API_URL to your server url
//https://webapi20231201090531.azurewebsites.net/api/

export const ACCESS_TOKEN_NAME = "accessToken";

export const roleEnum = {
    0: "Quản trị viên",
    1: "Nhân viên",
    2: "Điều tra viên",
};

export const wantedType = {
    0: "Bình thường",
    1: "Nguy hiểm",
    2: "Đặc biệt",
};

export const criminalStatus = {
    0: "Đang ngồi tù",
    1: "Đã được thả",
    2: "Bị truy nã",
    3: "Chưa kết án",
    4: "Án treo",
    5: "Đã bị bắt",
};

export const typeOfViolation = {
    0: "Hình sự",
    1: "Dân sự",
};

export const gender = {
    0: "Nam",
    1: "Nữ",
};
