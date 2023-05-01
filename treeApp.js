function reset() {
    d3.selectAll('svg').remove();
}

function treeAndArray(){
    reset();
    let inputText = document.getElementById("array-input")
    document.querySelector('#visual-title').innerHTML = "Binary Tree And Array";
    document.querySelector('#instructions').innerHTML = "Click a value in the binary tree or array to highlight its corresponding location in the data structure.";
    if (inputText.value !== '') {
        input = inputText.value.trim().split(/\s+|\,+/g).map((num) => parseInt(num));
        createBinaryTreeAndArr(input);
    }
}

function createBinaryTreeAndArr(arr){
   arrayContainer = createContainer("array-visual", arr, arr.length*60, 100);
   let tree = new Tree();
   tree.createBinaryTree(input)
}

