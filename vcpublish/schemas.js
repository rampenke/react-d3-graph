export const TranscoderSchema = {
    title: "Transcoder",
    type: "object",
    required: ["bitrate", "width", "height", "codec", "framerate"],
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
        codec: {
            type: "string",
            title: "framerate",
            default: "30.0",
        },
    },
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

export const RtmpOutSchema = {
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
        frame_rate: {
            type: "integer",
            title: "frame_rate",
            default: "30",
        },
    },
};
