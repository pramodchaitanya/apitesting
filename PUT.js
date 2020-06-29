const chai=require('chai');
const server=require('../index');
const chaihttp=require('chai-http');
const chaiaspromised=require('chai-as-promised');
chai.use(chaihttp);
chai.use(chaiaspromised);
chai.should();
describe("UPDATE API-TASKS",function(){
    it("it should update the data in a ID ",function(done){
        //this.timeout(3000)
        
        var task={
            
            "name": "sap",
           
            "age": 80
        };
        chai.request(server)
            .put("/api/2")
            .send(task)
            .end((err,response) =>{
                if(err) throw(err);
                else{
                //console.log(response.body);
                response.should.have.status(200);
                response.body.should.be.a('object');
               
                response.body.should.have.property("name").eql("sap")
                response.body.should.have.property("age").eql(80)
                }
                done()
            });

    });
   
    it("it should throw error while update the data for a given ID ",function(done){
        //this.timeout(3000)
        
        var task={
            
            "name": "sap",
           
            "age": 80
        };
        chai.request(server)
            .put("/api/23")
            .send(task)
            .end((err,response) =>{
                if(err) throw(err);
                else{
                //console.log(response.body);
                response.should.have.status(404);
                
                response.text.should.be.eql('cannot find the data with given data to update')
                done()
                }
            });

    });
    it("it should throw error for missing values update the data for a given ID ",function(done){
        //this.timeout(3000)
        
        var task={
           
            "age": 80
        };
        chai.request(server)
            .put("/api/2")
            .send(task)
            .end((err,response) =>{
                if(err) throw(err);
                else{
                //console.log(response.body);
                response.should.have.status(405);
                
                response.text.should.be.eql('Cannot update the values,Required fields are missing')
                done()
                }
            });

    });
});
