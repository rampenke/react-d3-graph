export const TranscoderSchema = {
    title: "Transcoder",
    type: "object",
    required: ["bitrate", "width", "height", "codec"],
    properties: {
        bitrate: {
            type: "string",
            title: "bitrate",
            default: "20000000",
        },
        width: {
            type: "string",
            title: "width",
            default: "1920",
        },
        height: {
            type: "string",
            title: "height",
            default: "1080",
        },
        codec: {
            type: "string",
            title: "codec",
            default: "h264",
        },
        framerate: {
            type: "string",
            title: "framerate",
            default: "30.0",
        },
        framerate: {
            type: "string",
            title: "url",
            default: "rtmp://127.0.0.1:1935/live/test1",
        },
    },
};

export const TranscodeDict = {
    bitrate: "b",
    scale: "s",
    codec: "c:v",
    framerate: "r",
    url: "i",
};

export const TranscoderFormDataDef = {
    bitrate: "20000000",
    width: "1920",
    height: "1080",
    codec: "h264",
    framerate: "30.0",
    url: "rtmp://127.0.0.1:1935/live/test1",
};

export const RtmpInSchema = {
    title: "RTMP Input",
    type: "object",
    required: ["url"],
    properties: {
        url: {
            type: "string",
            title: "url",
            default: "rtmp://127.0.0.1:1935/live/test1",
        },
    },
};

export const RtmpInDict = {
    url: "i",
};

export const RtmpInFormDataDef = {
    url: "rtmp://127.0.0.1:1935/live/test1",
};

export const RtspInSchema = {
    title: "RTSP Input",
    type: "object",
    required: ["url"],
    properties: {
        url: {
            type: "string",
            title: "url",
            default: "rtsp://127.0.0.1:554/live/test1",
        },
    },
};

export const RtspInDict = {
    url: "i",
};

export const RtspInFormDataDef = {
    url: "rtsp://127.0.0.1:554/live/test1",
};

export const HlsInSchema = {
    title: "HLS Input",
    type: "object",
    required: ["url"],
    properties: {
        url: {
            type: "string",
            title: "url",
            default: "http://127.0.0.1:8080/live/test1.m3u8",
        },
    },
};

export const HlsInDict = {
    url: "i",
};

export const HlsInFormDataDef = {
    url: "http://127.0.0.1:8080/live/test1.m3u8",
};

export const FileInSchema = {
    title: "File Input",
    type: "object",
    required: ["url"],
    properties: {
        url: {
            type: "string",
            title: "url",
            default: "/mnt/media/TestStream.Mp4",
        },
    },
};

export const FileInDict = {
    url: "i",
};

export const FileInFormDataDef = {
    url: "/mnt/media/TestStream.Mp4",
};

export const RtmpOutSchema = {
    title: "RTMP Output",
    type: "object",
    required: ["url"],
    properties: {
        url: {
            type: "string",
            title: "url",
            default: "rtmp://127.0.0.1:1935/live/test1",
        },
        format: {
            type: "string",
            title: "format",
            default: "flv",
        },
    },
};

export const RtmpOutDict = {
    url: "",
    format: "f",
};

export const RtmpOutFormDataDef = {
    url: "rtmp://127.0.0.1:1935/live/test1",
    format: "flv",
};

export const RtspOutSchema = {
    title: "RTSP Output",
    type: "object",
    required: ["url"],
    properties: {
        url: {
            type: "string",
            title: "url",
            default: "rtsp://127.0.0.1:554/live/test1",
        },
    },
};

export const RtspOutDict = {
    url: "",
};

export const RtspOutFormDataDef = {
    url: "rtsp://127.0.0.1:554/live/test1",
};

export const HlsOutSchema = {
    title: "HLS Output",
    type: "object",
    required: ["url"],
    properties: {
        url: {
            type: "string",
            title: "url",
            default: "http://127.0.0.1/live",
        },
    },
};

export const HlsOutDict = {
    url: "",
};

