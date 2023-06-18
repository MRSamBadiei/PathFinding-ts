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
var PathFinder = /** @class */ (function () {
    function PathFinder(pf) {
        this.visited_nodes = [];
        this.visited_data = [];
        this.result = [];
        this.valueResult = 0;
        this.resultArr = [];
        this.data = pf.d;
        this.node = pf.n;
        this.start_position = pf.s;
        this.end_position = pf.e;
    }
    PathFinder.prototype.main = function () {
        var _this = this;
        this.spreadToAllNodes();
        //console.log(this.resultArr);
        var result = "";
        var value = 0;
        this.resultArr.forEach(function (ra, i) {
            var res = "Path ".concat(i + 1, ": ");
            ra.forEach(function (r, i) {
                var _a, _b;
                var output = (_a = _this.node.find(function (_a) {
                    var id = _a.id;
                    return id === r;
                })) === null || _a === void 0 ? void 0 : _a.output;
                var v = (_b = _this.data.find(function (_a) {
                    var id = _a.id;
                    return id === output;
                })) === null || _b === void 0 ? void 0 : _b.data;
                value += v;
                res += i !== ra.length - 1 ? "".concat(r, " -> ") : "".concat(r, " - (").concat(value, ")");
            });
            result += res + "\n";
            value = 0;
        });
        console.log(result);
    };
    PathFinder.prototype.spreadToAllNodes = function (start_pos) {
        var _this = this;
        if (start_pos === void 0) { start_pos = this.start_position; }
        // find start position
        var start = this.data.find(function (_a) {
            var id = _a.id;
            return id === start_pos;
        });
        // find nodes that are connected to the start position
        var start_position_nodes = this.node.filter(function (_a) {
            var id = _a.id, input = _a.input, output = _a.output;
            return input === start_pos &&
                !_this.visited_nodes.includes(id) &&
                !_this.visited_data.includes(output);
        });
        // check if we found node direct to the end position
        var find_node_direct = start_position_nodes.find(function (_a) {
            var output = _a.output;
            return output === _this.end_position;
        });
        if (find_node_direct !== undefined) {
            this.result.push(find_node_direct.id);
            this.resultArr.push(this.result);
            this.result = [];
            this.visited_data = [];
            this.visited_nodes = [];
        }
        else {
            start_position_nodes.forEach(function (s) {
                _this.visited_nodes.push(s.id);
                _this.visited_data.push(s.input);
                _this.result.push(s.id);
                _this.spreadToAllNodes(s.output);
            });
        }
    };
    return PathFinder;
}());
var all_data = [
    { id: "data_1", data: 10 },
    { id: "data_2", data: 20 },
    { id: "data_3", data: 30 },
    { id: "data_4", data: 2 },
    { id: "data_5", data: 40 },
];
var all_node = [
    { id: "node_1", input: "data_1", output: "data_2" },
    { id: "node_2", input: "data_2", output: "data_1" },
    { id: "node_3", input: "data_2", output: "data_3" },
    { id: "node_4", input: "data_3", output: "data_4" },
    { id: "node_5", input: "data_1", output: "data_3" },
    { id: "node_6", input: "data_4", output: "data_5" },
];
var pf = new PathFinder({
    d: all_data,
    n: all_node,
    s: "data_3",
    e: "data_5"
});
pf.main();
