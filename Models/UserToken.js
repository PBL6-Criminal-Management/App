class UserToken {
    constructor(data){
        if(data != null){
            this.token = data.token
            this.refreshToken = data.refreshToken
            this.userName = data.userName
            this.email = data.email
            this.avatarUrl = data.avatarUrl
            this.role = data.role
            this.refreshTokenExpiryTime = data.refreshTokenExpiryTime
        }
    }
}

export default UserToken;