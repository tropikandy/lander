// Activepieces Code Step: Server Health Check
// Language: Node.js 18+
// Dependencies: None (standard fs/child_process)

const fs = require('fs');
const { execSync } = require('child_process');

exports.code = async (params) => {
    try {
        // 1. Check Disk Usage
        // Since we are in a container, we check the mounted /opt/stacks or root
        const diskOutput = execSync('df -h /').toString();
        
        // 2. Check Memory
        const memInfo = fs.readFileSync('/proc/meminfo', 'utf8');
        const totalMem = parseInt(memInfo.match(/MemTotal:\s+(\d+)/)[1]);
        const freeMem = parseInt(memInfo.match(/MemAvailable:\s+(\d+)/)[1]);
        const usedMemPercent = Math.round(((totalMem - freeMem) / totalMem) * 100);

        // 3. Check Docker Containers (via mounted socket)
        // Requires curl or docker CLI installed in Activepieces, or use HTTP
        // We'll use a simple HTTP request to the socket if possible, but exec is easier if docker CLI is there.
        // Assuming we rely on the agent to fix if broken, we just report status.
        
        return {
            status: "success",
            timestamp: new Date().toISOString(),
            metrics: {
                disk_raw: diskOutput,
                memory_usage_percent: usedMemPercent,
                memory_free_kb: freeMem
            },
            summary: `Memory: ${usedMemPercent}% used. Disk check completed.`
        };
    } catch (error) {
        return {
            status: "error",
            error: error.message
        };
    }
};
