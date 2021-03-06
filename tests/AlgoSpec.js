'use strict';

describe("Algorithm tests", function(){

    var unit;
    beforeEach(function(){
        unit = {
            maxSpeed: 2,
            location: new steerjs.Vector(100,70),
            velocity: new steerjs.Vector(1,2),
            acceleration: steerjs.Vector.zero()
        };
    });

    it("Seek test - reach goal", function(){
        var goal = new steerjs.Vector(20,50);

        var reach = false;
        var count = 0;
        while(!reach){
            count++;

            var force = steerjs.seek(unit,goal,2);

            unit.acceleration.add(force);
            unit.velocity.add(unit.acceleration);
            unit.velocity.limit(unit.maxSpeed);
            unit.location.add(unit.velocity);
            unit.acceleration  = steerjs.Vector.zero();

           reach = steerjs.Vector.distance(unit.location, goal) <= 10;
        }
        expect(reach).toEqual(true);

    });

    it("Flee test - distance", function(){
        var goal = new steerjs.Vector(20,50);

        var distOne = steerjs.Vector.distance(goal,unit.location);
        var force = steerjs.flee(unit,goal,2);
        unit.acceleration.add(force);
        unit.velocity.add(unit.acceleration);
        unit.velocity.limit(unit.maxSpeed);
        unit.location.add(unit.velocity);
        unit.acceleration = steerjs.Vector.zero();

        var distTwo = steerjs.Vector.distance(unit.location, goal);

        expect(distTwo > distOne).toEqual(true);
    });

    //TODO coding test
    it("Pursuit test - distance", function(){

        var leader = {
            maxSpeed: 2,
            location: new steerjs.Vector(200,200),
            velocity: new steerjs.Vector(1,2),
            acceleration: steerjs.Vector.zero()
        };

        var distOne = steerjs.Vector.distance(unit.location, leader.location);

        for(var i = 0; i < 5;i++){
            var force = steerjs.pursuit(unit,leader,2);
            unit.acceleration.add(force);
            unit.velocity.add(unit.acceleration);
            unit.velocity.limit(unit.maxSpeed);
            unit.location.add(unit.velocity);
            unit.acceleration = steerjs.Vector.zero();
        }


        var distTwo = steerjs.Vector.distance(unit.location, leader.location);
        expect(distTwo < distOne).toEqual(true);

    });

    it("Pursuit test - reach leader", function(){
        var leader = {
            maxSpeed: 2,
            location: new steerjs.Vector(200,200),
            velocity: new steerjs.Vector(1,2),
            acceleration: steerjs.Vector.zero()
        };
        var reach = false;
        var count = 0;
        while(!reach && count < 1000){
            count++;

            var force = steerjs.pursuit(unit,leader,2);

            unit.acceleration.add(force);
            unit.velocity.add(unit.acceleration);
            unit.velocity.limit(unit.maxSpeed);
            unit.location.add(unit.velocity);
            unit.acceleration  = steerjs.Vector.zero();

            reach = steerjs.Vector.distance(unit.location, leader.location) <= 10;
        }
        expect(reach).toEqual(true);
    });

    it("Pursuit test - reach moving leader", function(){
        var leader = {
            maxSpeed: 1,
            location: new steerjs.Vector(200,200),
            velocity: new steerjs.Vector(1,1),
            acceleration: steerjs.Vector.zero()
        };
        var reach = false;
        var count = 0;
        while(!reach && count < 1000){
            count++;

            var force = steerjs.pursuit(unit,leader,2);

            unit.acceleration.add(force);
            unit.velocity.add(unit.acceleration);
            unit.velocity.limit(unit.maxSpeed);
            unit.location.add(unit.velocity);
            unit.acceleration  = steerjs.Vector.zero();

            leader.location.add(leader.velocity);

            reach = steerjs.Vector.distance(unit.location, leader.location) <= 10;
        }
        expect(reach).toEqual(true);
    });

    it("Evade test - distance", function(){
        var leader = {
            maxSpeed: 2,
            location: new steerjs.Vector(200,200),
            velocity: new steerjs.Vector(1,2),
            acceleration: steerjs.Vector.zero()
        };

        var distOne = steerjs.Vector.distance(unit.location, leader.location);

        for(var i = 0; i < 5;i++){
            var force = steerjs.evade(unit,leader,2);
            unit.acceleration.add(force);
            unit.velocity.add(unit.acceleration);
            unit.velocity.limit(unit.maxSpeed);
            unit.location.add(unit.velocity);
            unit.acceleration = steerjs.Vector.zero();
        }


        var distTwo = steerjs.Vector.distance(unit.location, leader.location);
        expect(distTwo < distOne).toEqual(true);
    });

    it("Arrival test - reach goal", function(){
        var goal = new steerjs.Vector(200,345);
        var reach = false;
        var count = 0;
        var fOne = steerjs.arrival(unit,goal,50, 1);
        var fTwo = null;
        while(!reach && count < 1000){
            count++;
            var force = steerjs.arrival(unit,goal,50, 1);
            fTwo = force;
            unit.acceleration.add(force);
            unit.velocity.add(unit.acceleration);
            unit.velocity.limit(unit.maxSpeed);
            unit.location.add(unit.velocity);
            unit.acceleration  = steerjs.Vector.zero();

            reach = steerjs.Vector.distance(unit.location, goal) <= 10;
        }
        expect(reach).toEqual(true);
        expect(fOne.length() > fTwo.length()).toEqual(true);
    });
});
