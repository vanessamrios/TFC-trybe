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
    sinon
      .stub(Teams, "findOne")
      .resolves({id: 5, teamName: "Cruzeiro"} as Teams);
  });

  afterEach(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
    (Teams.findOne as sinon.SinonStub).restore();
  })

  it('Retorna um status 200 e uma lista de times', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')

    expect(chaiHttpResponse.status).to.be.equal(200)
  });

  it('Retorna um status 200 e o time cujo id foi passado', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/teams/5')

    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.eql({id: 5, teamName: "Cruzeiro"})
  });

});
