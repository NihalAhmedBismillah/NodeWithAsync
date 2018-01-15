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

const async = require('async');
//
const arrWithObject = [
    { name: 'Nihal AHmed', address: 'pune' },
    { name: 'Jalal', address: 'mumbai' },
    { name: 'Jamal Ahmed', address: 'pune' }
];

const arr = [1, 2, 3, 4, 5];
const objwithArray = { name: 'nihal', address: 'pune' };

//First form
async.concat(arrWithObject, (item, callback) => {

    // if (item.name) {
    //     callback(null, item.name);
    // } else {
    //     console.log('I am called!')
    //     callback('hello', null);
    // }


    /// AS a 

    if (item.name)
        return callback(null, item.name);
    console.log('I am called!')
    return callback('hello', null);


}
    , (error, finalResult) => {

        console.log(error);
        console.log(finalResult);
        //[ 'Nihal AHmed', 'Jalal', 'Jamal Ahmed' ]

    });

/// Second form

//(arrayListOrObjectList,function(x,cb){cb()},function(finalError,finalResult){});
// Or
//(arrayListOrObjectList,(x,cb)=>{cb()},(finalError,finalResult)=>{});
async.concat(arr, (x, cb) => {

    cb(undefined, x * x);

},
    (error, finalResult) => {

        console.log(finalResult);

    });


////////////////////////////////////////////////

const async = require('async');
//
const arrWithObject = [
    { name: 'Nihal AHmed', address: 'pune' },
    { name: 'Jalal', address: 'mumbai' },
    { name: 'Jamal Ahmed', address: 'pune' }
];

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const objwithArray = { name: 'nihal', address: 'pune' };

async.concatLimit(arrWithObject, 2, (item, callback) => {

    callback(undefined,item.name);

}, (error, finalResult) => {
    console.log(finalResult);
})
////////////////////////////////////////////////////////////

const async = require('async');
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let strTime = new Date();
console.log(strTime);
let endTime  ;
async.concatSeries(arr,(x,callback)=>{
     // dosome asynch call 
     setTimeout(() => {
        callback(undefined,x*x);
     }, 1000);
},(error,finalResult)=>{
    endTime  = new Date();
console.log(endTime);
console.log(endTime-strTime);
console.log(finalResult);
});


////performane analysis//////////////////
/*
/// with limit ///////////

13142 limit 1
5033 limit 3
2030 limit 7

/// parallel ////////

1025 

//////////// Series////////

13100
*/
/////////////////////////////////////////////////////////
const async = require('async');
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

async.detect(arr, (x, callback) => {
    // dosome asynch call 
    setTimeout(() => {
        if (x === 5) {
           
            console.log('if called')
          return  callback(null, x);
        } else {
            console.log('else called')
          return  callback(null)
        }

    }, 1000);
}, (error, finalResult) => {

    console.log(finalResult);
});


async.detectLimit(arr, 3, (x, callback) => {
    // dosome asynch call 
    setTimeout(() => {
        if (x === 5) {
            callback(null, x);
            console.log('if called')
        } else {
            console.log('else called')
            callback(null)
        }

    }, 1000);
}, (error, finalResult) => {

    console.log(finalResult);
});


async.detectSeries(arr, (x, callback) => {
    // dosome asynch call 
    setTimeout(() => {
        if (x === 5) {
            callback(null, x);
            console.log('if called')
        } else {
            console.log('else called')
            callback(null)
        }

    }, 1000);
}, (error, finalResult) => {

    console.log(finalResult);
});

///////////////////////////////////////////

const async = require('async');
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

async.each(arr, (x, callback) => {
    // dosome asynch call 
    setTimeout(() => {
        if (x === 6) {
            console.log('if called')
            return callback(x);
        } else {
            console.log('else called')
            return callback(null)
        }

    }, 1000);
}, (error, finalResult) => {

    console.log(finalResult);
});


async.eachLimit(arr,1, (x, callback) => {
    // dosome asynch call 
    setTimeout(() => {
        if (x === 6) {
            console.log('if called')
            return callback(x);
        } else {
            console.log('else called')
            return callback(null)
        }

    }, 1000);
}, (error, finalResult) => {

    console.log(finalResult);
});

