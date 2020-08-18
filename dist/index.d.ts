import { Tensor } from "./tensor";
import { Options } from "./options";
/**
 * A Tensorflow or ONNX model.
 *
 * Does not store the model directly.
 * The model is stored in a WebWorker which this class internally accesses via an ID.
 */
declare class Model {
    private modelId;
    /**
     * Loads a model.
     * @param url - The URL to load the model from. Will be passed to `fetch`.
     * @param options - Additional options. See {@link Options} for details.
     */
    constructor(url: string, options?: Options);
    /**
     * Check if the model has been loaded.
     * @returns A promise which resolves once the model is successfully initialized.
     * It rejects if there was an error during initialization.
     */
    loaded(): Promise<void>;
    /**
     * Runs the model on the given input.
     * The first call might be slower because it has to wait for model initialization to finish.
     * @param inputs - List of input tensors.
     *
     * @returns Promise for a list of output tensors.
     */
    predict(inputs: Tensor[]): Promise<Tensor[]>;
    /**
     * Runs the model on a single input tensor.
     * The first call might be slower because it has to wait for model initialization to finish.
     * This method is provided as convenience method for interfacing with Rust WASM, since arrays of custom objects are not supported yet.
     * @param input - a single input tensor.
     *
     * @returns The first output tensor.
     */
    predict_one(input: Tensor): Promise<Tensor>;
    /**
     * Removes all references to the internal model allowing it to be garbage collected.
     */
    destroy(): Promise<void>;
}
export { Model, Tensor };