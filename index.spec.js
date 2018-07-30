const request = require('supertest');
const should = require('should');
const app = require('./index');

describe('GET /users', () => {
    describe('Success', () => {
        it('Responding array of user', (done) => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                });
        });

        it('Responding limit count in users ', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2)
                    done();
                });
        });
    });
    describe('Fail', () => {
        it('If limit is not number then responding 400', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        })
    })
});


describe('GET /users/:id', () => {
    describe('Success', () => {
        it('Responding user object that id is 1', (done) => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    done();
                });
        });

    });
    describe('Fail', () => {
        it('Responding 400 if id is not number', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        })
        it('Responding 404 if id is not exist.', (done) => {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);
        })
    })
});


describe('DELETE /users/:id', () => {
    describe('Success', () => {
        it('Responding 200', (done) => {
            request(app)
                .get('/users/1')
                .expect(200)
                .end(done);
        });

    });
    describe('Fail', () => {
        it('Responding 400 if id is not number', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        })
    })
});


describe('POST /users', () => {
    describe('Success', () => {
        let name = 'daniel', body;
        before(done => {
            request(app)
                .post('/users')
                .send({ name })
                .expect(201)
                .end((err, res) => {
                    body = res.body;
                    done();
                });
        });
        it('Return object that created', () => {
            body.should.have.property('id');
        });
        it('Return name', () => {
            body.should.have.property('name', name)
        })
    });
    describe('Fail', () => {
        it('Responding 400 if there is no name', (done) => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done);
        })
        it('Responding 409 if the name is duplicated', (done) => {
            request(app)
                .post('/users')
                .send({ name: 'daniel' })
                .expect(409)
                .end(done);
        })
    })


});




describe('PUT /users/:id', () => {
    describe('Success', () => {
        it('Responding name that changed', (done) => {
            const name = 'chally';
            request(app)
                .put('/users/3')
                .send({ name })
                .end((err, res) => {
                    res.body.should.have.property('name', name);
                    done();
                });
        })
    });
    describe('Fail', () => {
        it('Responding 400 if id is not number', done => {
            request(app)
                .put('/users/one')
                .expect(400)
                .end(done);
        });
        it('Responding 400 if there is no name', done => {
            request(app)
                .put('/users/1')
                .send({})
                .expect(400)
                .end(done);
        });
        it('Responding 404 there is no user', done => {
            request(app)
                .put('/users/999')
                .send({ name: 'foo' })
                .expect(404)
                .end(done);
        });
        it('Responding 409 if the name is duplicated', done => {
            request(app)
                .put('/users/3')
                .send({ name: 'Tom' })
                .expect(409)
                .end(done);
        })
    })
});