async.eachSeries(arr, (x, callback) => {
    // dosome asynch call 
    setTimeout(() => {
        if (x === 6) {
            console.log('if called')
            return callback(x);
        } else {
            console.log('else called')
            return callback(null)
        }

    }, 1000);
}, (error, finalResult) => {

    console.log(finalResult);
});
//////////////////////////////////////

const async = require('async');
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const arrWithObject = [
    { name: 'Nihal AHmed', address: 'pune' },
    { name: 'Jalal', address: 'mumbai' },
    { name: 'Jamal Ahmed', address: 'pune' }
];
async.eachOf(arrWithObject, (value, index, callback) => {

    // dosome asynch call 

    setTimeout(() => {
        console.log(index)
        if (value.name === 'Jalal') {
            return callback('stop loop');
        } else {
            return callback(undefined);
        }
    }, 1000);

},
    (error) => {
        console.log(error)
    });

const objwithArray =
    {
        name: 'Nihal AHmed', address: 'pune',
        name1: 'Jalal', address1: 'mumbai',
        name2: 'Jamal Ahmed', address3: 'pune'
    };


async.eachOf(objwithArray, (value, key, callback) => {

    // dosome asynch call 

    setTimeout(() => {
        console.log(key)
        if (value.name === 'Jalal') {
            return callback('stop loop');
        } else {
            return callback(undefined);
        }
    }, 1000);

},
    (error) => {
        console.log(error)
    });

/////////////////////////////////////////////////
const async = require('async');
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

async.every(arr, (item, callback) => {

    setTimeout(() => {

        if (item === 5) {
            console.log('I am in if ');
             callback(false,undefined);
        } else {
            console.log('I am in else ');
             callback(undefined,true);
        }
    }, 1000)

}, (error, finalResult) => {

    console.log(error);
    console.log(finalResult);
});


async.everyLimit(arr,2, (item, callback) => {

    setTimeout(() => {

        if (item === 5) {
            console.log('I am in if ');
             callback(false,undefined);
        } else {
            console.log('I am in else ');
             callback(undefined,true);
        }
    }, 1000)

}, (error, finalResult) => {
    console.log(error);
    console.log(finalResult);
});

async.everySeries(arr,(item, callback) => {

    setTimeout(() => {

        if (item === 5) {
            console.log('I am in if ');
             callback(false,undefined);
        } else {
            console.log('I am in else ');
             callback(undefined,true);
        }
    }, 1000)

}, (error, finalResult) => {

    console.log(error);
    console.log(finalResult);

});
///////////////////////////////////////////////
const async = require('async');
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

async.filter(arr, (item, callback) => {

    setTimeout(() => {
        if (item % 2 === 0) {
            console.log('I am in if ');
            return callback(undefined, true);
        } else {
            console.log('I am in else ');
            return callback(undefined, false);
        }
    }, 1000);
},
    (error, finalResult) => {
        console.log(finalResult);
        console.log(error);

    });


async.filterLimit(arr, 4, (item, callback) => {

    setTimeout(() => {
        if (item % 2 === 0) {
            console.log('I am in if ');
            return callback(undefined, true);
        } else {
            console.log('I am in else ');
            return callback(undefined, false);
        }
    }, 1000);
},
    (error, finalResult) => {
        console.log(finalResult);
        console.log(error);

    });

async.filterSeries(arr, (item, callback) => {

    setTimeout(() => {
        if (item % 2 === 0) {
            console.log('I am in if ');
            return callback(undefined, true);
        } else {
            console.log('I am in else ');
            return callback(undefined, false);
        }
    }, 1000);
},
    (error, finalResult) => {
        console.log(finalResult);
        console.log(error);

    });


const getUser = (para1, para2) => {

    // dosome async operation
    let promise = new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve({ data: 'data' });
        }, 100)

    })
    return promise;
}

// Or //////////

const getUser1  = (para1,para2)=>{

      return new Promise((resolve,reject)=>{

       setTimeout(()=>{
           resolve({data:'data'});
       },100);

      });
}

getUser(2,3)
.then(getUser1)
.then((data)=>{
    
    console.log(data);
})
//////////////////////////////////////////////////


const async = require('async');
//
const arrWithObject = [
    { id: 1, name: 'Nihal Ahmed', address: 'pune' },
    { id: 2, name: 'Jalal', address: 'mumbai' },
    { id: 3, name: 'Jalal', address: 'pune' }
];

