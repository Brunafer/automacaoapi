/// <reference types="cypress"/>

import req from '../support/api/request'
import schemas from '../support/api/schemas'
import assertions from '../support/api/assertions'



context('Booking', () => {
    before(() => {
        req.doAuth()
    });

    it('Validar o contrato do Get Booking @contract', () => {
        req.postBooking().then(postBookingResponse =>{
            req.getbooking(postBookingResponse).then(getBookingResponse => {
                assertions.validateContractOf(getBookingResponse, schemas.getBookingSchema())
            console.log(getBookingResponse);
            })
        })
    });

    it('Criar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            assertions.shouldHaveStatus(postBookingResponse, 200)
            assertions.shouldBookingIdIsNotNull(postBookingResponse)
            assertions.shouldHaveDefaultHeaders(postBookingResponse)
            assertions.shouldHaveContentTypeAppJson(postBookingResponse)
            assertions.shouldDuractionBeFast(postBookingResponse)
        })

    });

    //tentar alterar uma reserva sem token - 403
    //tentar alterar uma reserva com token inválio - 403
    //alterar uma reserva com sucesso - 200

    it('Tentar alterar uma reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingWhithoutToken(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
            })
        })
    });

    it('Alterar uma reserva com sucesso @functional ', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBooking(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 200)

            })
        })
    });

    it('Alterar uma reserva inexistente @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingInexistent(postBookingResponse).then(putBookingResponse => {
                    assertions.shouldHaveStatus(putBookingResponse, 405)
                       
            })
    })

});

it('Alterar uma reserva com token inválido @functional', () => {
    req.postBooking().then(postBookingResponse => {
        req.updateBookingTokenInvalid(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
                   
        })
})

});
// tentar excluir uma reserva sem token -> 403
// tentar excluir uma reserva com token invalido -> 403
// excluir uma reserva com sucesso -> 201

it('Excluir uma reserva com sucesso @functional', () => {
    req.postBooking().then(postBookingResponse => {
        req.deleteBooking(postBookingResponse).then(deleteBookingResponse => {
            assertions.shouldHaveStatus(deleteBookingResponse, 201)
        })
    })

});

it('Excluir uma reserva inexistente @functional', () => {
    req.postBooking().then(postBookingResponse => {
        req.deleteBookingInexistent(postBookingResponse).then(deleteBookingResponse => {
            assertions.shouldHaveStatus(deleteBookingResponse, 405)
        })
        
    })
});

it('Excluir uma reserva sem token @functional', () => {
    req.postBooking().then(postBookingResponse => {
        req.deleteBookingWhithoutToken(postBookingResponse).then(deleteBookingResponse => {
            assertions.shouldHaveStatus(deleteBookingResponse, 403)
        })
    })
});

it('Alterar uma reserva com token inválido @functional', () => {
    req.postBooking().then(postBookingResponse => {
        req.deleteBookingTokenInvalid(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 403)
                   
        })
})

});

    

   
});

