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
    },
};

export const TranscoderFormDataDef = {
    bitrate: "20000000",
    width: "1920",
    height: "1080",
    codec: "h264",
    framerate: "30.0",
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
    },
};

export const RtmpOutFormDataDef = {
    url: "rtmp://127.0.0.1:1935/live/test1",
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

export const DistStoreFormDataDef = {
    url: "ipfs://127.0.0.1/QmPXMA1oRtoT627YKaDPDQ4PwA8tdP9rWuAAweLzqSwAWT/test",
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

export const SettingsFormDataDef = {
    input_opt: "re",
    framerate: "30",
};

export const compSchemas = [
    { id: "SETTINGS", schema: SettingsSchema, formData: SettingsFormDataDef },
    { id: "RTMP-IN", schema: RtmpInSchema, formData: RtmpInFormDataDef },
    { id: "RTSP-IN", schema: RtspInSchema, formData: RtspInFormDataDef },
    { id: "HLS-IN", schema: HlsInSchema, formData: HlsInFormDataDef },
    { id: "FILE-IN", schema: FileInSchema, formData: FileInFormDataDef },
    { id: "RTSP-OUT", schema: RtspOutSchema, formData: RtspOutFormDataDef },
    { id: "RTMP-OUT", schema: RtmpOutSchema, formData: RtmpOutFormDataDef },
    { id: "FILE-OUT", schema: FileOutSchema, formData: FileOutFormDataDef },
    { id: "HLS-OUT", schema: HlsOutSchema, formData: HlsOutFormDataDef },
    { id: "HTTP-OUT", schema: HttpOutSchema, formData: RtmpInFormDataDef },
    { id: "TRANSCODER", schema: TranscoderSchema, formData: TranscoderFormDataDef },
    { id: "DISTSTORE", schema: DistStoreSchema, formData: DistStoreFormDataDef },
];