const findUser = (id, callback) => {

    const user = arrWithObject.find((item) => {

        return item.id === id;
    });
    callback(undefined, user);
}

const arr = [1, 2, 3];
async.groupBy(arr, (x, callback) => {

    findUser(x, (error, user) => {
        if (!error) {
            return callback(undefined, user.address);
        } else {
            return callback(error, undefined);
        }
    });

}, (error, finalResult) => {

    console.log(JSON.stringify(finalResult));
    //{"pune":[1,3],"mumbai":[2]}

});

async.groupByLimit(arr,2, (x, callback) => {

    findUser(x, (error, user) => {
        if (!error) {
            return callback(undefined, user.name);
        } else {
            return callback(error, undefined);
        }
    });

}, (error, finalResult) => {

    console.log(JSON.stringify(finalResult));
    //{"Nihal Ahmed":[1],"Jalal":[2,3]} 

});

async.groupBySeries(arr, (x, callback) => {

    findUser(x, (error, user) => {
        if (!error) {
            return callback(undefined, user.name);
        } else {
            return callback(error, undefined);
        }
    });

}, (error, finalResult) => {

    console.log(JSON.stringify(finalResult));
    //{"Nihal Ahmed":[1],"Jalal":[2,3]} 

});
//////////////////////////////////
const async = require('async');
//
const arrWithObject = [
    { id: 1, name: 'Nihal Ahmed', address: 'pune' },
    { id: 2, name: 'Jalal', address: 'mumbai' },
    { id: 3, name: 'Jalal', address: 'pune' }
];

const findUser = (id, callback) => {

    const user = arrWithObject.find((item) => {

        return item.id === id;
    });
    callback(undefined, user);
}

const arr = [1, 2, 3];
async.map(arr, (x, callback) => {

    findUser(x, (error, user) => {
        if (!error) {
            return callback(undefined, { address: user.address, name: user.name }); // note point
        } else {
            return callback(error, undefined);
        }
    });

}, (error, finalResult) => {

    console.log(JSON.stringify(finalResult));
    //[{"address":"pune","name":"Nihal Ahmed"},{"address":"mumbai","name":"Jalal"},{"address":"pune","name":"Jalal"}]

});

async.mapLimit(arr, 2, (x, callback) => {

    findUser(x, (error, user) => {
        if (!error) {
            return callback(undefined, { address: user.address, name: user.name }); // note point
        } else {
            return callback(error, undefined);
        }
    });

}, (error, finalResult) => {

    console.log(JSON.stringify(finalResult));
    //[{"address":"pune","name":"Nihal Ahmed"},{"address":"mumbai","name":"Jalal"},{"address":"pune","name":"Jalal"}]

});

async.map(arr, (x, callback) => {

    findUser(x, (error, user) => {
        if (!error) {
            return callback(undefined, { address: user.address, name: user.name }); // note point
        } else {
            return callback(error, undefined);
        }
    });

}, (error, finalResult) => {

    console.log(JSON.stringify(finalResult));
    //[{"address":"pune","name":"Nihal Ahmed"},{"address":"mumbai","name":"Jalal"},{"address":"pune","name":"Jalal"}]

});

async.mapSeries(arr, (x, callback) => {

    findUser(x, (error, user) => {
        if (!error) {
            return callback(undefined, { address: user.address, name: user.name }); // note point
        } else {
            return callback(error, undefined);
        }
    });

}, (error, finalResult) => {

    console.log(JSON.stringify(finalResult));
    //[{"address":"pune","name":"Nihal Ahmed"},{"address":"mumbai","name":"Jalal"},{"address":"pune","name":"Jalal"}]

});
//////////////////////////////////////////////

const async = require('async');
//
const arrWithObject = [
    { id: 1, name: 'Nihal Ahmed', address: 'pune' },
    { id: 2, name: 'Jalal', address: 'mumbai' },
    { id: 3, name: 'Jalal', address: 'pune' }
];

const findUser = (id, callback) => {

    const user = arrWithObject.find((item) => {

        return item.id === id;
    });
    callback(undefined, user);
}


async.mapValues({ id: '1', afda: '2', adsfa: '3' }, (obj, key, callback) => {

    console.log(obj);
    console.log(key);
    setTimeout(() => {

        callback(undefined,obj);

    }, 100)

},
    (error, finalResult) => {
        console.log(finalResult)

    });
