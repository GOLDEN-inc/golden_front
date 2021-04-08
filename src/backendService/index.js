const {REACT_APP_API_URL} = process.env;

class BackEnd {
    async signup(email, password, name, golden, pix, telfone_wpp) {
        const user = {
            name,
            golden,
            email,
            password,
            pix,
            telfone_wpp
        };

        return fetch(`${REACT_APP_API_URL}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((response) => {
            return response.json();
        }).catch((err) => {
            return err;
        });
    }

    async signin(email, password) {
        const user = {
            email,
            password
        };

        return fetch(`${REACT_APP_API_URL}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((response) => {
            return response.json();
        }).catch((err) => {
            return err;
        });
    }

    async authenticate(jwt, next) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('jwt', JSON.stringify(jwt));
            next();
        }
    }

    async signout(next) {
        if (typeof window !== 'undefined') 
            localStorage.removeItem('jwt');
        

        next();
        return fetch(`${REACT_APP_API_URL}/signout`, {method: 'POST'}).then((response) => {
            console.log('signout', response);
            return response.json();
        }).catch((err) => console.log(err));
    }
}

export default new BackEnd();
