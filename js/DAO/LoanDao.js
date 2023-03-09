const baseUrl = 'http://localhost:8080/api/api.php';

export class LoanDao {

    getAllLoans() {
        const url = baseUrl + '?cmd=get-loans'

        return fetch(url).then(response => response.json());
    }

    saveLoan(loan) {
        const url = baseUrl + '?cmd=save-loan';

        return fetch(url, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(loan)
        });
    }

    getLoansByUserId(userId) {
        let url = baseUrl + '?cmd=get-loans&userId=' + userId;
        return fetch(url).then(response => response.json());
    }

    deleteLoanById(loanId) {
        let url = baseUrl + '?cmd=delete-loan&id=' + loanId;
        return fetch(url).then(response => response.json());
    }
}