/////////////////////////////////////////////

const async = require('async');
//
const arrWithObject = [
    { id: 1, name: 'Nihal Ahmed', address: 'pune' },
    { id: 2, name: 'Jalal', address: 'mumbai' },
    { id: 3, name: 'Jalal', address: 'pune' }
];

const findUser = (id, callback) => {

    const user = arrWithObject.find((item) => {

        return item.id === id;
    });
    callback(undefined, user);
}


async.mapValues({ id: '1', afda: '2', adsfa: '3' }, (obj, key, callback) => {

    console.log(obj);
    console.log(key);
    setTimeout(() => {

        callback(undefined,obj);

    }, 100)

},
    (error, finalResult) => {
        console.log(finalResult)

    });
////////////////////////////////////////////////

const async = require('async');
const fs = require('fs');

const readFile1 = (filePath, callback) => {
    //fs.readFile(('data.txt', 'utf-8', cb, {});
    fs.readFile(filePath, 'utf-8',(error, data)=>{
        if(!error)
         return callback(undefined,data);
         else
         return callback(error,undefined);
    });
};

const test  = async.apply(readFile1,'./intro.js');
test((error,data)=>{
    console.log(data)
});
const fun1 = (para1, para2, callback) => {

    setTimeout(() => {
        callback(undefined, { para1, para2 });
    }, 100);

};
const fun2 = (para1, para2, callback) => {

    setTimeout(() => {
        callback(undefined, { para1, para2 });
    }, 100);

}

const fns = [];
fns.push(fun1);
fns.push(fun2);
async.applyEach(fns, '2', '3', (error, result) => {
    console.log(error);
    console.log(result);
});

// OR///

let fnsLst = [];
for (let i = 0; i < 10; i++) {

    fnsLst.push(fun2);

}

async.applyEachSeries(fnsLst, '2', '4',

    (error, finalResult) => {

        console.log(JSON.stringify(finalResult));
    })
    //////////////////////////////////////////////////////////////////////


    const async = require('async');

    async.auto({
    
        fn1: (callback) => {
            setTimeout(() => {
                console.log('function 1 executed!');
                callback(undefined, { data: 'function 1 object' })
            }, 2000)
        },
        fn2: ['fn1', (result, callback) => {
            setTimeout(() => {
                console.log('function 2 executed!');
                callback(undefined, { data: 'function 2 object ' });
            }, 0)
        }],
        fn3: (callback) => {
    
            console.log('function 3 executed!');
            callback(undefined, { data: 'function 3 object' });
        }
    },
        (error, finalResult) => {
            console.log(finalResult);
    
        });
    
    /////////////// or ////////////////////
    
    const fs = require('fs');
    
    const readFile1 = (filePath, callback) => {
        //fs.readFile(('data.txt', 'utf-8', cb, {});
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (!error)
                return callback(undefined, data);
            else
                return callback(error, undefined);
        });
    };
    
    async.auto({
    
        readData: async.apply(readFile1, './intro.js'),
        // readData: async.apply(fs.readFile, 'data.txt', 'utf-8'),
        showData: ['readData', (results, cb) => {
            cb(results)
        }]
    
    },
    
        (error, finalResult) => {
            console.log(finalResult);
        }
    )
    ///////////////////////////////////////////////  

    const async = require('async');

async.autoInject({

   getUser:(callback)=>{
       setTimeout(()=>{
           console.log('I am user');
           callback(undefined,{data:'getUser'})
       },1000)
   },
   getProfile:(getUser,callback)=>{
       setTimeout(()=>{
           console.log('i am profile')
           callback(undefined,{data:'getProfile'})
       },0)
   }

}, (error, finalResult) => {

    console.log(error);
    console.log(finalResult);
})

//////////////////////////////
const async  = require('async');

const  add1 = (n, callback)=> {
    setTimeout(function () {
        callback(null, n + 1);
    }, 10);
}

const  mul3  = (n, callback)=> {
    setTimeout(function () {
        callback(null, n * 3);
    }, 10);
}

var add1mul3 = async.compose(mul3, add1);
add1mul3(4, function (err, result) {
    // result now equals 15
    console.log(result);
});

//////////////////////////////////////
const async = require('async');
let count = 0;

