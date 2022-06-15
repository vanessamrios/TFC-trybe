import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Teams from '../database/models/Teams';
import TeamRanking from '../Interfaces/TeamRanking.interface';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o endpoint /leaderboard/home', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves();
  });

  afterEach(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('Retorna um status 200 e um ranking', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches')

    expect(chaiHttpResponse.status).to.be.equal(200)
  });

});
