// export const API_URL = "http://192.168.1.4:5678/api/"; //local host server
export const API_URL = "https://criminal-management.onrender.com/api/";
//Note: if demo aspnet backend at localhost, change this API_URL and applicationUrl field
//in launchSettings.json file of aspnet to your wifi ip on computer (only http (not https) that working at localhost)
//(keep port 5678)
//else aspnet deployed then change API_URL to your server url
//https://criminal-management.onrender.com/api/

export const ACCESS_TOKEN_NAME = "accessToken";

export const roleEnum = [
    (Admin = { name: "Quản trị viên", value: 0 }),
    (Officer = { name: "Nhân viên", value: 1 }),
    (Investigator = { name: "Điều tra viên", value: 2 }),
];