async.during(


    (callback) => {
        count++;
        setTimeout(() => {
            callback(undefined, { data: 'data' })
        }, 1000);
    },
    (callback) => {
        callback(null, count < 5);
    },
    (err, result) => {
        // 5 seconds have passed
        console.log(err);
        console.log(result);
    }
);

/////////////////////////////////////////////////
const async = require('async');
let count  =0;

const fns= (callback)=>{
  
    console.log(`Function Called = ${count} \n`);
     setTimeout(()=>{
        count ++;
        if(count<10)
            return callback(undefined);
        else
        return callback('done');
        
     },100)
        

}
async.forever(
       fns   
    ,
    (err)=> {
       console.log(err);
    }
);
///////////////////////////////////////////
const async = require('async');

const fn1 = function (callback) {

    setTimeout(() => {

        callback(undefined, { data: 'one' });

    }, 1000)
}


const fn2 = function (callback) {

    setTimeout(() => {

        callback(undefined, { data: 'two' });

    }, 1000)
}

async.parallel([fn1, fn2], (error, finalResult) => {

    console.log(JSON.stringify(finalResult));
})


async.parallel([
   (callback) =>{

        setTimeout(() => {

            callback(undefined, { data:'one'});

        }, 1000)
    },

    (callback)=> {

        setTimeout(() => {

            callback(undefined, { data: 'two' });

        }, 1000)
    }

], (error, finalResult) => {

    console.log('parallel called ! ');
    console.log(finalResult);
})

const obj1   = {

      one:(callback)=>{
          setTimeout(()=>{
          //   console.log('one');  
            callback(undefined,{data:'one'});
              
          },100);
      },
      two:(callback)=>{
        setTimeout(()=>{
         //   console.log('two');
            callback(undefined,{data:'two'});
        },1000);
    },
     three:(callback)=>{
        setTimeout(()=>{
           // console.log('three');
            callback(undefined,{data:'three'});
        },200);
    }
}

async.parallel(obj1,(error,finalResult)=>{

    console.log(finalResult);
})

const obj2   = {

    one:(callback)=>{
        setTimeout(()=>{
           console.log('one');  
          callback(undefined,{data:'one'});
            
        },10000);
    },
    two:(callback)=>{
      setTimeout(()=>{
          console.log('two');
          callback(undefined,{data:'two'});
      },100);
  },
   three:(callback)=>{
      setTimeout(()=>{
          console.log('three');
          callback(undefined,{data:'three'});
      },10);
  }
}

async.parallelLimit(obj2,1,(error,finalResult)=>{

    console.log(finalResult);
})
// Note: In case of you put limit its call series only...
//////////////////////////////////////////////////

const async = require('async');

// create a queue object with concurrency 2
let q = async.queue((task, callback) => {

    setTimeout(() => {
        console.log('hello ' + task.name);
        callback();
    }, 100)

}, 2);

// assign a callback
q.drain = function () {
    console.log('all items have been processed');
};

// add some items to the queue
q.push({ name: 'foo' }, function (err) {
    console.log('finished processing foo');
});
q.push({ name: 'bar' }, function (err) {
    console.log('finished processing bar');
});


// let q1 = async.queue((task, callback) => {

//     setTimeout(() => {
//         console.log('hello ');
//         callback();
//     }, 100)

// }, 2);
// q1.push((data,callback)=>{

//     // Dosome function
//     setTimeout(()=>{

//         callback({data:'one task'})
//     },100)

// },



// (err)=>{

// console.log(err);
// })
//////////////////////////////////////////////////////////


const async = require('async');

async.race([
    (callback) => {
        setTimeout(() => {
            callback(null, 'one');
        }, 102);
    },
    (callback) => {
        setTimeout(() => {
            callback(null, 'two');
        }, 101);
    }
], // main callback
    (error, result) => {
        // the result will be equal to 'two' as it finishes earlier
        console.log(result);
        console.log(error);
    });
    /////////////////////////////////////////////////////////////

    const async = require('async');
    let count = 0;
    const dbConnect = (callback) => {
    
        setTimeout(() => {
            if (count >= 3) {
    
                console.log('find');
                callback(undefined, { data: 'find' });
            } else {
                // console.log('find');
                count++;
                callback('3');
            }
    
        }, 100)
    }
    
    async.retry(4, dbConnect, (error, finalResult) => {
    
        console.log(finalResult);
    })
    
    ////////////////////////////////
    const async = require('async');

