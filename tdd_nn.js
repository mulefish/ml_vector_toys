import { sigmoid, sigmoidDerivative, NeuralNetwork, initializeWeights, feedForward } from './nn.js';

function verdict(a, b, msg) {
    if (JSON.stringify(a) === JSON.stringify(b)) {
        console.log("PASS " + msg)
    } else {
        console.log("FAIL " + msg)
    }
}
function sigmoidDerivative_test() {
    let k = 0
    let results = []
    for (let i = 0; i < 10; i++) {
        let x = sigmoidDerivative(k)
        results.push(x)
        k += 0.1
    }
    // index five will be 0.25 - that is the steepest it will get 
    const isOk = results[5] > results[6] && results[5] > results[4] && results[0] < 0.01
    verdict(isOk, true, "sigmoidDerivative_test " + results[5])
}
function sigmoid_test() {
    let isOk = true
    let k = -10
    for (let i = 0; i < 20; i++) {
        k += 1
        let x = sigmoid(k)
        if (x < 0 || x > 1) {
            isOk = false
        }
    }
    verdict(isOk, true, "sigmoid_test")
}

function neural_net_class_setup_test_1() {
    const n = new NeuralNetwork(3, 3, 3)
    let isOk = true
    isOk &&= n.inputNodes != undefined && n.hiddenNodes != undefined && n.outputNodes !== undefined
    const n2 = new NeuralNetwork(3, 3) // Missing param!
    isOk &&= n2.inputNodes != undefined && n2.hiddenNodes != undefined && n2.outputNodes === undefined

    isOk && n.weightsInputHidden.length > 0 && n.weightsInputHidden[0].length > 0
    isOk && n.weightsHiddenOutput.length > 0 && n.weightsHiddenOutput[0].length > 0





    verdict(isOk, true, "neural_net_class_setup_test_1")


}

function initializeWeights_test() {
    // get a List of Lists of number: Values ought be bounce around between -0.5 and +0.5
    let isOk = true
    const LoL = initializeWeights(3, 2)
    isOk &&= LoL.length === 3
    isOk &&= LoL[0].length === 2
    LoL.forEach((layer, i) => {
        layer.forEach((node, j) => {
            if (node < -0.5 || node > 0.5) {
                isOk = false
                console.log(i.j, node)
            }
        })
    })
    verdict(isOk, true, "initializeWeights_test")

}
function feedForward_test() {
    // numbers here do not matter: just keep everything inbetween 0 and 1 
    const input = [0.5, 0.3, 0.2];
    const weightsInputHidden = [0.1, 0.2, 0.3];
    const weightsHiddenOutput = [0.4, 0.5, 0.6];
    const biasHidden = [0.1, 0.2, 0.3];
    const biasOutput = [0.4, 0.5];
    const x = feedForward(input, weightsInputHidden, weightsHiddenOutput, biasHidden, biasOutput);
    const isOk = x >= 0 && x <= 1
    verdict(isOk, true, "feedForward_test")
}
function main() {
    sigmoid_test()
    sigmoidDerivative_test()
    neural_net_class_setup_test_1()
    initializeWeights_test()
    feedForward_test()
}
main()

