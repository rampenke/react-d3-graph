module.exports = {
    links: [
        {
            source: "RTMP-1",
            target: "Ingest",
        },
        {
            source: "Ingest",
            target: "Transcoder-1",
        },
        {
            source: "Ingest",
            target: "Transcoder-2",
        },
        {
            source: "Ingest",
            target: "Transcoder-3",
        },
        {
            source: "Transcoder-1",
            target: "HLS-1",
        },
        {
            source: "Transcoder-2",
            target: "HLS-2",
        },
        {
            source: "Transcoder-3",
            target: "HLS-3",
        },
        {
            source: "HLS-1",
            target: "Sync",
        },
        {
            source: "HLS-2",
            target: "Sync",
        },
        {
            source: "HLS-3",
            target: "Sync",
        },

    ],
    nodes: [
        {
            id: "RTMP-1",
        },
        {
            id: "Transcoder-1",
        },
        {
            id: "Transcoder-2",
        },
        {
            id: "Transcoder-3",
        },
        {
            id: "Ingest",
        },
        {
            id: "HLS-1",
        },
        {
            id: "HLS-2",
        },
        {
            id: "HLS-3",
        },
        {
            id: "Sync",
        },        
    ],
};
