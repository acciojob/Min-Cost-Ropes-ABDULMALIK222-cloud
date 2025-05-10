function mincost(arr) {
    if (arr.length <= 1) return 0;

    // Min-Heap helper functions
    class MinHeap {
        constructor() {
            this.heap = [];
        }

        insert(val) {
            this.heap.push(val);
            this._heapifyUp();
        }

        extractMin() {
            if (this.heap.length === 1) return this.heap.pop();
            const min = this.heap[0];
            this.heap[0] = this.heap.pop();
            this._heapifyDown();
            return min;
        }

        size() {
            return this.heap.length;
        }

        _heapifyUp() {
            let i = this.heap.length - 1;
            while (i > 0) {
                let parent = Math.floor((i - 1) / 2);
                if (this.heap[i] < this.heap[parent]) {
                    [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
                    i = parent;
                } else {
                    break;
                }
            }
        }

        _heapifyDown() {
            let i = 0;
            const length = this.heap.length;

            while (true) {
                let left = 2 * i + 1;
                let right = 2 * i + 2;
                let smallest = i;

                if (left < length && this.heap[left] < this.heap[smallest]) smallest = left;
                if (right < length && this.heap[right] < this.heap[smallest]) smallest = right;

                if (smallest !== i) {
                    [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
                    i = smallest;
                } else {
                    break;
                }
            }
        }
    }

    const minHeap = new MinHeap();
    for (const num of arr) {
        minHeap.insert(num);
    }

    let totalCost = 0;

    while (minHeap.size() > 1) {
        const first = minHeap.extractMin();
        const second = minHeap.extractMin();
        const cost = first + second;
        totalCost += cost;
        minHeap.insert(cost);
    }

    return totalCost;
}

module.exports = mincost;
