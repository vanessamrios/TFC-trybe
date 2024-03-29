import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Matches from '../database/models/Matches';
import * as jwtGenerator from '../helpers/jwtGenerator';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o endpoint /matches', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves();
    sinon
      .stub(Matches, "create")
      .resolves({
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 8,
        awayTeamGoals: 2,
        inProgress: true,
      } as Matches);
    sinon
      .stub(Matches, "update")
      .resolves();
    sinon
      .stub(Matches, "findOne")
      .resolves({
        id: 46,
        homeTeam: 4,
        homeTeamGoals: 1,
        awayTeam: 12,
        awayTeamGoals: 1,
        inProgress: true,
      } as Matches);
    sinon
      .stub(jwtGenerator, "verify")
      .resolves();
  });

  afterEach(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
    (Matches.create as sinon.SinonStub).restore();
    (jwtGenerator.verify as sinon.SinonStub).restore();
    (Matches.update as sinon.SinonStub).restore();
    (Matches.findOne as sinon.SinonStub).restore();
  })

  it('Retorna um status 200 e uma lista de partidas', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches')

    expect(chaiHttpResponse.status).to.be.equal(200)
  });

  it('Retorna um status 201 e os dados da partida criada', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', '123')
      .send( {
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true
      })
      const responseBody = {
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 8,
        awayTeamGoals: 2,
        inProgress: true,}
    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.eql(responseBody)

  });

  it('Retorna um status 401 e uma mensagem de erro se a requisição for feita com times iguais', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', '123')
      .send( {
        homeTeam: 16,
        awayTeam: 16,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true
      })
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.eql({ message: "It is not possible to create a match with two equal teams" })

  });

  it('Retorna um status 401 se não houver token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send( {
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true
      })
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'Token not found' })

  });

  it('Retorna um status 200 e a mensagem finished quando o campo inProgress é alterado para false', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .patch('/matches/41/finish')

    expect(chaiHttpResponse.status).to.be.equal(200)
  });

  it('Retorna um status 200 e uma mensagem no corpo quando uma partida em andamento é atualizada.', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .patch('/matches/46')
    .send( {
      homeTeamGoals: 2,
      awayTeamGoals: 1
    } )
 expect(chaiHttpResponse.status).to.be.equal(200)
 expect(chaiHttpResponse.body).to.be.eql({ message: 'Updated' })
  });

});
