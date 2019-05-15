import nodeConst from "../src/components/node/node.const";

export default class CodeGen {
    constructor() {}

    transcodeGen(astTrans) {
        var cmd = "";
        if (astTrans.height != null && astTrans.width != null) {
            cmd = cmd + "-s " + astTrans.width + "x" + astTrans.height;
            return cmd;
        }
    }

    exec(data) {
        var nodes = data.nodes;
        if (nodes) {
            var idx = nodes.findIndex(x => x.name === "TRANSCODER");
            return this.transcodeGen(nodes[idx].formData);
        }
    }
}
