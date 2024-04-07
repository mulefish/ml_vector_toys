
// Activation function 
export function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}
// Derivative of thee sigmoid function
export function sigmoidDerivative(x) {
    return x * (1 - x)
}


export function initializeWeights(inputNodes, hiddenNodes) {
    return Array.from({ length: inputNodes }, () =>
        Array.from({ length: hiddenNodes }, () => Math.random() - 0.5)
    );
}
export function feedForward(input, weightsInputHidden, weightsHiddenOutput, biasHidden, biasOutput) {
    // Calculate hidden layer's output
    const hiddenInputs = input.map((val, i) => val * weightsInputHidden[i]);
    const hiddenSum = hiddenInputs.reduce((sum, val) => sum + val, 0); // Sum of hidden inputs
    const hiddenOutput = sigmoid(hiddenSum + biasHidden.reduce((sum, val) => sum + val, 0)); // Sum of biasHidden

    // Calculate output layer's output
    const outputInputs = weightsHiddenOutput.map((val) => hiddenOutput * val);
    const outputSum = outputInputs.reduce((sum, val) => sum + val, 0); // Sum of output inputs
    const finalOutput = sigmoid(outputSum + biasOutput.reduce((sum, val) => sum + val, 0)); // Sum of biasOutput

    return finalOutput;
}

export function backPropagation(input, target, weightsInputHidden, weightsHiddenOutput, biasHidden, biasOutput) {
    // Feedforward to get outputs
    const hiddenInputs = input.map((val, i) => val * weightsInputHidden[i]);
    const hiddenOutputs = hiddenInputs.map((val, i) => sigmoid(val + biasHidden[i]));
  //  console.log( "hiddenInputs=" + hiddenInputs + "  hiddenOutputs=" + hiddenOutputs )
    const outputInputs = hiddenOutputs.map((val, i) => val * weightsHiddenOutput[i]);
//    const finalOutputs = outputInputs.map((val, i) => sigmoid(val + biasOutput[i]));
const finalOutputs = outputInputs.map((val, i) => {
    const input = val + biasOutput[i];
    const result = sigmoid(input)
//    console.log( "val=" + val + " biasOutput=" + biasOutput[i] + " result=" + result )
    return result 
});
//     console.log("biasOutput ")
//     console.log( biasOutput )
//     console.log( "outputInputs")
//    console.log( outputInputs)
//    console.log( "finalOutputs")
//    console.log( finalOutputs)
    
    // Calculate output layer errors
    // const outputErrors = finalOutputs.map((output, i) => target[i] - output);
    const outputErrors = finalOutputs.map((output, i) => {
        if (!isNaN(target[i]) && !isNaN(output)) {
            return target[i] - output;
        } else {
            return 0; // Handle NaN values gracefully
        }
    })
    //console.log( "outputErrors=" + outputErrors)

    // Calculate output layer gradients
//    console.log("finalOutputs=" + finalOutputs)
    const outputGradients = finalOutputs.map((output, i) => outputErrors[i] * sigmoidDerivative(output));
// console.log("outputGradients=" + outputGradients)
    // Adjust output layer weights and biases
    const newWeightsHiddenOutput = weightsHiddenOutput.map((weight, i) =>
        weight + outputGradients[i] * hiddenOutputs[i]
    );

    const newBiasOutput = biasOutput.map((bias, i) =>
        bias + outputGradients[i]
    );

    return { newWeightsHiddenOutput, newBiasOutput };
}


export class NeuralNetwork {
    constructor(inputNodes, hiddenNodes, outputNodes) {
        this.inputNodes = inputNodes
        this.hiddenNodes = hiddenNodes
        this.outputNodes = outputNodes

        this.weightsInputHidden = initializeWeights(this.inputNodes, this.hiddenNodes);
        this.weightsHiddenOutput = initializeWeights(this.hiddenNodes, this.outputNodes);
    }

}