
const baseUrl = 'http://localhost:8080/api/api.php';

export class UserDao {

    getAllUsers() {
        const url = baseUrl + '?cmd=show-users'
        return fetch(url).then(response => response.json());
    }

    saveUser(user) {
        const url = baseUrl + '?cmd=save-user';

        return fetch(url, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(user)
        });
    }

    deleteUser(userId) {
        const url = baseUrl + '?cmd=delete-user&id=' + userId;

        return fetch(url, {
            method: 'POST'
        });
    }

    getUserById(id) {
        let url = baseUrl + '?cmd=get-user&id=' + id;
        return fetch(url).then(response => response.json());
    }
}