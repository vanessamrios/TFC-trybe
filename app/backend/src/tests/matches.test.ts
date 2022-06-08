import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Matches from '../database/models/Matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o endpoint /teams', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves();
  });

  afterEach(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('Retorna um status 200 e uma lista de partidas', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches')

    expect(chaiHttpResponse.status).to.be.equal(200)
  });

});
