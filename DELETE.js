const chai=require('chai');
const server=require('../index');
const chaihttp=require('chai-http');
const chaiaspromised=require('chai-as-promised');
chai.use(chaihttp);
chai.use(chaiaspromised);
chai.should();
describe("delete API-TASKS",function(){
    it("it should delete the data in the given ID ",function(done){
        
        chai.request(server)
            .delete("/api/1")
            .end((err,response) =>{
                if(err) throw(err);
                else{
                //console.log(response.body);
                response.should.have.status(200);
                response.body.should.have.property("name").eql('pramod');
                response.body.should.have.property("age").eql(20);
                }
                done()
            });

    });

    it("it should throw error for providing invalid ID ",function(done){
        
        chai.request(server)
            .delete("/api/12")
            .end((err,response) =>{
                if(err) throw(err);
                else{
                //console.log(response.body);
                response.should.have.status(404);
                response.text.should.be.eql("cannot find the entry to delete");
                }
                done()
            });

    });
   
   
});
