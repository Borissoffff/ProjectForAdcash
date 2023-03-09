
const baseUrl = 'http://localhost:8080/api/api.php';

export class BlackListDao{

    getBlackListUserById(userId) {
        let url = baseUrl + '?cmd=get-blacklist-user&id=' + userId;
        return fetch(url).then(response => response.json());
    }

    getBlackListUsers() {
        let url = baseUrl + '?cmd=get-blacklist-users';
        return fetch(url).then(response => response.json());
    }
}