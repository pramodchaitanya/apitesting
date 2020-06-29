const chai=require('chai');
const server=require('../index');
const chaihttp=require('chai-http');
const chaiaspromised=require('chai-as-promised');
chai.use(chaihttp);
chai.use(chaiaspromised);
chai.should();
describe("GET API-TASKS",function(){
    it("GET the data from requested api ",function(done){
        //this.timeout(3000)
        chai.request(server)
            .get("/api")
            .end((err,response) =>{
                if(err) throw(err);
                else{
                //console.log(response.body);
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(4);
                //response.body[0].should.have.property("ID")
                }
                done()
            });

    });
    it("Should Not fetch data from wrong request ",function(done){
        //this.timeout(3000)
        
        chai.request(server)
            .get("/ap")
            .end((err,response) =>{
                if(err) throw(err);
                else{
                //console.log(response.body);
                response.should.have.status(404);
                
                //response.body.should.have.property("Message").eq()
               }
                done()
            });
    });
});