const task1 = (callback) => {

    setTimeout(() => {
        console.log('task1');
        callback(undefined, { data: 'task1' })
    }, 1000)
}

const task2 = (callback) => {

    setTimeout(() => {
        console.log('task2');
        callback(undefined, { data: 'task2' })
    }, 10)
}
async.series([task1, task2], (error, firstResult) => {

    console.log('log');
    console.log(firstResult);
});

async.series({
    one: function(callback) {
        setTimeout(function() {
            callback(null, 1);
        }, 200);
    },
    two: function(callback){
        setTimeout(function() {
            callback(null, 2);
        }, 100);
    }
}, function(err, results) {
    // results is now equal to: {one: 1, two: 2}
    console.log(results);
});

///////////////////////////////////////////////////////
const async = require('async');
// Pretend this is some complicated async factory
var createUser = function (id, callback) {

    //  save in database
    callback(null, { id: 'user' + id });

};
async.times(5,(n,next)=>{

    // Call asyn function
    createUser(n,(error,user)=>{

         next(error,user)
    });
},
(error,finalResult)=>{

})


// // generate 5 users
// async.times(5, (n, next) => {

//     createUser(n, (error, user) => {
//         // this times iteration
//         next(error, user)
//     })

// }, function (err, users) {
//     // we should now have 5 users
//     console.log(users);
// });

////////////////////////////////////////
const async = require('async');

const task1 = (callback)=>{

    setTimeout(()=>{
        callback('task1',undefined); // become error
    },100)
}

const task2 = (callback)=>{

    setTimeout(()=>{
        callback(undefined,'done'); // become error
    },100)
}

const task3 = (callback)=>{

    setTimeout(()=>{
        callback('task3',undefined); // become error
    },100)
}

async.tryEach([task1,task2,task3],(error,finalResult)=>{

    console.log(finalResult);
    console.log(error);
});
///////////////////////////////////////

const async = require('async');
//until(test, iteratee, callbackopt)
let count = 0;
async.until(

    () => {
        return count > 5;
    },
    (callback) => {
        count++;
        setTimeout(()=>{
            callback(undefined,{data:'hello'})
        }, 1000);
    },
    (error, finalResult) => {

        console.log(error);
        console.log(finalResult);
    }   // 5 seconds have passed
)
///////////////////////////////////////////////////

const async = require('async');

async.waterfall(
    [
        (callback) => {
            console.log('1 callback ! \n');
            setTimeout(() => {
                callback(undefined, { data: '1 callback' })
            }, 100)

        },
        (data, callback) => {
            console.log('2 callback ! \n', data);
            setTimeout(() => {
                callback(undefined, { data: '1 callback' })
            }, 100)
        },
        (data, callback) => {
            console.log('3 callback ! \n', data);
            setTimeout(() => {
                callback(undefined, { data: '1 callback' })
            }, 100)
        },
        (data, callback) => {
            console.log('4 callback ! \n', data);
            setTimeout(() => {
                callback(undefined, { data: '1 callback' })
            }, 100)
        }
    ],

    (error, finalResult) => {

        console.log(error);
        console.log(finalResult);
    })

//
const task1 = (callback) => {

    console.log('1 callback ! \n');
    setTimeout(() => {
        callback(undefined, { data: '1 callback' })
    }, 100);

}
const task2 = (data,callback) => {

    console.log('2 callback ! \n');
    setTimeout(() => {
        callback(undefined, { data: '2 callback' })
    }, 100);

}
const task3 = (data,callback) => {

    console.log('3 callback ! \n');
    setTimeout(() => {
        callback(undefined, { data: '3 callback' })
    }, 100);

}
const task4 = (data,callback) => {

    console.log('4 callback ! \n');
    setTimeout(() => {
        callback(undefined, { data: '4 callback' })
    }, 100);

}
async.waterfall([task1,task2,task3, task4],(error,finalResult)=>{

    console.log('error',error);
    console.log(finalResult);
});
/////////////////////////////////////////////////


const async = require('async');
let count = 0;
const task = (callback) => {
    count++;
    setTimeout(() => {
        callback(null, count);
    }, 1000);
}

async.whilst(
    () => { return count < 5; },
    task,
    (error, finalResult) => {
        // 5 seconds have passed, n = 5
        console.log(error);
        console.log(finalResult);
    }
);//////////////





 ///
