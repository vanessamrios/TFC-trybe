import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Users from '../database/models/Users';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o endpoint /login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(
        {
          id: 1,
          username: 'Admin',
          role: 'admin',
          email: 'admin@admin.com',
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
        } as Users);
  });

  afterEach(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Permite o acesso com dados válidos', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send( {email: 'admin@admin.com', password: 'secret_admin' })

    expect(chaiHttpResponse.status).to.be.equal(200)
  });

  it('Não permite o acesso com senha incorreta', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send( {email: 'admin@admin.com', password: 'senhaincorreta' })

    expect(chaiHttpResponse.status).to.be.equal(401)
    expect(chaiHttpResponse.body).to.be.eql({error: 'Invalid password'})
  });
});
