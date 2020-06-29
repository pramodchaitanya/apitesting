const chai=require('chai');
const server=require('../index');
const chaihttp=require('chai-http');
const chaiaspromised=require('chai-as-promised');
chai.use(chaihttp);
chai.use(chaiaspromised);
chai.should();
describe("CREATE and POST API-TASKS",function(){
    it("it should POST the data ",function(done){
        //this.timeout(3000)
        var task={

            
            "name":"sap",
            "age": 76
        };
        chai.request(server)
            .post("/api")
            .send(task)
            .end((err,response) =>{
                if(err) throw(err);
                else{
                //console.log(response.body);
                response.should.have.status(201);
                response.body.should.be.a('object');
                
                response.body.should.have.property("name").eql("sap")
                response.body.should.have.property("age").eql(76)
                }
                done()
            });

    });
    it("it should POST the data with default values if any data is missing ",function(done){
        //this.timeout(3000)
        
        var task={
            
           "name":"man"
        };
        chai.request(server)
            .post("/api")
            .send(task)
            .end((err,response) =>{
                if(err) throw(err);
                else{
                //console.log(response.body);
                response.should.have.status(405);
                response.text.should.be.eql("Required fields are missing")
                }
                done()
            });

    });
   
});
