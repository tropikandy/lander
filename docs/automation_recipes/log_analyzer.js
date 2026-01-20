// Activepieces Code Step: Log Anomaly Scanner
// Language: Node.js 18+

const fs = require('fs');

exports.code = async (params) => {
    // We assume logs are mounted at /opt/stacks (or we scan that dir)
    const logPath = '/opt/stacks/automation/activepieces/logs'; // Example path
    // In reality, we might need to scan specific container logs via docker socket
    
    // For this recipe, let's assume we pass the log content as input from a previous step (SSH)
    // OR we scan a known file.
    
    const logs = params.logs || "No logs provided";
    
    // Simple Keyword Heuristic
    const errorKeywords = ['error', 'exception', 'fatal', 'panic', 'crash'];
    const lines = logs.split('\n');
    const anomalies = lines.filter(line => 
        errorKeywords.some(keyword => line.toLowerCase().includes(keyword))
    );

    if (anomalies.length === 0) {
        return { status: "clean", count: 0 };
    }

    return {
        status: "anomalies_detected",
        count: anomalies.length,
        samples: anomalies.slice(0, 10) // Top 10 errors
    };
};

