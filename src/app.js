'use strict'
var contract = require('truffle-contract');
/*if (typeof window.Web3 !== 'undefined') {
  // This user has MetaMask, or another Web3 browser installed!
    console.log("MetaMask")
    web3Provider = window.Web3.currentProvider  
}
else
{
    web3Provider = new Web3.providers.HttpProvider('http://localhost:9545');
}*/
const Worker = require('./worker');
var handleCreateProblemClicked = require('./newProblem');
var handleLoadProblemClicked = require('./loadProblem');

var arithmeticaArtifact = require('../build/contracts/Arithmetica.json');
var arithmeticaContract = contract(arithmeticaArtifact);
arithmeticaContract.setProvider(web3.currentProvider);

var evaluationEditor;
var assertionEditor;
var setupEditor = require('./setupEditor');

document.addEventListener("DOMContentLoaded", function() {
    evaluationEditor = setupEditor("evaluation-input");
    assertionEditor = setupEditor("assertion-input");
    document.getElementById("submit-problem").addEventListener("click", () => {
        handleCreateProblemClicked(arithmeticaContract, evaluationEditor, assertionEditor)}
    );
    document.getElementById("load-problem").addEventListener("click", () => {
        handleLoadProblemClicked(arithmeticaContract, evaluationEditor, assertionEditor)}
    );
    getProblems().then((v) => console.log(v));
}, false);

function getProblems() {
    var instance;
    return Promise.resolve(
        arithmeticaContract.deployed().then(
            (_instance) => {instance = _instance; return _instance.getProblemCount();}
        ).then(
            (count) => {
                var problems = [];
                for(var i = 0; i < count; ++i) {
                    instance.getProblemName(i).then((result)=>{problems.push(result);});
                }
                return problems;
            }
        )
    );
}

