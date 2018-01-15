

const newman = require('newman');
const async = require('async');
const fs = require('fs');
const collectionsPath = './ApiTestCollections/';
const request = require('request');
const reportUrl  = `http://localhost:8080/api/v1/apireport`;


const readCollectionsJson = (collectionsPath) => {

    let fileCollectionInstance = [];

    return new Promise((resolve, reject) => {

        fs.readdir(collectionsPath, (error, files) => {
            if (!error) {
                files.forEach(file => {
                    file = `${collectionsPath}${file}`;
                    let collectionInst = {
                        file: require(file),
                        fileName: file
                    }
                    fileCollectionInstance.push(collectionInst);
                });
                resolve(fileCollectionInstance);
            } else {
                reject(error);
            }
        })
    });

}

const executeNewman = (option, callback) => {

    newman.run({
        collection: option.collectionName,
        reporters: ['cli', 'teamcity']
    }).on('start', () => {

        console.log('running a collection...');

    }).on('done', (err, summary) => {

        callback(undefined, summary);

    });
}

let finalTestResults = [];

const testResults = (result) => {

    let finalTestResult = {
        stats: result.run.stats,
        executions: result.run.executions,
        failures: result.run.failures,
        error: result.runerror

    };

    finalTestResults.push(finalTestResult);
}

const runApiTest = () => {

    return new Promise((resolve, reject) => {

        readCollectionsJson(collectionsPath).then((suitCollJson) => {
            return suitCollJson;
        }).then((data) => {

            async.eachLimit(data, 1,

                (item, callback) => {

                    let option = {
                        collectionName: item.file
                    }
                    executeNewman(option, (error, result) => {
                        if (!error) {

                            testResults(result);
                            callback(undefined, result);
                        } else {
                            callback(error, undefined);
                        }
                    });
                }
                ,
                (error, finalResult) => {
                    if (!error) {
                        resolve(finalResult);
                    } else {
                        reject(error);
                    }
                });

        }).catch((error) => {
            reject(error);
        });
    });
}


const insertDataIntoReportApi = (finalTestResults) => {

    return new Promise((resolve, reject) => {

        async.eachLimit(finalTestResults, 1,

            (item, callback) => {

                let body = {
                    stats: 'true',
                    executions: 'true',
                    failures: 'false',

                }
                request.post({ url: reportUrl, form: body }, (error, httpResponse, body) => {
                    if (!error)
                        callback(undefined, body);
                    else
                        callback(error);
                });
            }
            , (error, result) => {
                if (!error)
                    resolve(result);
                else
                    reject(error);
            });
    });

}

runApiTest().then((data) => {

    return insertDataIntoReportApi(finalTestResults).then((result) => {

        return result;

    }).then((data) => {
        console.log('Report generated!');
    }).catch((error) => {

        console.log(JSON.stringify(error));
    });


}).catch((error) => {

    console.log(JSON.stringify(error));
});
