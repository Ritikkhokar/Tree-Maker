
var regFill = "green";
var regFillText = "black"
var xSpacing = 200
var ySpacing = 100
var radius = 35
var treeContainer;
var arrayContainer;

function Node(value, index, depth, cx, cy) {
    this.value = value;
    this.index = index;
    this.depth = depth;
    this.radius = radius;
    this.cx = cx;
    this.cy = cy;
    this.left = null;
    this.right = null;
    this.fill = regFill;
    this.highlighted = false;
}

function Tree() {
  this.nodes = [];
  this.data = [];
  this.text = [];

  this.addNode = function(node) {
  this.data.push(node);
//   debugger
  this.text = treeContainer.selectAll('text.circle')
  .data(this.data)
  .enter()
  .append('text')
  .attr('class','circle')
  .attr('x', d => d.cx - (d.value.toString().length*4))
  .attr('y', 0)
  .text(d => d.value)
  .transition()
  .duration(100)
  .attr('y', d => d.cy + 5)
  .call(textAttr, regFillText, "sans-serif", "1em")

  this.nodes = treeContainer.selectAll("circle")
                .data(this.data)
                .enter()
                .append("circle")
  }

  this.createBinaryTree = function(arr){
    treeContainer = createContainer("binary-tree", arr);
    start = treeContainer.attr('width')/2;
    let i=0;

    while(i < arr.length){
        let depth = Math.ceil(Math.log2(i + 2)) - 1;

        node = new Node(arr[i], i, depth);

        if (i === 0) {
            node.cx = start;
            node.cy = radius;
          }
          else {
            if (i == leftChild(parent(i))) {
              node.cx = this.data[parent(i)].cx - xSpacing/depth;
            }
            else {
              node.cx = this.data[parent(i)].cx + xSpacing/depth;
            }
            node.cy = this.data[parent(i)].cy + ySpacing;
            treeContainer.append("line").call(createLineAttr, "black", this.data[parent(i)].cx, this.data[parent(i)].cy, node.cx, node.cy);
          }
          this.addNode(node);
          ++i;
        }
        this.nodes = treeContainer
                  .selectAll("circle")
                  .raise()
                  .on("click", addHighlight)
        this.text = treeContainer
                .selectAll("text.circle")
                .raise()
                .on("click", addHighlight)
        this.nodes.call(circleAttr);
    }

  }

  function addHighlight(data, index) {
    removeHighlight();
    function indexMatch(d, i) {return i == index ? this : null};
  
    d3.selectAll("circle").select(indexMatch).attr("fill", highlightFill);
    d3.selectAll("rect").select(indexMatch).attr("fill", highlightFill);
    d3.selectAll("text.circle").select(indexMatch).attr("fill", highlightFillText);
    d3.selectAll("text.rect").select(indexMatch).attr("fill", highlightFillText);
  }
  
  function removeHighlight() {
    d3.selectAll("circle").attr("fill", regFill)
    d3.selectAll("rect").attr("fill", regFill)
    d3.selectAll("text.circle").attr("fill", regFillText)
    d3.selectAll("text.rect").attr("fill", regFillText);
  }

  function circleAttr(selection) {
    selection
      .attr("cx", function(c) { return c.cx })
      .attr("cy", 0)
      .attr("r", function(c) { return c.radius })
      .attr("fill", function(c) { return c.fill })
      .transition()
      .duration(100)
      .attr("cy", function(c) { return c.cy })
  }

function createLineAttr(selection, stroke, x1, y1, x2, y2){
    selection
    .attr('stroke',stroke)
    .attr('x1', x1)
    .attr('y1', 0)
    .attr('x2', x2)
    .attr('y2', 0)
    .transition()
    .duration(100)
    .attr('y1',y1)
    .attr('y2',y2)
}

function textAttr(selection, fill, fontFamily, fontSize) {
    selection
      .attr("fill", fill)
      .attr("font-family", fontFamily)
      .attr("font-size", fontSize);
  }

function calcDimensions(arr) {
    let depth = Math.ceil(Math.log2((arr.length - 1) + 2)) - 1;
    return { width: Math.pow(2, depth), height: ySpacing + ySpacing * depth, depth: depth }
  }

function createContainer(id, arr, width, height) {
    let box = calcDimensions(arr);
    let depth =Math.ceil(Math.log2((arr.length - 1) + 2)) - 1 || 1;

    let container = d3.select(`div#${id}`)
    .append('svg')
    .attr('width', width || box.width * 600 * (.8 / depth) * .75)
    .attr('height', height || box.height)

  return container;
}

function parent(index) {
    if (index === 0) {
        return -1;
    }
    return Math.floor((index - 1) / 2);
}

function leftChild(index) {
    return 2 * index + 1;
}

function rightChild(index) {
    return 2 * index + 2;
}
