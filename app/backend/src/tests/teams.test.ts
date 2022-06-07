import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Teams from '../database/models/Teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o endpoint /teams', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves();
  });

  afterEach(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('Retorna um status 200 e uma lista de times', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')

    expect(chaiHttpResponse.status).to.be.equal(200)
  });

});
