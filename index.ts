// type
interface I_NodeX {
  id: string;
  input: string;
  output: string;
}

interface I_DataX {
  id: string;
  data: any;
}

class PathFinder {
  data: I_DataX[];
  node: I_NodeX[];
  start_position: string;
  end_position: string;
  visited_nodes: string[] = [];
  visited_data: string[] = [];
  result: string[] = [];
  valueResult = 0;
  resultArr: string[][] = [];
  constructor(pf: { d: I_DataX[]; n: I_NodeX[]; s: string; e: string }) {
    this.data = pf.d;
    this.node = pf.n;
    this.start_position = pf.s;
    this.end_position = pf.e;
  }

  main() {
    this.spreadToAllNodes();
    let result = "";
    let value = 0;

    if (this.resultArr.length === 0) {
      console.log("It seems that no suitable path could be found.");
      return;
    }

    this.resultArr.forEach((ra, i) => {
      let res = `Path ${i + 1}: `;
      ra.forEach((r, i) => {
        const output = this.node.find(({ id }) => id === r)?.output;
        const v = this.data.find(({ id }) => id === output)?.data;
        value += v;
        res += i !== ra.length - 1 ? `${r} -> ` : `${r} - (${value})`;
      });
      result += res + "\n";
      value = 0;
    });

    console.log(result);
  }

  spreadToAllNodes(start_pos: string = this.start_position) {
    // find nodes that are connected to the start position
    const start_position_nodes = this.node.filter(
      ({ id, input, output }) =>
        input === start_pos &&
        !this.visited_nodes.includes(id) &&
        !this.visited_data.includes(output)
    );
    // reached a dead end node
    if (start_position_nodes.length === 0) {
      this.result = [];
      return;
    }

    // check if we found node direct to the end position
    const find_node_direct = start_position_nodes.find(
      ({ output }) => output === this.end_position
    );

    if (find_node_direct !== undefined) {
      this.result.push(find_node_direct.id);
      this.resultArr.push(this.result);
      this.result = [];
      this.visited_data = [];
      this.visited_nodes = [];
    } else {
      start_position_nodes.forEach((s) => {
        this.visited_nodes.push(s.id);
        this.visited_data.push(s.input);
        console.log(s);

        this.result.push(s.id);
        this.spreadToAllNodes(s.output);
      });
    }
  }
}

const all_data: I_DataX[] = [
  { id: "data_1", data: 10 },
  { id: "data_2", data: 20 },
  { id: "data_3", data: 30 },
  { id: "data_4", data: 2 },
  { id: "data_5", data: 40 },
];

const all_node: I_NodeX[] = [
  { id: "node_1", input: "data_1", output: "data_2" },
  { id: "node_2", input: "data_2", output: "data_1" },
  { id: "node_3", input: "data_2", output: "data_3" },
  { id: "node_4", input: "data_3", output: "data_4" },
  { id: "node_5", input: "data_1", output: "data_3" },
  { id: "node_6", input: "data_4", output: "data_5" },
  { id: "node_7", input: "data_4", output: "data_2" },
];

const pf = new PathFinder({
  d: all_data,
  n: all_node,
  s: "data_4",
  e: "data_1",
});

pf.main();
