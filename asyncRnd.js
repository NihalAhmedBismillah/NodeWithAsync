const async = require('async')

////////////////// parallel //////////////////////////

let parallelTasks = {

    getUser: (cb) => {

        setTimeout(() => {
            console.log('getUser callback');
            cb(null, { name: 'nihal', address: 'pune' })
        }, 100);

    },
    getProduct: (cb) => {
        setTimeout(() => {
            console.log('getProduct callback');
            cb(null, { name: 'Glass', address: 'pune' })
        }, 10);
    },

    getOrder: (cb) => {
        setTimeout(() => {
            console.log('getOrder callback');
            cb(null, { name: 'Mobile', address: 'Mumbai' })
        }, 0);
    }
}

/// Object base

async.parallel({

    getUser: (cb) => {

        setTimeout(() => {
            console.log('getUser callback');
            cb(null, { name: 'nihal', address: 'pune' });
        }, 100);

    },
    getProduct: (cb) => {
        setTimeout(() => {
            console.log('getProduct callback');
            cb(null, { name: 'Glass', address: 'pune' });
        }, 10);
    },

    getOrder: (cb) => {
        setTimeout(() => {
            console.log('getOrder callback');
            cb(null, { name: 'Mobile', address: 'Mumbai' });
        }, 1000);
    }


}, (error, results) => {

    if (!error) {
        console.log(JSON.stringify(results));
    } else {
        console.log(JSON.stringify(error))
    }

})

function getF1(cb) {

    setTimeout(() => {

        console.log('get F1 called!....');
        cb(null, { name: 'Nihal Ahmed' });
    }, 10);

}
function getF2(cb) {

    setTimeout(() => {

        console.log('get F2 called!...');
        cb(null, { name: 'Nihal Ahmed' });
    }, 10);

}
function getF3(cb) {

    setTimeout(() => {

        console.log('get F3 called!....');
        cb(null, { name: 'Nihal Ahmed' });
    }, 10);

}

let callbackArray = [];
callbackArray.push(getF1);
callbackArray.push(getF2);
callbackArray.push(getF3);
 ////Arrany base
async.parallel(callbackArray
    , (error, results) => {
        if (!error) {
            console.log('==================================================\n\n\n\n');
            console.log(JSON.stringify(results));
        }
    });

////////////////////////  Water fall ///////////////////////////


// systence

// async.waterfall([
//     _function1(data,cb){cb(error,data);},
//     _function2(data,cb){cb(error,data)},
//     _function3(data,cb)(cb(error,data))
// ], function (error, success) {
//     if (error) { alert('Something is wrong!'); }
//     return alert('Done!');
// });


async.waterfall([

    function(cb) {

        setTimeout(() => {
            data = { name: 'nihal', address: 'pune', cb: '1' };
            cb(undefined,data)
        }, 10)
    },
    function(data1, cb) {

        setTimeout(() => {

            data = { name: 'nihal', address: 'pune', cb: '2',data1:data1 };
            cb(undefined,data)
        }, 10);
    },
    function(data2, cb) {

        setTimeout(() => {

            data = { name: 'nihal', address: 'pune', cb: '3',data2 : data2 };
            cb(undefined,data)
        }, 10)

    }

], (error, results) => {

    console.log(JSON.stringify(results));
});


 ///