import nodeConst from "../src/components/node/node.const";
import * as schemas from "./schemas";

export default class CodeGen {
    constructor() {}

    transcodeGen(astTrans) {
        const dict = this.getDict("TRANSCODER");
        var cmd = "";
        const spc = " ";
        const hyp = "-";

        cmd = cmd + spc + hyp + dict["url"] + spc + astTrans["url"];
        cmd = cmd + spc + hyp + dict["codec"] + spc + astTrans["codec"];
        if (astTrans.height != null && astTrans.width != null) {
            cmd = cmd + spc + hyp + dict["scale"] + spc + astTrans.width + "x" + astTrans.height;
        }
        for (var prop in astTrans) {
            if (prop != "height" && prop != "width" && prop != "codec" && prop != "url") {
                cmd = cmd + spc + hyp + dict[prop] + spc + astTrans[prop];
            }
        }
        return cmd;
    }

    ingestGen(comp, src, sinks) {
        const dict = this.getDict("INGEST");
        var cmd = "";
        const spc = " ";
        const hyp = "-";

        if (src) {
            cmd = cmd + this.inputGen(src.formData, src.name);
        }
        if (sinks) {
            for (var i in sinks) {
                var sink = sinks[i];
                cmd = cmd + "-c:a copy -c:v copy";
                cmd = cmd + this.outputGen(sink.formData, sink.name);
            }
        }
        return cmd;
    }

    inputGen(data, name) {
        var cmd = "";
        const spc = " ";
        const hyp = "-";
        var dict = this.getDict(name);

        if (dict != null) {
            cmd = cmd + spc + hyp + dict["url"] + spc + data["url"];
            for (var prop in data) {
                if (prop != "url") {
                    cmd = cmd + spc + hyp + dict[prop] + spc + data[prop];
                }
            }
        }
        return cmd;
    }

    outputGen(data, name) {
        var cmd = "";
        const spc = " ";
        const hyp = "-";

        var dict = this.getDict(name);
        if (dict != null) {
            for (var prop in data) {
                if (prop != "url") {
                    cmd = cmd + spc + hyp + dict[prop] + spc + data[prop];
                }
            }
            cmd = cmd + spc + data["url"];
        }
        return cmd;
    }

    getDict(name) {
        var schemeidx = schemas.compSchemas.findIndex(x => x.id === name);
        var dict = null;
        if (schemeidx > 0) {
            dict = schemas.compSchemas[schemeidx].dict;
        }
        return dict;
    }

    exec(data) {
        var nodes = data.nodes;
        if (nodes) {
            var idx = nodes.findIndex(x => x.name === "TRANSCODER");
            return this.transcodeGen(nodes[idx].formData);
        }
    }
}
