import nodeConst from "../src/components/node/node.const";
import * as schemas from "./schemas";

export default class CodeGen {
    constructor() {}

    transcodeGen(astTrans) {
        const dict = schemas.TranscodeDict;
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

    inputGen(data, name) {
        var cmd = "";
        const spc = " ";
        const hyp = "-";
        var dict = null;
        switch (name) {
            case "RTMP-IN":
                dict = schemas.RtmpInDict;
                break;
        }
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

        var dict = null;
        switch (name) {
            case "RTMP-OUT":
                dict = schemas.RtmpOutDict;
                break;
            case "RTSP-OUT":
                dict = schemas.RtspOutDict;
                break;
            case "HLS-OUT":
                dict = schemas.HlsOutDict;
                break;
            case "HTTP-OUT":
                dict = schemas.HttpOutDict;
                break;
        }
        if (dict != null) {
            cmd = cmd + spc + data["url"];
            for (var prop in data) {
                if (prop != "url") {
                    cmd = cmd + spc + hyp + dict[prop] + spc + data[prop];
                }
            }
        }
        return cmd;
    }

    exec(data) {
        var nodes = data.nodes;
        if (nodes) {
            var idx = nodes.findIndex(x => x.name === "TRANSCODER");
            return this.transcodeGen(nodes[idx].formData);
        }
    }
}
