class User {
    async getUserByGolden(golden) {
        return fetch(`${
            process.env.REACT_APP_API_URL
        }/user/${golden}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).catch((err) => {
            return err;
        });
    }
}

export default new User();
