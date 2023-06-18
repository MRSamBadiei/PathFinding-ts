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

/*
class Find {
  data: I_DataX[];
  node: I_NodeX[];
  visited: string[];

  constructor(data: I_DataX[], node: I_NodeX[]) {
    this.data = data;
    this.node = node;
    this.visited = [];
  }

  show() {
    this.node.forEach((n) => {
      const d_input = this.data.find((d) => d.id == n.input).id as string;
      const d_output = this.data.find((d) => d.id == n.output).id as string;
      console.log(`${d_input} is connected to ${d_output}`);
    });
  }

  move(from: string, to: string, last?: string): number {
    if (from === to) return 0;
    let result: number = 0;
    // 1- find object
    const start = this.data.find((d) => d.id === from);
    // 2- find nodes from
    const d =
      last !== undefined
        ? this.node
            .filter((n) => n.input === start.id && n.output !== last)
            .map((n) => n.output)
        : this.node.filter((n) => n.input === start.id).map((n) => n.output);

    // current data is directly connected
    if (d.findIndex((x) => x === to) !== -1) {
      result = this.data.find((d) => d.id === to).data;
      return result;
    }
    // current data is not directly connected
    const data_not_direct = this.data.filter((i) =>
      d.some((id) => id === i.id)
    );
    // cal min value
    const next_data = data_not_direct.sort((a, b) => a.data - b.data)[0];
    result += next_data.data;
    // cal next data
    result += this.move(next_data.id, to, from);
    return result;
  }

  worstPossibleIdea(from: string, to: string) {
    const start = this.node.filter((n) => n.input === from);
    // console.log(start);
    console.log(this.visited);
    start.forEach((s) => {
      if (!this.visited.some((v) => v === s.output)) {
        this.visited.push(s.input);
        this.worstPossibleIdea(s.output, to);
      }
    });

    if (from === to) return;
  }
}
*/

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
    //console.log(this.resultArr);

    let result = "";
    let value = 0;
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
    // find start position
    const start = this.data.find(({ id }) => id === start_pos);
    // find nodes that are connected to the start position
    const start_position_nodes = this.node.filter(
      ({ id, input, output }) =>
        input === start_pos &&
        !this.visited_nodes.includes(id) &&
        !this.visited_data.includes(output)
    );

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
];

const pf = new PathFinder({
  d: all_data,
  n: all_node,
  s: "data_3",
  e: "data_5",
});

pf.main();
