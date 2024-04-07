
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
export class NeuralNetwork {
    constructor(inputNodes, hiddenNodes, outputNodes) {
        this.inputNodes = inputNodes
        this.hiddenNodes = hiddenNodes
        this.outputNodes = outputNodes

        this.weightsInputHidden = initializeWeights(this.inputNodes, this.hiddenNodes);
        this.weightsHiddenOutput = initializeWeights(this.hiddenNodes, this.outputNodes);
    }

}