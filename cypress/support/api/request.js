class Requests {
    //verboRecurso

    getPing() {
        return cy.request({
            method: "GET",
            url: "ping",
            failOnStatusCode: false
        })
    }

    getbooking(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'GET',
            url: `booking/${id}`,
            headers: {
                cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode: false
        })
    }


    postBooking() {
        return cy.request({
            method: 'POST',
            url: 'booking',
            body: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
            },
            failOnStatusCode: false
        })
    }

    updateBookingWhithoutToken(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false
        })
    }

    updateBooking(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false
        })
    }

    updateBookingInexistent(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'PUT',
            url: 'booking/1' + id,
            headers: {
                cookie: 'token=' + Cypress.env('token')
            },
            body: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2021-01-01",
                    "checkout": "2021-01-02"
                },
                "additionalneeds": "Breakfast"
            },
            failOnStatusCode: false
        })
    }

    updateBookingTokenInvalid(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'PUT',
            url: 'booking/1' + id,
            headers: {
                cookie: 'token=' + Cypress.env('token') + "teste"
            },
            body: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2021-01-01",
                    "checkout": "2021-01-02"
                },
                "additionalneeds": "Breakfast"
            },
            failOnStatusCode: false
        })
    }

    postAuth() {
        return cy.request({
            method: 'POST',
            url: 'auth',
            body: {
                "username": "admin",
                "password": "password123"
            }
        })
    }

    doAuth() {
        this.postAuth().then(authResponse => {
            const token = authResponse.body.token;

            Cypress.env('token', token)
        })
    }

    deleteBooking(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode: false
        })
    }

    deleteBookingInexistent(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'DELETE',
            url: 'booking/1' + id,
            headers: {
                cookie: 'token=' + Cypress.env('token')
            },
            body: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2021-01-01",
                    "checkout": "2021-01-02"
                },
                "additionalneeds": "Breakfast"
            },
            failOnStatusCode: false
        })
    }

    deleteBookingWhithoutToken(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false
        })
    }
    deleteBookingTokenInvalid(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'PUT',
            url: 'booking/1' + id,
            headers: {
                cookie: 'token=' + Cypress.env('token') + "teste"
            },
            body: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2021-01-01",
                    "checkout": "2021-01-02"
                },
                "additionalneeds": "Breakfast"
            },
            failOnStatusCode: false
        })
    }
}

export default new Requests();