const chai=require('chai');
const server=require('../index');
const chaihttp=require('chai-http');
const chaiaspromised=require('chai-as-promised');
chai.use(chaihttp);
chai.use(chaiaspromised);
chai.should();
describe("get API-TASKS by ID",function(){
    it("GET the data from requested api by ID",function(done){
        //this.timeout(3000)
        //let url="http://fakerestapi.azurewebsites.net"
        var ID="2"
        chai.request(server)
            .get("/api/"+ID)
            .end((err,response) =>{
                if(err) throw(err);
                else{
                //console.log(response.body);
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property("id").eql(2)
                response.body.should.have.property("name").eql("manogna")
                }
                done()
            });

    });
    it("Should Not fetch data if wrong ID is given ",function(done){
        //this.timeout(3000)
        chai.request(server)
            .get("/api/123")
            .end((err,response) =>{
                if(err) throw(err);
                else{
                //console.log(response.body);
                response.should.have.status(404);
                response.text.should.be.eq('Requested data is not found')
                
               }
                done()
            });
    });
});