export const HlsOutFormDataDef = {
    url: "http://127.0.0.1/live",
};

export const HttpOutSchema = {
    title: "HTTP Output",
    description: "HTTP Output Properties.",
    type: "object",
    required: ["url"],
    properties: {
        url: {
            type: "string",
            title: "url",
            default: "http://127.0.0.1/live",
        },
    },
};

export const HttpOutDict = {
    url: "",
};

export const HttpOutFormDataDef = {
    url: "http://127.0.0.1/live",
};

export const FileOutSchema = {
    title: "File Output",
    type: "object",
    required: ["url"],
    properties: {
        url: {
            type: "string",
            title: "url",
            default: "/mnt/media/TestStream.Mp4",
        },
    },
};

export const FileOutDict = {
    url: "",
};

export const FileOutFormDataDef = {
    url: "/mnt/media/TestStream.Mp4",
};

export const DistStoreSchema = {
    title: "Dist Store",
    type: "object",
    required: ["url"],
    properties: {
        url: {
            type: "string",
            title: "url",
            default: "ipfs://127.0.0.1/QmPXMA1oRtoT627YKaDPDQ4PwA8tdP9rWuAAweLzqSwAWT/test",
        },
    },
};

export const DistStoreDict = {
    url: "",
};

export const DistStoreFormDataDef = {
    url: "ipfs://127.0.0.1/QmPXMA1oRtoT627YKaDPDQ4PwA8tdP9rWuAAweLzqSwAWT/test",
};

export const IngestSchema = {
    title: "Ingest",
    type: "object",
    required: ["name"],
    properties: {
        url: {
            type: "string",
            title: "name",
            default: "Ingest",
        },
    },
};

export const IngestDict = {
    name: "",
};

export const IngestFormDataDef = {
    name: "Ingest",
};

export const SettingsSchema = {
    title: "FFMPEG Settings",
    type: "object",
    required: [],
    properties: {
        input_opt: {
            type: "string",
            title: "input_opt",
            default: "re",
        },
        framerate: {
            type: "integer",
            title: "frame_rate",
            default: "30",
        },
    },
};

export const SettingsDict = {
    framerate: "framerate",
};

export const SettingsFormDataDef = {
    input_opt: "re",
    framerate: "30",
};

export const compSchemas = [
    { id: "SETTINGS", schema: SettingsSchema, formData: SettingsFormDataDef, dict: SettingsDict },
    { id: "RTMP-IN", schema: RtmpInSchema, formData: RtmpInFormDataDef, dict: RtmpInDict },
    { id: "RTSP-IN", schema: RtspInSchema, formData: RtspInFormDataDef, dict: RtspInDict },
    { id: "HLS-IN", schema: HlsInSchema, formData: HlsInFormDataDef, dict: HlsInDict },
    { id: "FILE-IN", schema: FileInSchema, formData: FileInFormDataDef, dict: FileInDict },
    { id: "RTSP-OUT", schema: RtspOutSchema, formData: RtspOutFormDataDef, dict: RtspOutDict },
    { id: "RTMP-OUT", schema: RtmpOutSchema, formData: RtmpOutFormDataDef, dict: RtmpOutDict },
    { id: "FILE-OUT", schema: FileOutSchema, formData: FileOutFormDataDef, dict: FileOutDict },
    { id: "HLS-OUT", schema: HlsOutSchema, formData: HlsOutFormDataDef, dict: HlsOutDict },
    { id: "HTTP-OUT", schema: HttpOutSchema, formData: RtmpInFormDataDef, dict: HttpOutDict },
    { id: "TRANSCODER", schema: TranscoderSchema, formData: TranscoderFormDataDef, dict: TranscodeDict },
    { id: "DISTSTORE", schema: DistStoreSchema, formData: DistStoreFormDataDef, dict: DistStoreDict },
    { id: "INGEST", schema: IngestSchema, formData: IngestFormDataDef, dict: IngestDict },
];
