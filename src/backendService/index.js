class BackEnd {
    async signup(email, password, name, golden, pix, telfone_wpp) {

        const user = {
            name,
            golden,
            email,
            password,
            pix,
            telfone_wpp
        }

        return fetch("http://localhost:8081/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(response => {
            return response.json()
        }).catch(err => {
            return err
        })
    }

    async logout() {
        return fetch("http://localhost:8081/signout", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(response => {
            return response.json()
        }).catch(err => console.log(err))

    }
}

export default new BackEnd()
