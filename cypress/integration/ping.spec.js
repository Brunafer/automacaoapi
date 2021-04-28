/// <reference types="cypress"/>

import req from '../support/api/request'
import assertions from '../support/api/assertions'

context('Ping', () => {
    it('Validar que a aplicação está ativa @healthcheck', () => {
        req.getPing().then(getPingResponse => {
            assertions.shouldHaveStatus(getPingResponse, 201)
        })
        // https://treinamento-api.herokuapp.com/ping
        //req.getPing().its('status').should('eq',201)

        // cy request -> responde -> body, status, headers(propriedades) usamos o its para definir qual propriedade queremos trabalhar

    });
});
